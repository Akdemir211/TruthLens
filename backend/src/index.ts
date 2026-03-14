import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import rateLimit from 'express-rate-limit';
import analyzeRoutes from './routes/analyze.routes';
import logger from './utils/logger';

// Load .env from backend directory
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Debug: Log to verify env vars are loaded
console.log('🔍 Environment check:');
console.log('GEMINI_API_KEY:', process.env.GEMINI_API_KEY ? '✅ Found' : '❌ Missing');
console.log('NEWS_API_KEY:', process.env.NEWS_API_KEY ? '✅ Found' : '❌ Missing');
console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✅ Found' : '❌ Missing');

const app: Application = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 30,
  message: 'Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin.'
});

app.use('/api', limiter);

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(`${req.method} ${req.path}`);
  next();
});

app.get('/', (req: Request, res: Response) => {
  res.json({
    name: 'TruthLens API',
    version: '1.0.0',
    description: 'Fake News & AI Generated Text Detection Engine',
    endpoints: {
      health: '/api/health',
      analyzeText: 'POST /api/analyze-text'
    }
  });
});

app.use('/api', analyzeRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Unhandled error', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Bir hata oluştu'
  });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    error: 'Not found',
    message: 'Endpoint bulunamadı'
  });
});

const server = app.listen(PORT, () => {
  logger.info(`🚀 TruthLens API running on http://localhost:${PORT}`);
  logger.info(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

server.on('error', (err: NodeJS.ErrnoException) => {
  if (err.code === 'EADDRINUSE') {
    logger.error(`❌ Port ${PORT} zaten kullanımda!`);
    logger.error(`Çözüm: "netstat -ano | findstr :${PORT}" ile PID'i bulun, "taskkill /PID <pid> /F" ile sonlandırın.`);
    process.exit(1);
  } else {
    logger.error('Sunucu başlatma hatası:', err);
    process.exit(1);
  }
});

export default app;
