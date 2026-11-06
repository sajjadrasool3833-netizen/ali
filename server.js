import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';

import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import packageRoutes from './routes/packageRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ============================================
// CORS CONFIGURATION - Multiple Origins
// ============================================
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://127.0.0.1:3000',
  'https://ali2-three.vercel.app',
  'https://ali-topaz-omega.vercel.app',
  
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`❌ CORS blocked origin: ${origin}`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ============================================
// BODY PARSERS
// ============================================
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// ============================================
// REQUEST LOGGER (development only)
// ============================================
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.originalUrl}`);
    next();
  });
}

// ============================================
// HEALTH CHECK / ROOT ROUTE
// ============================================
app.get('/', (req, res) => {
  res.json({
    status: 'success',
    message: 'Ali Hamza Digital Hub API is running 🚀',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      services: '/api/services',
      packages: '/api/packages',
      orders: '/api/orders',
      portfolio: '/api/portfolio',
      testimonials: '/api/testimonials',
      blogs: '/api/blogs',
      contact: '/api/contact',
    },
  });
});

// Health check endpoint (for monitoring)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// ============================================
// API ROUTES
// ============================================
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/contact', contactRoutes);

// ============================================
// ERROR HANDLERS
// ============================================
app.use(notFound);
app.use(errorHandler);

// ============================================
// START SERVER (only when running locally, not on Vercel)
// ============================================
const PORT = process.env.PORT || 5001;

// Vercel ke liye export (serverless function)
if (process.env.VERCEL) {
  // On Vercel, don't call app.listen — it's serverless
  console.log('✅ Running on Vercel (serverless)');
} else {
  // Local development
  const server = app.listen(PORT, () => {
    console.log('');
    console.log('═══════════════════════════════════════════');
    console.log('🚀 Ali Hamza Digital Hub - Backend API');
    console.log('═══════════════════════════════════════════');
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ Local URL: http://localhost:${PORT}`);
    console.log(`✅ Allowed origins: ${allowedOrigins.length}`);
    console.log('═══════════════════════════════════════════');
    console.log('');
  });

  // Handle unhandled promise rejections
  process.on('unhandledRejection', (err) => {
    console.error(`❌ Unhandled Rejection: ${err.message}`);
    server.close(() => process.exit(1));
  });
}

export default app;