require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const LocalStrategy = require("passport-local").Strategy;
const customerModel = require("./modules/model/customerModel");
const User = require("./modules/model/userModel");
const validateSchema = require("./middlewares/validateSchema");
const  expressErrorHander = require("./util/expressErrorHander");
const { signupSchema, customerSchema } = require("./errorSchema");
const Complaint = require("./modules/model/ComplaintModel");
const sencerModel = require("./modules/model/sensorModel");
const app = express();
const cors = require("cors");
const bcrypt = require("bcrypt");
let port = 2323;
app.use(express.json());

app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({secret: process.env.COOKIE_SECRET,resave: false,saveUninitialized: true,
    store:MongoStore.create({ mongoUrl: "mongodb://localhost:27017/notesDB",
    ttl:60*1000,
    }),
    cookie:{
        maxAge: 60*1000,
        httpOnly: true,
        secure: false, // Development ke liye false, production me true
        sameSite: "strict",
    }
}));
app.use(passport.initialize()); 
app.use(passport.session()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); 

app.set("view engine", "ejs");
app.use(cors());
port = process.env.PORT || port;

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};
// ==================== AUTH MIDDLEWARE ====================
const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    const tokenValue = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

    try {
        const verified = jwt.verify(tokenValue, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};

// ===================== PUBLIC ROUTES =====================

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingEmail = await User.findOne({ email });
        if (existingEmail) return res.status(400).json({ message: "Email already registered" });

        const existingUsername = await User.findOne({ username });
        if (existingUsername) return res.status(400).json({ message: "Username already taken" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});

// Login Route (Fixed)
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, email: user.email, username: user.username },
            process.env.JWT_SECRET,        // ← Yeh sahi hai
            { expiresIn: "24h" }
        );

        res.json({ 
            success: true,
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
app.get("/api/alerts-count", authMiddleware, asyncHandler(async (req, res, next) => {
    // 1. ComplaintModel से 'Pending' शिकायतों की गिनती
    const newComplaints = await Complaint.countDocuments({ status: "Pending" });

    // 2. sensorModel से एक्टिव 'Leakage' अलर्ट्स की गिनती (जो रिजॉल्व नहीं हुए हैं)
    // ध्यान दें: अगर आपके मॉडल में फील्ड्स का नाम अलग हो तो उसे अपने हिसाब से बदलें (जैसे type की जगह status)
    const activeLeakages = await sencerModel.countDocuments({ type: "Leakage", resolved: false });

    // 3. customerModel या userModel से नए कनेक्शन आवेदनों की गिनती (जिनका स्टेटस 'New' है)
    const newConnections = await customerModel.countDocuments({ status: "New" });

    // रिएक्ट फ्रंटएंड को सक्सेस रिस्पांस भेजना
    res.json({
        success: true,
        newComplaints,   
        activeLeakages,  
       newConnections  
 });
}));

app.get("/show",authMiddleware,asyncHandler(async (req,res,next)=>{
        let prdata = await customerModel.find({});
        if(!prdata){
          return next(new expressErrorHander(404,"data not found"));
        }
        res.json({message:"data found", data: prdata});
    }));

    
app.post("/new",authMiddleware,validateSchema(customerSchema), async (req,res,next)=>{
    const { name,address,contact,email,connection,meter,usage } = req.body;
    const newdatas= new customerModel({name,address,contact,email,connection,meter,usage});
    if(!newdatas){
      return next(new expressErrorHander(400,"data is not valid"));
    }
    await newdatas.save()
  res.json({  message: "customer added successfully", customer: newdatas });
});

app.put("/update/:id",authMiddleware,asyncHandler(async(req,res,next)=>{
    let id = req.params.id;
    let {name,email,phone} = req.body;
    const update =  await customerModel.findByIdAndUpdate(id,{name,email,phone})
if(!update){
  return next(new expressErrorHander(404,"data is not found"));
}
  update.then((res)=>{console.log("data is update")})
  .catch((err)=>{console.error("data is not update",err)});
  res.json(update);
}));
app.delete("/delete/:id",asyncHandler(async(req,res,next)=>{
    let id = req.params.id;
    if(!id){
      return next(new expressErrorHander(400,"id not found"))
    }
    const deleted = await customerModel.findByIdAndDelete(id);
    res.json(deleted);
}));

app.post("/comp/new", asyncHandler(async(req,res,next)=>{
  const {customerId,customerName,contact,type,description,status} = req.body;
  const newComplaint =new Complaint({customerId,customerName,contact,type,description,status});
  if(!newComplaint){
    return next(new expressErrorHander(400,"data is not valid"));
  }
 await newComplaint.save()
  res.json({message:"compalint added successfully", complaint: newComplaint});
}));

app.get("/comp",async(req,res)=>{
 const allComplaints = await Complaint.find({});
  if(!allComplaints){
    return next(new expressErrorHander(404,"data is not found"));
  }
  res.json(allComplaints);
});

app.get('/sensor', async (req, res) => {
    const sensorData = await sencerModel.find({});
    res.json({ message: "Sensor data retrieved", data: sensorData });
});

app.post('/sensor/new', async (req, res) => {
    const sensorData = new sencerModel(req.body);
    // Auto-detect anomalies
    sensorData.leakageDetected = sensorData.flowRate > 50; // >50 LPM = leak
    sensorData.pressureDropAlert = sensorData.pressure < 20; // <20 PSI
    sensorData.highConsumptionAlert = sensorData.volume > 1000; // >1000L
    sensorData.qualityAlert = sensorData.phLevel < 6.5 || sensorData.phLevel > 8.5;

    const savedData = await sensorData.save();

    // Emit real-time update (if using Socket.io)
    req.app.get('io')?.emit('sensorUpdate', savedData);

    res.json({ message: "Sensor data saved", data: savedData });
});

app.use((err, req, res, next) => {
  let {statusCode = 500, message = "Internal Server Error"} = err;
  res.status(statusCode).json({ message });
});

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`);
    mongoose.connect("mongodb://localhost:27017/notesDB")
        .then(() => console.log("Connected to MongoDB"))  
        .catch((err) => console.error("Could not connect to MongoDB", err));    
});