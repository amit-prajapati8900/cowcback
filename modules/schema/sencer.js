const {Schema} = require("mongoose");
const sensorDataSchema = new Schema({
  meterId: { type: String, required: true, index: true }, // Unique meter ID
  timestamp: { type: Date, default: Date.now, index: true },
  flowRate: { type: Number, required: true }, // LPM (Liters per minute)
  pressure: { type: Number, required: true }, // PSI
  volume: { type: Number, required: true }, // Total liters consumed
  temperature: { type: Number }, // Water temp in °C
  phLevel: { type: Number }, // Water quality
  turbidity: { type: Number }, // NTU (quality)
  
  // Anomaly Detection
  leakageDetected: { type: Boolean, default: false },
  pressureDropAlert: { type: Boolean, default: false },
  highConsumptionAlert: { type: Boolean, default: false },
  qualityAlert: { type: Boolean, default: false },
  
  // Location & Device Info
  location: {
    lat: Number,
    lng: Number,
    address: String
  },
  deviceStatus: { type: String, enum: ['online', 'offline', 'maintenance'], default: 'online' },
  
  // Consumer Info
  consumerId: String,
  consumerName: String
}, { 
  timestamps: true 
});

// Index for fast queries
sensorDataSchema.index({ meterId: 1, timestamp: -1 });
sensorDataSchema.index({ leakageDetected: 1 });
sensorDataSchema.index({ timestamp: -1 });

module.exports = sensorDataSchema;