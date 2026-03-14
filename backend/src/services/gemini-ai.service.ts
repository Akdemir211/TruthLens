import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger';

export interface GeminiClaim {
  text: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
  confidence: number;
  explanation: string;
}

export interface GeminiAnalysisResult {
  overallVerdict: 'true' | 'false' | 'misleading' | 'unverified';
  credibilityScore: number;
  summary: string;
  claims: GeminiClaim[];
  redFlags: string[];
  explanation: string;
  groundingUsed?: boolean;
  searchQueries?: string[];
  groundingSources?: Array<{
    title: string;
    uri: string;
    snippet?: string;
  }>;
}

const VALID_VERDICTS = ['true', 'false', 'misleading', 'unverified'] as const;
type Verdict = typeof VALID_VERDICTS[number];

function sanitizeVerdict(raw: unknown): Verdict {
  const v = String(raw || '').toLowerCase().trim();
  return VALID_VERDICTS.includes(v as Verdict) ? (v as Verdict) : 'unverified';
}

function clampScore(n: unknown): number {
  return Math.max(5, Math.min(95, Math.round(Number(n) || 50)));
}

class GeminiAIService {
  private model: ReturnType<GoogleGenerativeAI['getGenerativeModel']> | null = null;
  private ready = false;

  private ensureReady() {
    if (this.ready) return;
    this.ready = true;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.error('❌ GEMINI_API_KEY bulunamadı!');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const modelConfig = {
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.1,
        topP: 0.8,
        maxOutputTokens: 8192,
      },
      tools: [{ googleSearch: {} }],
    };
    this.model = genAI.getGenerativeModel(modelConfig as Parameters<GoogleGenerativeAI['getGenerativeModel']>[0]);
    logger.info('✅ TruthAI (Gemini) hazır - Google Search Grounding aktif');
  }

  async analyzeNews(text: string): Promise<GeminiAnalysisResult | null> {
    this.ensureReady();
    if (!this.model) {
      logger.error('❌ Model yüklenemedi');
      return null;
    }

    const today = new Date().toLocaleDateString('tr-TR', {
      day: 'numeric', month: 'long', year: 'numeric',
    });

    const prompt = `Sen TruthAI'sın — Türk medyasındaki dezenformasyon ve sahte haberleri tespit etmek için geliştirilmiş, uzman düzeyinde bir haber doğrulama sistemi.

⚠️ ÖZEL TALİMAT: Bu haber güncel bir olay içeriyorsa (örn: "bugün", "dün", "geçen hafta", teknoloji duyuruları, siyasi gelişmeler, son dakika haberleri), Google Search ile web kaynaklarını kontrol et ve bulgularını analizine dahil et. Güncel olaylarda kaynaklardan edindiğin bilgileri kullan.

HABER METNİ:
"""
${text}
"""

BUGÜNÜN TARİHİ: ${today}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GÖREV: Aşağıdaki 5 boyutta bu metni titizlikle analiz et
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## BOYUT 1 — TEMEL DOĞRULUK
Metindeki temel iddiaları bilgi tabanınla karşılaştır.
- Hangi iddiaları kesin olarak doğrulayabiliyorsun?
- Hangileri tarihsel/bilimsel kayıtlarla çelişiyor?
- Hangileri hakkında bilgin yetersiz veya bilgi kesim tarihini aşıyor?

## BOYUT 2 — KAYNAK ANALİZİ
- Kaynaklar açıkça belirtilmiş mi? Kim tarafından?
- "İddia edildi", "öğrenildi", "kulisler yansıyor" gibi belirsiz atıflar var mı?
- Anonim veya doğrulanamaz kaynaklar kullanılmış mı?
- Kaynakların kurumsal güvenilirliği nedir?

## BOYUT 3 — DİL VE ÜSLUP ANALİZİ
- Duygusal, provokatif veya abartılı dil kullanılmış mı?
- Taraflı yorum mu, nesnel haber mi?
- Başlık ile içerik birbiriyle tutarlı mı?
- Okuyucuyu manipüle etmeye yönelik kalıplar var mı?

## BOYUT 4 — BAĞLAM ANALİZİ
- Önemli bağlam bilgisi eksik mi veya kasıtlı çıkarılmış mı?
- Doğru bir bilgi yanıltıcı bir bağlamda sunuluyor mu?
- Tarih, yer, kişi bilgileri tutarlı ve doğrulanabilir mi?

## BOYUT 5 — MANTIKSAL TUTARLILIK
- Metinde iç çelişkiler var mı?
- Yanıltıcı nedensellik bağlantıları kurulmuş mu?
- Sonuçlar öncüllerden mantıksal olarak çıkıyor mu?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
VERDİKT KURALLARI (MUTLAKA UY)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

"true" → Bilgi tabanındaki gerçeklerle güvenle doğrulanıyor
  Örnekler: Bilinen tarihsel olaylar, bilimsel gerçekler, doğrulanmış resmi açıklamalar
  Temel güvenilirlik puanı: 75

"false" → SADECE şu durumlarda kullan:
  • Fiziksel veya bilimsel olarak kesinlikle imkansız (örn: insan uçtu, ölü dirildi)
  • Belgelenmiş tarihsel gerçekle doğrudan, kesin çelişki (örn: Atatürk 1950'de öldü)
  • Bilimsel konsensüsle açıkça çelişen iddia (örn: Dünya düzdür)
  ❌ BİLMEDİĞİN için "false" deme! Bilmemek ≠ olmamış demek.
  ❌ Güncel siyasi haberler, son dakika gelişmeleri için "false" kullanma.
  Temel güvenilirlik puanı: 10

"misleading" → Gerçek bilgi içeriyor ama çarpıtılmış/yanıltıcı biçimde sunuluyor
  Örnekler: Bağlamdan koparılmış alıntı, seçici istatistik, doğru olay yanlış neden
  Temel güvenilirlik puanı: 35

"unverified" → Doğrulayamıyor veya çürütemiyorsun
  • Bilgi tabanında bu olay hakkında yeterli bilgi yok
  • Muhtemelen bilgi kesim tarihinden sonra gerçekleşmiş
  • Özel/lokal bir olay, yetersiz veri
  ⚠️ Emin değilsen MUTLAKA "unverified" kullan, asla varsayım yapma.
  Temel güvenilirlik puanı: 50

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GÜVENİLİRLİK PUANLAMA (credibilityScore: 0-100)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Temel puandan başla, aşağıdaki modifikasyonları uygula:

EKLE (+):
  +10 → İddia kesin kayıtlarla birebir doğrulanıyor
  +8  → Birden fazla güvenilir fakt uyuşuyor
  +5  → Güvenilir kurumsal kaynak adı açıkça belirtilmiş (bakanlık, üniversite vb.)
  +5  → Tarih, yer, kişi bilgileri tutarlı ve doğrulanabilir nitelikte
  +3  → Nötr, profesyonel üslup kullanılmış
  +3  → Başlık ile içerik birbiriyle tutarlı

ÇIKAR (-):
  -10 → Fiziksel/bilimsel kesin imkansızlık
  -8  → Belgelenmiş tarihi/bilimsel gerçekle doğrudan ve kesin çelişki
  -7  → Hiç kaynak gösterilmemiş, iddianın kaynağı belirsiz
  -5  → Belirsiz veya anonim kaynak ("iddia edildi", "öğrenildi", "bilinmeyen kaynaklar")
  -5  → Güçlü duygusal, provokatif veya manipülatif dil
  -5  → Kritik bağlam kasıtlı olarak çıkarılmış veya eksik
  -4  → Clickbait niteliğinde abartılı başlık
  -3  → Metin içinde iç çelişkiler veya mantık hataları
  -3  → Tarih, yer veya kişi bilgilerinde tutarsızlık

Son puan: Temel puan + eklemeler - çıkarmalar
Minimum: 5, Maksimum: 95

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
İDDİA ÇIKARMA TALİMATI
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Metinden 2-4 adet spesifik, doğrulanabilir iddia çıkar.

İyi iddia (spesifik): "Türkiye'de enflasyon Ocak ayında yüzde 67'ye ulaştı"
Kötü iddia (çok genel): "Ekonomi kötüye gidiyor"

İyi iddia (doğrulanabilir): "X Ülkesi Türkiye'ye savaş ilan etti"
Kötü iddia (yorum): "Hükümet halkı aldatıyor"

Her iddia için:
- Kendi verdict ve confidence değerini belirle (genel verdict'ten bağımsız olabilir)
- 2-3 cümlelik Türkçe açıklama yaz

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÇIKTI — YALNIZCA JSON, BAŞKA HİÇBİR ŞEY YAZMA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

{
  "overallVerdict": "true|false|misleading|unverified",
  "credibilityScore": <5-95 arası tam sayı>,
  "summary": "<Haberin 1-2 cümlelik tarafsız özeti>",
  "claims": [
    {
      "text": "<Metinden çıkarılan spesifik iddia>",
      "verdict": "true|false|misleading|unverified",
      "confidence": <0-100 arası tam sayı>,
      "explanation": "<Bu iddia için 2-3 cümle Türkçe analiz>"
    }
  ],
  "redFlags": ["<Tespit edilen uyarı işareti 1>", "<Uyarı 2>"],
  "explanation": "<Genel analiz sonucu: 3-5 cümle kapsamlı Türkçe açıklama>"
}`;

    try {
      logger.info(`🔍 TruthAI analiz başlatıldı: "${text.substring(0, 80)}..."`);

      const result = await this.model.generateContent(prompt);
      const responseText = result.response.text();

      logger.info(`🤖 Ham yanıt (ilk 300): ${responseText.substring(0, 300)}`);

      // YENİ: Grounding metadata'yı çıkar
      const groundingMetadata = result.response.candidates?.[0]?.groundingMetadata;
      let groundingUsed = false;
      let searchQueries: string[] = [];
      let groundingSources: Array<{ title: string; uri: string; snippet?: string }> = [];

      if (groundingMetadata) {
        groundingUsed = true;
        searchQueries = groundingMetadata.webSearchQueries || [];
        
        logger.info(`🔍 Google Search kullanıldı!`);
        logger.info(`   Sorgu sayısı: ${searchQueries.length}`);
        logger.info(`   Kaynak sayısı: ${groundingMetadata.groundingChunks?.length || 0}`);
        
        if (searchQueries.length > 0) {
          logger.info(`   Sorgular: ${searchQueries.join(', ')}`);
        }

        groundingMetadata.groundingChunks?.forEach((chunk: any, i: number) => {
          if (chunk.web) {
            logger.info(`   [${i + 1}] ${chunk.web.title} - ${chunk.web.uri}`);
            groundingSources.push({
              title: chunk.web.title || 'Başlıksız',
              uri: chunk.web.uri || '',
              snippet: chunk.web.snippet,
            });
          }
        });
      } else {
        logger.info(`ℹ️ Google Search kullanılmadı (model kendi bilgisi yeterli buldu)`);
      }

      // Markdown kod bloğu varsa içinden JSON'ı çıkar
      let jsonStr = responseText;
      const mdBlock = responseText.match(/```(?:json)?\s*(\{[\s\S]*?\})\s*```/);
      if (mdBlock) {
        jsonStr = mdBlock[1];
      } else {
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          logger.error('❌ JSON parse edilemedi — Ham yanıt:');
          logger.error(responseText.substring(0, 500));
          return null;
        }
        jsonStr = jsonMatch[0];
      }

      let parsed: Record<string, unknown>;
      try {
        parsed = JSON.parse(jsonStr);
      } catch {
        logger.error('❌ JSON.parse başarısız — Yanıt kesilmiş olabilir');
        logger.error(`Yanıt uzunluğu: ${responseText.length} karakter`);
        return null;
      }

      const claims: GeminiClaim[] = Array.isArray(parsed.claims)
        ? parsed.claims.slice(0, 4).map((c: Record<string, unknown>) => ({
            text: String(c.text || '').trim() || 'İddia metni yok',
            verdict: sanitizeVerdict(c.verdict),
            confidence: clampScore(c.confidence),
            explanation: String(c.explanation || '').trim() || 'Açıklama yok',
          }))
        : [];

      if (claims.length === 0) {
        claims.push({
          text: text.length > 200 ? text.substring(0, 197) + '...' : text,
          verdict: sanitizeVerdict(parsed.overallVerdict),
          confidence: clampScore(parsed.credibilityScore),
          explanation: String(parsed.explanation || 'Analiz tamamlandı').trim(),
        });
      }

      const output: GeminiAnalysisResult = {
        overallVerdict: sanitizeVerdict(parsed.overallVerdict),
        credibilityScore: clampScore(parsed.credibilityScore),
        summary: String(parsed.summary || '').trim() || 'Özet mevcut değil',
        claims,
        redFlags: Array.isArray(parsed.redFlags)
          ? parsed.redFlags.map(String).filter(Boolean).slice(0, 6)
          : [],
        explanation: String(parsed.explanation || '').trim() || 'Açıklama yok',
        groundingUsed,
        searchQueries,
        groundingSources,
      };

      logger.info(`✅ TruthAI sonuç: ${output.overallVerdict.toUpperCase()} | Skor: ${output.credibilityScore} | ${claims.length} iddia | ${output.redFlags.length} uyarı${groundingUsed ? ' | 🌐 Grounding kullanıldı' : ''}`);

      return output;
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);

      if (msg.includes('403') || msg.includes('leaked') || msg.includes('API key')) {
        logger.error('❌ GEMİNİ API ANAHTARI GEÇERSİZ veya SINIRI AŞILDI!');
        logger.error('👉 Yeni anahtar almak için: https://aistudio.google.com/app/apikey');
        logger.error('👉 Yeni anahtarı backend/.env dosyasındaki GEMINI_API_KEY satırına yapıştır.');
      } else {
        logger.error(`❌ TruthAI hatası: ${msg}`);
      }

      return null;
    }
  }
}

export const geminiAIService = new GeminiAIService();
