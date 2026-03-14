import { GoogleGenerativeAI } from '@google/generative-ai';
import logger from '../utils/logger';

export interface GeminiFactCheckResult {
  isTrue: boolean;
  confidence: number;
  explanation: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
}

class GeminiAIService {
  private model: any = null;
  private ready = false;

  private ensureReady() {
    if (this.ready) return;
    this.ready = true;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      logger.error('❌ GEMINI_API_KEY bulunamadı! .env dosyasını kontrol edin.');
      return;
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    this.model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    logger.info('✅ Gemini AI hazır (model: gemini-2.5-flash)');
  }

  async factCheck(text: string): Promise<GeminiFactCheckResult | null> {
    this.ensureReady();

    if (!this.model) {
      logger.error('❌ Gemini model yüklenemedi');
      return null;
    }

    try {
      logger.info(`🤖 Gemini'a soruluyor: "${text.substring(0, 80)}..."`);

      const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

      const prompt = `Sen profesyonel bir haber doğrulama uzmanısın.

HABER: "${text}"
TARİH: ${today}

VERDICT SEÇİM KURALLARI (SIRAYLAtakip et):

ADIM 1: Bu olay fiziksel/biyolojik olarak İMKANSIZ mı?
- Ölü birinin dirilmesi → İMKANSIZ → verdict: "false"
- İnsanın uçması → İMKANSIZ → verdict: "false"
- Eğer imkansız DEĞİLSE → ADIM 2'ye geç

ADIM 2: Bu olay tarihsel/bilimsel bir GERÇEKLE kesin çelişiyor mu?
- "Atatürk 1950'de öldü" → 1938'de vefat etti, KESİN çelişki → verdict: "false"
- "Dünya düzdür" → Bilimsel çelişki → verdict: "false"
- Eğer kesin çelişki YOKSA → ADIM 3'e geç

ADIM 3: Bu olayı KESİN OLARAK BİLİYOR MUSUN?
- Evet, bu olay kesinlikle gerçek → verdict: "true"
- Evet, kısmen doğru ama çarpıtılmış → verdict: "misleading"
- HAYIR, bu olayı bilmiyorum veya emin değilim → ADIM 4'e geç

ADIM 4: BİLMEDİĞİN HER ŞEY "unverified" OLUR
Eğer bu adıma geldiysen, verdict MUTLAKA "unverified" olmalıdır.

YASAK: "Bu kadar büyük bir olay olsaydı bilirdim" şeklinde çıkarım yaparak "false" demek YASAKTIR.
YASAK: Bilgi tabanında olmayan bir olaya "false" demek YASAKTIR.
YASAK: Siyasi olaylar, savaşlar, suikastler, askeri operasyonlar hakkında "bilgim yok ama yanlış olmalı" mantığı YASAKTIR.

NEDEN: Senin bilgi tabanın belirli bir tarihe kadar güncellenir. O tarihten sonra gerçekleşen olayları bilemezsin. Bilmemek ≠ olmamış demek.

"false" SADECE VE SADECE: Fiziksel imkansızlık VEYA tarihsel/bilimsel kesin çelişki durumunda kullanılır. BAŞKA HİÇBİR DURUMDA "false" KULLANMA.

JSON formatında cevap ver (başka bir şey yazma):
{"isTrue":boolean,"confidence":0-100,"verdict":"true"|"false"|"misleading"|"unverified","explanation":"Türkçe 3-4 cümle açıklama"}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const responseText = response.text();

      logger.info(`🤖 Gemini raw: ${responseText.substring(0, 200)}`);

      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        logger.error('❌ Gemini cevabı JSON olarak parse edilemedi');
        return null;
      }

      const parsed = JSON.parse(jsonMatch[0]);

      const rawVerdict = String(parsed.verdict || '').toLowerCase().trim();
      const validVerdicts = ['true', 'false', 'misleading', 'unverified'] as const;
      const verdict = validVerdicts.includes(rawVerdict as any) ? rawVerdict as typeof validVerdicts[number] : 'unverified';

      const output: GeminiFactCheckResult = {
        isTrue: !!parsed.isTrue,
        confidence: Math.min(Math.max(Number(parsed.confidence) || 50, 0), 100),
        explanation: String(parsed.explanation || 'Açıklama yok'),
        verdict
      };

      logger.info(`🤖 SONUÇ: ${output.verdict.toUpperCase()} (%${output.confidence} güven)`);
      logger.info(`🤖 AÇIKLAMA: ${output.explanation}`);

      return output;
    } catch (err: any) {
      logger.error(`❌ Gemini hatası: ${err.message}`);
      return null;
    }
  }
}

export const geminiAIService = new GeminiAIService();
