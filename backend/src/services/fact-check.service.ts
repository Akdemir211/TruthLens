import { Claim, FactCheckResult, Source } from '../types';
import { geminiAIService } from './gemini-ai.service';
import logger from '../utils/logger';

// Helper: Domain'den güvenilirlik skoru tahmin et
function estimateSourceCredibility(url: string): number {
  try {
    const domain = new URL(url).hostname.toLowerCase();
    
    // Yüksek güvenilirlik
    const highTrust = ['reuters.com', 'bbc.com', 'apnews.com', 'aa.com.tr', 'nytimes.com', 'theguardian.com'];
    if (highTrust.some(d => domain.includes(d))) return 95;
    
    // Orta-yüksek güvenilirlik
    const mediumTrust = ['cnn.com', 'hurriyet.com.tr', 'sozcu.com.tr', 'ntv.com.tr', 'dw.com'];
    if (mediumTrust.some(d => domain.includes(d))) return 85;
    
    // Resmi siteler
    if (domain.endsWith('.gov') || domain.endsWith('.edu')) return 90;
    
    // Genel haber siteleri
    if (domain.includes('news') || domain.includes('haber')) return 75;
    
    return 70; // Varsayılan
  } catch {
    return 70;
  }
}

// Helper: URL'den domain çıkar
function extractDomain(url: string): string {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch {
    return 'unknown';
  }
}

class FactCheckService {
  async checkFacts(text: string): Promise<FactCheckResult> {
    try {
      logger.info('🔍 TruthAI haber doğrulama başlıyor...');

      const result = await geminiAIService.analyzeNews(text);

      if (!result) {
        logger.error('❌ TruthAI yanıt vermedi — API anahtarını kontrol et');
        return {
          claims: [],
          overallVerdict: 'error',
          summary: '',
          redFlags: ['API bağlantısı kurulamadı — lütfen daha sonra tekrar deneyin'],
        };
      }

      // Grounding kaynaklarını kullanarak claim'leri oluştur
      const claims: Claim[] = result.claims.map((c, i) => {
        const sources: Source[] = [];
        
        // Grounding kaynaklarını ekle (varsa)
        if (result.groundingSources && result.groundingSources.length > 0) {
          result.groundingSources.forEach((gs) => {
            sources.push({
              title: gs.title,
              url: gs.uri,
              credibility: estimateSourceCredibility(gs.uri),
              domain: extractDomain(gs.uri),
              rating: c.verdict,
              description: gs.snippet || c.explanation,
              snippet: gs.snippet,
            });
          });
        }
        
        // Fallback: TruthAI'nin kendi analizini ekle
        if (sources.length === 0) {
          sources.push({
            title: 'TruthAI Analizi',
            url: '',
            credibility: 95,
            domain: 'truthai-engine',
            rating: c.verdict,
            description: c.explanation,
          });
        }
        
        return {
          id: `truthai-claim-${i + 1}-${Date.now()}`,
          text: c.text,
          verdict: c.verdict,
          confidence: c.confidence / 100,
          sources,
        };
      });

      logger.info(`✅ ${claims.length} iddia analiz edildi | Genel karar: ${result.overallVerdict.toUpperCase()} | Skor: ${result.credibilityScore}`);
      if (result.redFlags.length > 0) {
        logger.info(`⚠️ Uyarılar: ${result.redFlags.join(', ')}`);
      }
      if (result.groundingUsed) {
        logger.info(`🌐 Google Search kullanıldı - ${result.groundingSources?.length || 0} web kaynağı bulundu`);
      }

      return {
        claims,
        overallVerdict: result.overallVerdict,
        credibilityScore: result.credibilityScore,
        summary: result.summary,
        explanation: result.explanation,
        redFlags: result.redFlags,
        groundingUsed: result.groundingUsed,
        searchQueries: result.searchQueries,
      };
    } catch (error: unknown) {
      const msg = error instanceof Error ? error.message : String(error);
      logger.error('❌ Fact check servis hatası:', msg);
      return { claims: [], overallVerdict: 'error', summary: '', redFlags: [] };
    }
  }
}

export const factCheckService = new FactCheckService();
