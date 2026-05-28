import React from 'react';

const SensorAlerts = ({ alerts = [] }) => {
  const alertTypes = {
    leakageDetected: '💧 Critical Leakage Detected',
    pressureDropAlert: '📉 System Pressure Drop Fault',
    highConsumptionAlert: '📈 Burst Over-Consumption Exception',
    qualityAlert: '🧪 Fluid Anomaly Level Contamination'
  };

  return (
    <div className="bg-slate-900 border border-red-500/30 rounded-0 p-5 shadow-2xl mb-4">
      <h4 className="text-md font-black text-red-400 mb-4 flex items-center tracking-wider uppercase">
        <span className="animate-ping inline-block w-2.5 h-2.5 bg-red-500 rounded-full mr-2.5"></span>
        🚨 Active Critical Incidents ({alerts.length})
      </h4>
      
      {alerts.length === 0 ? (
        <div className="text-center py-6 text-slate-400 bg-slate-950/50 border border-slate-800">
          <p className="text-lg mb-1">✅</p>
          <p className="text-xs font-semibold tracking-wider text-teal-400 uppercase">All Node Systems Operational</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
          {alerts.map((alert, index) => (
            <div key={alert._id || index} className="p-3 bg-slate-950 border-l-4 border-red-500 rounded-0 flex flex-col gap-1">
              <div className="flex justify-between items-center">
                <span className="font-mono text-xs font-bold text-slate-200 tracking-wider">{alert.meterId}</span>
                <span className="text-[10px] text-slate-500 font-mono">
                  {alert.timestamp ? new Date(alert.timestamp).toLocaleTimeString() : new Date().toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs font-medium text-red-400">
                {Object.entries(alertTypes).map(([key, label]) => 
                  alert[key] ? label : null
                ).filter(Boolean).join(' | ')}
              </p>
              {alert.consumerName && (
                <p className="text-[11px] text-slate-500 font-medium">Node Owner: {alert.consumerName}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export { SensorAlerts };