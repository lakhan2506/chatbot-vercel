const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chatRoutes');
const bodyParser = require('body-parser');
const path = require('path');

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
app.options('*', cors()); // Preflight requests
app.use(cors(corsconfig));
app.use(express.json()); // Parse JSON requests
app.use(bodyParser.json()); // Parse request body


// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/chat', chatRoutes);

// Serve Frontend Static Files
app.use(express.static(path.join(__dirname, 'frontend/build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
