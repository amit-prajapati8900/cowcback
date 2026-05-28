import React, { useEffect, useState, useCallback } from "react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  Brush, ReferenceLine
} from "recharts";
import { Box, Paper, Typography, Chip, LinearProgress } from "@mui/material";
import { TrendingUp, WaterDrop } from "@mui/icons-material";

export default function Status({ customers }) {
  const [chartData, setChartData] = useState([]);
  const [isLive, setIsLive] = useState(false);

  const updateChartData = useCallback(() => {
    const data = customers.map((c, index) => ({
      month: `C${index + 1}`,
      current: c.usage || 0,
      previous: Math.floor((c.usage || 0) * 0.8),
      growth: ((c.usage || 0) * 0.2)
    }));
    setChartData(data);
  }, [customers]);

  useEffect(() => {
    const timer = setTimeout(updateChartData, 0);
    return () => clearTimeout(timer);
  }, [customers, updateChartData]);

  useEffect(() => {
    let interval;
    if (isLive && customers.length > 0) {
      interval = setInterval(() => {
        setChartData(prev => prev.map(item => ({
          ...item,
          current: Math.max(0, item.current + (Math.random() - 0.5) * 50),
          previous: Math.floor(item.current * 0.8)
        })));
      }, 1500);
    }
    return () => clearInterval(interval);
  }, [isLive, customers]);

  const totalUsage = chartData.reduce((sum, item) => sum + item.current, 0);
  const avgGrowth = chartData.reduce((sum, item) => sum + item.growth, 0) / Math.max(1, chartData.length);

  return (
    <Paper elevation={4} sx={{ p: 4, height: { xs: 500, md: 600 } }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3, flexWrap: "wrap", gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h3" color="primary" gutterBottom>
            Usage Analytics
          </Typography>
          <Box sx={{ display: "flex", gap: 2, alignItems: "center", flexWrap: "wrap" }}>
            <Chip 
              icon={<WaterDrop />} 
              label={`${totalUsage.toLocaleString()} L Total`} 
              color="primary" 
              variant="filled"
            />
            <Chip 
              icon={<TrendingUp />} 
              label={`+${avgGrowth.toFixed(0)}% Growth`} 
              color="success" 
              variant="filled"
            />
            <Chip 
              label={isLive ? "Live 🔴" : "Static"} 
              color={isLive ? "error" : "default"}
              onClick={() => setIsLive(!isLive)}
              clickable
            />
          </Box>
        </Box>
      </Box>

      <ResponsiveContainer width="100%" height="85%">
        <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1976d2" stopOpacity={0.8}/>
              <stop offset="100%" stopColor="#42a5f5" stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="previousGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#90a4ae" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="#90a4ae" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          
          <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => `${value.toLocaleString()} L`}
          />
          <Tooltip 
            formatter={(value) => [`${value.toLocaleString()} Liters`, "Usage"]}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: 8,
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
            }}
          />
          <Legend />
          <ReferenceLine y={0} stroke="#ff9800" strokeDasharray="3 3" />
          
          <Area 
            type="monotone" 
            dataKey="previous" 
            stroke="#90a4ae" 
            strokeWidth={3}
            fillOpacity={0.3}
            fill="url(#previousGradient)"
            name="Previous"
          />
          <Area 
            type="monotone" 
            dataKey="current" 
            stroke="#1976d2" 
            strokeWidth={3}
            fillOpacity={0.6}
            fill="url(#currentGradient)"
            name="Current"
          />
          <Brush dataKey="month" height={20} stroke="#8884d8" />
        </AreaChart>
      </ResponsiveContainer>
    </Paper>
  );
}