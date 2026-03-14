import { Claim } from '../types';
import { geminiAIService } from './gemini-ai.service';
import logger from '../utils/logger';

class FactCheckService {
  async checkFacts(text: string): Promise<{ claims: Claim[], overallVerdict: string }> {
    try {
      logger.info('🔍 Haber doğrulama başlıyor (SADECE Gemini)');

      const geminiResult = await geminiAIService.factCheck(text);

      if (!geminiResult) {
        logger.error('❌ Gemini yanıt veremedi');
        return { claims: [], overallVerdict: 'error' };
      }

      const claim: Claim = {
        id: `gemini-${Date.now()}`,
        text: text.length > 200 ? text.substring(0, 197) + '...' : text,
        verdict: geminiResult.verdict,
        confidence: geminiResult.confidence / 100,
        sources: [{
          title: '🤖 Gemini AI Analizi',
          url: '',
          credibility: 95,
          domain: 'google-gemini-ai',
          rating: geminiResult.verdict,
          description: geminiResult.explanation
        }]
      };

      logger.info(`✅ Sonuç: ${geminiResult.verdict.toUpperCase()} (%${geminiResult.confidence})`);

      return {
        claims: [claim],
        overallVerdict: geminiResult.verdict
      };
    } catch (error: any) {
      logger.error('❌ Fact check hatası:', error.message);
      return { claims: [], overallVerdict: 'error' };
    }
  }
}

export const factCheckService = new FactCheckService();
