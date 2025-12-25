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

const fs = require('fs');
const path = require('path');

// Ensure uploads directory exists
// Ensure uploads directory exists (only for local dev)
const uploadDir = path.join(__dirname, 'uploads');
if (process.env.NODE_ENV !== 'production' && !fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://abdullapurbazargps.netlify.app',
    'https://leafy-klepon-bfce06.netlify.app',
    'https://preeminent-sunflower-b3afb1.netlify.app',
    'https://abdullapurbazargps.vercel.app',
    'https://schoolwebsite-bice.vercel.app',
    'https://schoolwebsite-production-8977.up.railway.app'
  ],
  credentials: true
}));
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));

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

if (process.env.NODE_ENV !== 'production') {
  app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
}

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
