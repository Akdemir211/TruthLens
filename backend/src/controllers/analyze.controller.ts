import { Request, Response } from 'express';
import { z } from 'zod';
import { analysisService } from '../services/analysis.service';
import logger from '../utils/logger';

const analyzeTextSchema = z.object({
  text: z.string()
    .min(10, 'Metin en az 10 karakter olmalıdır')
    .max(5000, 'Metin en fazla 5000 karakter olabilir')
});

export class AnalyzeController {
  async analyzeText(req: Request, res: Response): Promise<void> {
    try {
      const validation = analyzeTextSchema.safeParse(req.body);
      
      if (!validation.success) {
        res.status(400).json({
          error: 'Validation error',
          details: validation.error.errors
        });
        return;
      }

      const { text } = validation.data;
      
      logger.info(`Received analysis request: ${text.substring(0, 50)}...`);
      
      const result = await analysisService.analyzeText(text);
      
      res.status(200).json(result);
    } catch (error) {
      logger.error('Analysis endpoint error', error);
      res.status(500).json({
        error: 'Internal server error',
        message: 'Analiz sırasında bir hata oluştu'
      });
    }
  }

  async healthCheck(req: Request, res: Response): Promise<void> {
    res.status(200).json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'TruthLens API'
    });
  }
}

export const analyzeController = new AnalyzeController();
