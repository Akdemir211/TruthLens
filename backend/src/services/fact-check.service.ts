import { Claim, FactCheckResult } from '../types';
import { geminiAIService } from './gemini-ai.service';
import logger from '../utils/logger';

class FactCheckService {
  async checkFacts(text: string): Promise<FactCheckResult> {
    try {
      logger.info('🔍 TruthAI haber doğrulama başlıyor...');

      const result = await geminiAIService.analyzeNews(text);

      if (!result) {
        logger.error('❌ TruthAI yanıt vermedi');
        return { claims: [], overallVerdict: 'error', summary: '', redFlags: [] };
      }

      const claims: Claim[] = result.claims.map((c, i) => ({
        id: `truthai-claim-${i + 1}-${Date.now()}`,
        text: c.text,
        verdict: c.verdict,
        confidence: c.confidence / 100,
        sources: [
          {
            title: 'TruthAI Analizi',
            url: '',
            credibility: 95,
            domain: 'truthai-engine',
            rating: c.verdict,
            description: c.explanation,
          },
        ],
      }));

      logger.info(`✅ ${claims.length} iddia analiz edildi | Genel karar: ${result.overallVerdict.toUpperCase()} | Skor: ${result.credibilityScore}`);
      if (result.redFlags.length > 0) {
        logger.info(`⚠️ Uyarılar: ${result.redFlags.join(', ')}`);
      }

      return {
        claims,
        overallVerdict: result.overallVerdict,
        credibilityScore: result.credibilityScore,
        summary: result.summary,
        explanation: result.explanation,
        redFlags: result.redFlags,
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error('❌ Fact check servis hatası:', msg);
      return { claims: [], overallVerdict: 'error', summary: '', redFlags: [] };
    }
  }
}

export const factCheckService = new FactCheckService();
