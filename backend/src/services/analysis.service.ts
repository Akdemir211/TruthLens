import { v4 as uuidv4 } from 'uuid';
import { factCheckService } from './fact-check.service';
import logger from '../utils/logger';
import { AnalysisResponse } from '../types';

class AnalysisService {
  async analyzeText(text: string): Promise<AnalysisResponse> {
    const analysisId = uuidv4();

    try {
      logger.info(`📋 Analiz başlıyor: ${analysisId}`);

      const factCheck = await factCheckService.checkFacts(text);

      const credibilityScore = this.calculateScore(factCheck);

      const response: AnalysisResponse = {
        analysisId,
        aiDetection: {
          probability: 0,
          confidence: 0,
          indicators: {
            perplexity: 'N/A',
            repetitiveness: 'N/A',
            stylometry: 'N/A',
            lexicalDiversity: 0,
            sentenceLengthVariance: 0,
            readabilityScore: 0
          },
          explanation: 'AI detection devre dışı - sadece Gemini fact-check aktif'
        },
        factCheck,
        credibilityScore,
        similarArticles: [],
        timestamp: new Date().toISOString()
      };

      logger.info(`✅ Analiz tamamlandı: Skor = ${credibilityScore}`);
      return response;
    } catch (error) {
      logger.error(`❌ Analiz hatası: ${analysisId}`, error);
      throw error;
    }
  }

  private calculateScore(factCheck: any): number {
    const verdict = factCheck.overallVerdict;
    const confidence = factCheck.claims[0]?.confidence || 0.5;

    let score = 50;

    if (verdict === 'true') {
      score = 75 + (confidence * 20);
    } else if (verdict === 'false') {
      score = 5 + ((1 - confidence) * 20);
    } else if (verdict === 'misleading') {
      score = 30 + ((1 - confidence) * 30);
    } else if (verdict === 'unverified') {
      score = 50 + (confidence * 20);
    }

    score = Math.max(5, Math.min(95, Math.round(score)));
    logger.info(`📊 Skor: ${score} (verdict: ${verdict}, confidence: ${(confidence * 100).toFixed(0)}%)`);
    return score;
  }
}

export const analysisService = new AnalysisService();
