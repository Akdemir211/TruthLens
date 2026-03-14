# 🤖 Google Gemini AI Entegrasyonu

## 🎯 Neden Gemini AI?

### Sorun: Mevcut Sistem Yetersiz
- ❌ News API: Türkçe zayıf, güncel olmayabilir
- ❌ Google Fact Check: Sınırlı DB, her olayı bilmiyor
- ❌ Statik kurallara bağımlı
- ❌ Güncel olayları anlayamıyor

### Çözüm: Gemini AI
- ✅ **2026 güncel bilgileri** biliyor
- ✅ **Gerçek zamanlı doğrulama**
- ✅ **Bağlamsal anlama** (context aware)
- ✅ **Çok dilli destek** (Türkçe + İngilizce)
- ✅ **Mantıksal çıkarım** yapabilir
- ✅ **ÜCRETSIZ** (günlük 60 istek)

---

## 🔑 Gemini API Key Nasıl Alınır?

### Adım 1: Google AI Studio'ya Gidin

```
https://aistudio.google.com/app/apikey
```

### Adım 2: Google Hesabınızla Giriş Yapın

Herhangi bir Gmail hesabı ile giriş yapabilirsiniz.

### Adım 3: "Create API Key" Butonuna Tıklayın

![Create API Key](https://i.imgur.com/...)

### Adım 4: API Key'inizi Kopyalayın

Örnek API key:
```
AIzaSyD_example_key_1234567890abcdefghij
```

### Adım 5: Backend .env Dosyasına Ekleyin

`backend/.env` dosyasını açın ve ekleyin:

```env
# AI Models
GEMINI_API_KEY=AIzaSyD_example_key_1234567890abcdefghij
```

### Adım 6: Backend'i Yeniden Başlatın

```bash
cd backend
npm run dev
```

---

## 🎯 Gemini AI Ne Yapacak?

### 1. Akıllı Fact-Checking

```typescript
// Her claim için AI'ya soruyor:
"28 Şubat 2026'da Hamaney öldü mü?"

// Gemini cevaplıyor:
{
  isTrue: true / false,
  confidence: 85,
  verdict: "true",
  explanation: "Bu olay 28 Şubat 2026'da gerçekten oldu..."
}
```

### 2. Güncel Olay Doğrulama

```typescript
// Metni analiz ediyor:
"ABD ve İsrail İran'a saldırdı, Hamaney öldürüldü"

// Gemini doğruluyor:
{
  isRealEvent: true,
  confidence: 90,
  explanation: "Bu gerçek bir olaydır..."
}
```

### 3. Bağlamsal Anlama

**Örnek:**
- Tarihi biliyor (2026)
- Güncel liderleri biliyor
- Son olayları biliyor
- Coğrafi bağlamı anlıyor

---

## 📊 Sistemde Nasıl Kullanılacak?

### Öncelik Sırası:

```
1. 🤖 Gemini AI (En güçlü, en öncelikli)
   ↓ (eğer başarısız)
2. 🔍 Google Fact Check
   ↓ (eğer başarısız)
3. 📰 News API
   ↓ (eğer başarısız)
4. ❓ Unverified (Doğrulanamadı)
```

### Verdict Hesaplama:

```typescript
if (geminiVerdict) {
  return geminiVerdict;  // AI'ya güven
} else if (googleFactCheck) {
  return googleVerdict;
} else if (newsAPI) {
  return newsVerdict;
} else {
  return 'unverified';
}
```

### Credibility Score:

```typescript
// Gemini varsa confidence yüksek
if (geminiResult && geminiResult.isTrue) {
  baseScore = 80-95;
} else if (geminiResult && !geminiResult.isTrue) {
  baseScore = 15-30;
}
```

---

## 🧪 Test Senaryoları

### Test 1: Hamaney Haberi (Gerçek)

**Metin:**
```
28 Şubat 2026 tarihinde ABD ve İsrail'in İran'a karşı başlattığı saldırılarda İran'ın dini lideri Hamaney öldürüldü.
```

**Gemini Cevabı (Beklenen):**
```json
{
  "isTrue": true,
  "confidence": 85,
  "verdict": "true",
  "explanation": "28 Şubat 2026 tarihinde gerçekten böyle bir olay yaşandı..."
}
```

**Sistem Sonucu:**
- ✅ Verdict: **true** (Gemini'den)
- ✅ Credibility: **80-90**
- ✅ Açıklama: Gemini'nin açıklaması

### Test 2: Erdoğan Ölüm (Sahte)

**Metin:**
```
Cumhurbaşkanı Erdoğan bugün vefat etti.
```

**Gemini Cevabı:**
```json
{
  "isTrue": false,
  "confidence": 95,
  "verdict": "false",
  "explanation": "Bu bilgi doğru değil. Erdoğan hayatta..."
}
```

**Sistem Sonucu:**
- ✅ Verdict: **false**
- ✅ Credibility: **15-25**

---

## 💰 Maliyet ve Limitler

### Ücretsiz Plan (Gemini API):
- **60 istek/dakika** ✅
- **1500 istek/gün** ✅
- **1 milyon token/ay** ✅

**Sizin kullanımınız için FAZLASIYLA yeterli!**

### Alternatif AI Modelleri:

1. **Gemini Pro** (ÜCRETSİZ) ✅
   - En dengeli
   - Güncel bilgiler
   - Hızlı

2. **OpenAI GPT-4** (Ücretli)
   - Daha güçlü
   - Ama pahalı ($0.01/1K token)

3. **Grok** (Twitter)
   - Şu an API yok
   - Sadece X Premium üyelerine

---

## 🚀 Backend Log'ları (Beklenen)

### Gemini Aktif:

```
[INFO] Starting fact check
[INFO] Extracted 2 claims
[INFO] 🤖 Asking Gemini AI to fact-check: "Hamaney öldü..."
[INFO] 🤖 Gemini AI: true (85%)
[INFO] 🤖 Explanation: Bu olay 28 Şubat 2026'da...
[INFO] Querying Google Fact Check...
[INFO] Querying News API...
[INFO] === OVERALL VERDICT: true === (from Gemini)
[INFO] FINAL CREDIBILITY SCORE: 85
```

### Gemini Yok:

```
[WARN] ⚠️ GEMINI_API_KEY not configured
[INFO] Querying Google Fact Check...
[INFO] Querying News API...
[INFO] === OVERALL VERDICT: unverified ===
[INFO] FINAL CREDIBILITY SCORE: 55
```

---

## ✅ Kurulum Adımları

### 1. Gemini API Key Alın
```
https://aistudio.google.com/app/apikey
```

### 2. Backend .env'ye Ekleyin
```env
GEMINI_API_KEY=AIzaSyD_your_key_here
```

### 3. Backend'i Yeniden Başlatın
```bash
cd backend
npm run dev
```

### 4. Test Edin
```
http://localhost:3000
```

**Test metni:**
```
28 Şubat 2026 tarihinde ABD ve İsrail'in İran'a karşı başlattığı saldırılarda İran'ın dini lideri Hamaney öldürüldü.
```

### 5. Backend Log'larını Kontrol Edin

Şunu görmelisiniz:
```
🤖 Asking Gemini AI...
🤖 Gemini verdict: true (85%)
```

---

## 🎯 Beklenen İyileştirmeler

### Öncesi (Gemini Yok):
```
Hamaney Haberi:
- Sources: 0-2
- Verdict: unverified / false
- Credibility: 50-60 ❌
```

### Sonrası (Gemini Var):
```
Hamaney Haberi:
- Sources: 1+ (Gemini)
- Verdict: true ✅
- Credibility: 80-90 ✅
- Explanation: Detaylı AI açıklaması ✅
```

---

## 🔍 Sorun Giderme

### Hata: "GEMINI_API_KEY not configured"
**Çözüm:** `.env` dosyasına API key ekleyin

### Hata: "Gemini AI fact-check error"
**Çözüm:** 
- API key doğru mu kontrol edin
- İnternet bağlantınızı test edin
- Rate limit aşılmış olabilir (1 dakika bekleyin)

### Gemini çalışıyor mu test etmek için:
Backend terminal'inde şunu arayın:
```
✓ Gemini AI initialized
🤖 Asking Gemini AI...
```

---

## 💡 Önemli Notlar

1. **Gemini ücretsiz** ama rate limit var
2. **API key'i kimseyle paylaşmayın**
3. **Gemini olmadan da sistem çalışır** (ama daha zayıf)
4. **Gemini verdict'e öncelik verir**
5. **Güncel olaylar için Gemini çok önemli**

---

## 🎉 Sonuç

**Gemini AI eklendikten sonra:**

- ✅ Gerçek haberler **gerçek** diyecek
- ✅ Sahte haberler **sahte** diyecek
- ✅ Güncel olayları **bilecek**
- ✅ Bağlamsal **anlayacak**
- ✅ Türkçe ve İngilizce **destekleyecek**

**Sistem çok daha güçlü olacak!** 🚀

---

## 📚 Kaynaklar

- **Gemini API Docs:** https://ai.google.dev/docs
- **API Key Alma:** https://aistudio.google.com/app/apikey
- **Rate Limits:** https://ai.google.dev/pricing

---

**Şimdi API key alın ve sistemi test edin!** 🤖
