import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  Container, Row, Col, Card, Button, Badge, Spinner, ProgressBar,
  Modal, Form, InputGroup
} from "react-bootstrap";
import {
  IoAlertCircle as AlertIcon,
  IoPulse as SensorIcon,
  IoWifi as OnlineIcon,
  IoWater as LiveIcon,
  IoPersonOutline as UserIcon,
  IoSearchOutline as SearchIcon
} from "react-icons/io5";
import {
  MdRefresh, MdAddCircle, MdTrendingUp, MdSpeed, MdScience, MdOutlineOpacity,
  MdWaterDrop as Droplet // 🟢 FIXED: Droplet icon import yahan add kar diya hai
} from "react-icons/md";

import StatsCard from "./LiveSensors";
import { SensorAlerts } from './SensorAlerts';
import './SensorDashboard.css';

const SensorCard = ({ sensor }) => (
  <Card className="sensor-item-card mb-4 shadow-sm">
    <Card.Body className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center">
          <div className={`status-indicator me-2 ${sensor.deviceStatus === 'online' ? 'bg-success' : 'bg-danger'}`} style={{ width: 8, height: 8, borderRadius: '50%' }}></div>
          <h6 className="mb-0 fw-bold text-white font-mono tracking-wide">{sensor.meterId}</h6>
        </div>
        <Badge className={sensor.deviceStatus === 'online' ? 'bg-success text-white px-2.5 py-1' : 'bg-secondary text-white px-2.5 py-1'} style={{ borderRadius: '0px', fontSize: '11px' }}>
          {sensor.deviceStatus?.toUpperCase() || 'ONLINE'}
        </Badge>
      </div>
      
      <p className="text-slate-400 small mb-3 text-truncate">
        <UserIcon className="me-1" color="#00b0ff"/> {sensor.consumerName || 'Autonomous Utility Node'}
      </p>

      <Row className="g-2">
        <Col xs={6}>
          <div className="metric-box">
            <MdSpeed size={20} color="#0072ff"/>
            <div>
              <span className="d-block fw-bold text-white font-mono">{sensor.flowRate || 0}</span>
              <small className="text-slate-400 text-uppercase" style={{fontSize: '10px'}}>LPM</small>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div className="metric-box">
            <MdTrendingUp size={20} color="#00d4ff"/>
            <div>
              <span className="d-block fw-bold text-white font-mono">{sensor.pressure || 0}</span>
              <small className="text-slate-400 text-uppercase">PSI</small>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div className="metric-box">
            <MdScience size={20} color="#ff9800"/>
            <div>
              <span className="d-block fw-bold text-white font-mono">{sensor.phLevel || "7.0"}</span>
              <small className="text-slate-400 text-uppercase">pH</small>
            </div>
          </div>
        </Col>
        <Col xs={6}>
          <div className="metric-box">
            <MdOutlineOpacity size={20} color="#9ca3af"/>
            <div>
              <span className="d-block fw-bold text-white font-mono">{sensor.turbidity || 0}</span>
              <small className="text-slate-400 text-uppercase">NTU</small>
            </div>
          </div>
        </Col>
      </Row>
      
      {sensor.leakageDetected && (
        <Badge bg="danger" className="w-100 mt-3 py-2 text-uppercase tracking-wider font-bold" style={{ borderRadius: '0px' }}>⚠️ Leakage Alert Exception</Badge>
      )}
    </Card.Body>
  </Card>
);

