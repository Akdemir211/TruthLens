import { Router } from 'express';
import { analyzeController } from '../controllers/analyze.controller';

const router = Router();

router.post('/analyze-text', (req, res) => analyzeController.analyzeText(req, res));

router.get('/health', (req, res) => analyzeController.healthCheck(req, res));

export default router;
