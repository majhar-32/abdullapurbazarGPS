const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { PrismaClient } = require('@prisma/client');

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5002;

// Handle BigInt serialization
BigInt.prototype.toJSON = function () { return this.toString() }

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'https://abdullapurbazargps.netlify.app', 'https://leafy-klepon-bfce06.netlify.app', 'https://preeminent-sunflower-b3afb1.netlify.app'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes (to be added)
app.get('/', (req, res) => {
  res.send('School Website API is running');
});

// Import Routes
const authRoutes = require('./routes/authRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const eventRoutes = require('./routes/eventRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const pageRoutes = require('./routes/pageRoutes');
const committeeRoutes = require('./routes/committeeRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/committee-members', committeeRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/dashboard', dashboardRoutes);

const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