const SensorDashboard = () => {
  const [sensors, setSensors] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({});
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [formData, setFormData] = useState({
    meterId: `MTR-${Math.floor(1000 + Math.random() * 9000)}`,
    flowRate: '',
    pressure: '',
    volume: '',
    phLevel: '7.2',
    temperature: '24.5',
    turbidity: '0.8',
    consumerName: '',
    address: '',
    deviceStatus: 'online'
  });

  const API_BASE = 'http://localhost:2323';

  const fetchSensors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/sensor`);
      const data = res.data.data || res.data || [];
      setSensors(data);
      
      const total = data.length;
      const online = data.filter(s => s.deviceStatus === 'online').length;
      const alertList = data.filter(s => s.leakageDetected || s.pressureDropAlert || s.highConsumptionAlert || s.qualityAlert);
      
      setStats({
        totalSensors: total,
        onlineSensors: online,
        activeAlerts: alertList.length,
        avgFlow: data.reduce((sum, s) => sum + (Number(s.flowRate) || 0), 0) / Math.max(total, 1)
      });
      setAlerts(alertList);
    } catch (err) {
      console.error("Fetch Error Exception:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSensors();
    const interval = setInterval(fetchSensors, 30000);
    return () => clearInterval(interval);
  }, [fetchSensors]);

  const filteredSensors = sensors.filter(s => 
    s.meterId?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.consumerName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      flowRate: parseFloat(formData.flowRate),
      pressure: parseFloat(formData.pressure),
      volume: parseFloat(formData.volume),
      phLevel: parseFloat(formData.phLevel),
      temperature: parseFloat(formData.temperature),
      turbidity: parseFloat(formData.turbidity),
      location: { address: formData.address }
    };

    try {
      await axios.post(`${API_BASE}/sensor/new`, payload);
      setShowForm(false);
      fetchSensors();
      alert("IoT Smart Node Deployed Into Grid Tree Container!");
    } catch (err) {
      alert("Deployment Rejected: Pipeline validation breach.");
    }
  };

  return (
    <div className="sensor-dashboard-main pb-5">
      {/* Fixed Telemetry Top Navigation Glass Header */}
      <div className="top-nav-glass py-3 mb-5">
        <Container fluid sx={{ px: { lg: 12 } }}>
          <Row className="align-items-center g-3">
            <Col md={4}>
              <h4 className="mb-0 fw-black d-flex align-items-center text-white tracking-wide uppercase">
                <div className="icon-pulse me-2 text-info"><LiveIcon/></div>
                AquaPulse IIOT Console
              </h4>
            </Col>
            <Col md={4}>
              <InputGroup size="sm" style={{ border: 'none' }}>
                <InputGroup.Text style={{ background: 'rgba(15,23,42,0.8)', border: '1px solid rgba(255,255,255,0.1)', color: '#94a3b8', borderRadius: '0px' }}>
                  <SearchIcon/>
                </InputGroup.Text>
                <Form.Control
                  className="cyber-input py-2"
                  placeholder="Query Meter Hardware Serial or Client..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={4} className="text-md-end">
              <Button variant="outline-light" className="me-2 py-2 px-3 font-bold" style={{ borderRadius: '0px', fontSize: '13px' }} onClick={fetchSensors}>
                <MdRefresh size={16}/> Refresh Grid
              </Button>
              <Button className="py-2 px-4 shadow btn-gradient text-uppercase font-black" style={{ fontSize: '13px' }} onClick={() => setShowForm(true)}>
                <MdAddCircle className="me-1" size={16}/> Initialize Node
              </Button>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid sx={{ px: { lg: 12 } }}>
        {/* Core Live Analytics Grid Metrics Blocks */}
        <Row className="mb-5 g-4">
          <Col sm={6} md={3}>
            <StatsCard title="Total Deployed Blocks" value={stats.totalSensors || 0} icon={<SensorIcon/>} color="blue"/>
          </Col>
          <Col sm={6} md={3}>
            <StatsCard title="Pipeline Live Links" value={stats.onlineSensors || 0} icon={<OnlineIcon/>} color="green"/>
          </Col>
          <Col sm={6} md={3}>
            <StatsCard title="Incident Alerts Exception" value={stats.activeAlerts || 0} icon={<AlertIcon/>} color="red" isAlert/>
          </Col>
          <Col sm={6} md={3}>
            <StatsCard title="Average Flow Metrics" value={`${(stats.avgFlow || 0).toFixed(1)} LPM`} icon={<Droplet/>} color="purple"/>
          </Col>
        </Row>

        {/* Dashboard Grid Analytics Canvas Workspace */}
        <Row>
          <Col lg={8.5}>
            <div className="section-title d-flex justify-content-between align-items-center mb-4 border-bottom border-slate-800 pb-2">
              <h5 className="fw-black tracking-wider text-slate-400 text-uppercase mb-0">Active Infrastructure Node Grid Map</h5>
              <Badge bg="dark" className="text-info border border-info/30 px-3 py-1.5 font-mono" style={{ borderRadius: '0px' }}>
                {filteredSensors.length} Nodes Rendered
              </Badge>
            </div>
            {loading ? (
              <div className="text-center py-5"><Spinner animation="border" variant="info" /></div>
            ) : filteredSensors.length === 0 ? (
              <div className="text-center text-slate-500 font-medium py-5 border border-dashed border-slate-800">
                No telemetry data entries matching current filter constraints.
              </div>
            ) : (
              <Row className="g-4">
                {filteredSensors.map((s, i) => (
                  <Col sm={6} xl={4} key={s._id || i}><SensorCard sensor={s}/></Col>
                ))}
              </Row>
            )}
          </Col>

          {/* Right Floating Alert Sidebar Desk Panels */}
          <Col lg={3.5}>
            <SensorAlerts alerts={alerts} />
            <Card className="border-0 shadow-2xl bg-slate-900 rounded-0" style={{ border: '1px solid rgba(255,255,255,0.05) !important' }}>
              <Card.Body className="p-4">
                <h6 className="fw-black text-uppercase tracking-wider text-slate-400 mb-3"><MdTrendingUp className="me-2" color="#00b0ff"/>System Engine Diagnostics</h6>
                <ProgressBar variant="info" now={94} className="my-3 custom-progress" />
                <p className="small text-slate-400 mb-0 leading-relaxed font-medium">
                  Overall framework efficiency operating at peak capacity profile logic. Packet transit rates stable within standard grid latency ranges.
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Advanced Geometric Configurations Modal */}
      <Modal show={showForm} onHide={() => setShowForm(false)} size="lg" centered>
        <div style={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)' }}>
          <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
            <Modal.Title className="fw-black text-white text-uppercase tracking-wider">Deploy IoT Node Line Unit</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleSubmit}>
            <Modal.Body className="px-4 pb-4 text-white">
              <Row className="g-3">
                <Col md={6}>
                  <Form.Label className="small fw-bold text-slate-300">Consumer Registration Name *</Form.Label>
                  <Form.Control className="cyber-input py-2.5" name="consumerName" value={formData.consumerName} onChange={handleInputChange} placeholder="E.g., Ashutosh Kumar" required />
                </Col>
                <Col md={6}>
                  <Form.Label className="small fw-bold text-slate-300">Hardware Serial Code Assignment *</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" name="meterId" value={formData.meterId} onChange={handleInputChange} required />
                </Col>
                <Col md={12}>
                  <Form.Label className="small fw-bold text-slate-300">Installation Node Coordinates Address</Form.Label>
                  <Form.Control className="cyber-input py-2.5" name="address" value={formData.address} onChange={handleInputChange} placeholder="Zone, Pipeline Sector, Sector Line Node" />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Calibrated Flow (LPM) *</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" step="0.1" name="flowRate" value={formData.flowRate} onChange={handleInputChange} required />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Static Pressure (PSI) *</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" step="0.1" name="pressure" value={formData.pressure} onChange={handleInputChange} required />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Volumetric Net Load (L) *</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" name="volume" value={formData.volume} onChange={handleInputChange} required />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Quality Calibration (pH)</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" step="0.1" name="phLevel" value={formData.phLevel} onChange={handleInputChange} />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Turbidity Factor (NTU)</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" step="0.1" name="turbidity" value={formData.turbidity} onChange={handleInputChange} />
                </Col>
                <Col md={4}>
                  <Form.Label className="small fw-bold text-slate-300">Thermal Index (°C)</Form.Label>
                  <Form.Control className="cyber-input py-2.5 font-mono" type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleInputChange} />
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer className="border-0 px-4 pb-4">
              <Button variant="dark" style={{ borderRadius: '0px' }} onClick={() => setShowForm(false)}>Abort Deployment</Button>
              <Button type="submit" className="px-5 shadow btn-gradient text-uppercase font-black">Initialize System Unit</Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default SensorDashboard;