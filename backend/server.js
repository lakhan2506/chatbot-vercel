const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
const corsconfig = {
    origin: 'https://chatbot-frontend-umber.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
};
app.options('*', cors(corsconfig)); // Preflight requests
app.use(cors(corsconfig));
app.use(cookieParser);
app.use(express.json({limit:"50mb"})); // Parse JSON requests
app.use(express.urlencoded({limit:"50mb"}))
app.use(bodyParser.json()); // Parse request body


// API Routes
app.get("/",(req,res)=>{
    res.send("hello")
})
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chat', chatRoutes);


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
