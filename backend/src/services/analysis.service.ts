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

      // TruthAI'nin kendi hesapladığı skoru kullan; yoksa verdic'e göre güvenli bir varsayılan ata
      const credibilityScore = factCheck.credibilityScore ?? this.fallbackScore(factCheck.overallVerdict);

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
            readabilityScore: 0,
          },
          explanation: 'AI detection devre dışı — TruthAI fact-check aktif',
        },
        factCheck,
        credibilityScore,
        similarArticles: [],
        timestamp: new Date().toISOString(),
      };

      logger.info(`✅ Analiz tamamlandı | Skor: ${credibilityScore} | Karar: ${factCheck.overallVerdict.toUpperCase()}`);
      return response;
    } catch (error) {
      logger.error(`❌ Analiz hatası: ${analysisId}`, error);
      throw error;
    }
  }

  /** Gemini skoru gelmediyse verdict'e göre makul bir varsayılan döndür */
  private fallbackScore(verdict: string): number {
    const map: Record<string, number> = {
      true: 80,
      false: 12,
      misleading: 35,
      unverified: 50,
      error: 50,
    };
    return map[verdict] ?? 50;
  }
}

export const analysisService = new AnalysisService();
