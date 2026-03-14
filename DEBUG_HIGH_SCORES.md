# 🔍 Debugging Guide - Yüksek Credibility Score Problemi

## ⚠️ Problem

Sahte/yanlış haberlere hala %81 gibi yüksek credibility score veriliyor.

## ✅ Yapılan İyileştirmeler

### 1. Çok Detaylı Log Sistemi Eklendi

Backend'de artık her adımda detaylı loglar göreceksiniz:

```
=== CREDIBILITY ADJUSTMENT START ===
Base Score: 65
Overall Verdict: mostly_false
AI Probability: 0.65
Claims Count: 2
Claim 1: false (confidence: 0.85)
Claim 2: unverified (confidence: 0.60)
✓ Verdict is mostly_false - capping credibility at 40
After verdict adjustment: 40
✓ 1 false claims - reducing credibility by 15
After false claims penalty: 25
FINAL CREDIBILITY SCORE: 25
=== CREDIBILITY ADJUSTMENT END ===
```

### 2. Overall Verdict Hesaplaması İyileştirildi

**Yeni Mantık:**
- **1 veya daha fazla false claim** → `mostly_false`
- **Yarısından fazla misleading** → `misleading`
- **Hepsi unverified** → `unverified`
- **%70+ true** → `mostly_true`
- **Diğer** → `mixed`

### 3. Credibility Score Daha Sıkı Kurallar

```typescript
if (verdict === 'false') → Max 30
if (verdict === 'mostly_false') → Max 40  
if (verdict === 'misleading') → Max 55
if (verdict === 'unverified') → Max 60
if (verdict === 'no_claims_found') → Max 50

+ Her false claim → -15 puan
+ Her misleading claim → -10 puan
+ AI probability > 0.7 → -10 puan
```

---

## 🧪 Test Yapın

### Adım 1: Backend'i Kontrol Edin

Backend terminal'inde şunu görmelisiniz:
```
🚀 TruthLens API running on http://localhost:5000
Environment: development
```

### Adım 2: Frontend'i Açın

```
http://localhost:3000
```

### Adım 3: Bu Sahte Haber Metnini Test Edin

```
Cumhurbaşkanı Recep Tayyip Erdoğan bugün sabah saatlerinde hayatını kaybetti. Çankaya Köşkü'nde yapılan açıklamada ani rahatsızlık sonucu vefat ettiği bildirildi. Cenaze töreni yarın Ankara'da yapılacak.
```

### Adım 4: Backend Terminal'ini İzleyin

**Göreceğiniz Loglar:**

```
[INFO] POST /api/analyze-text
[INFO] Starting analysis abc-123
[INFO] Starting AI detection analysis
[INFO] Starting fact check
[INFO] Extracting claims from text
[INFO] Extracted 2 claims
[INFO] Querying Google Fact Check: "Erdoğan öldü"
[INFO] Google Fact Check found X results
[INFO] Determining verdict from X sources
[INFO] Google Fact Check marked as FALSE (veya UNVERIFIED)
[INFO] === CALCULATING OVERALL VERDICT FROM 2 CLAIMS ===
[INFO] True: 0, False: 1, Misleading: 0, Unverified: 1
[INFO] → Verdict: mostly_false (found 1 false claims)
[INFO] === OVERALL VERDICT: mostly_false ===
[INFO] === CREDIBILITY ADJUSTMENT START ===
[INFO] Base Score: XX
[INFO] Overall Verdict: mostly_false
[INFO] ✓ Verdict is mostly_false - capping credibility at 40
[INFO] After verdict adjustment: 40
[INFO] ✓ 1 false claims - reducing credibility by 15
[INFO] After false claims penalty: 25
[INFO] FINAL CREDIBILITY SCORE: 25
[INFO] Analysis abc-123 completed successfully - Credibility: 25
```

### Adım 5: Sonuçları Kontrol Edin

**Beklenen:**
- 🔴 **Credibility Score: 20-40**
- 🔴 **Overall Verdict: mostly_false**
- ⚠️ **"Çok Düşük Güvenilirlik" göstergesi**

---

## 🔍 Sorun Giderme

### Hala Yüksek Skor Alıyorsa:

#### 1. Backend Çalışıyor mu?
```bash
# Terminal'de kontrol et
curl http://localhost:5000/api/health
```

Şunu görmelisiniz:
```json
{"status":"ok","service":"TruthLens API"}
```

#### 2. API Key'ler Doğru mu?

Backend `.env` dosyasını kontrol edin:
```env
NEWS_API_KEY=13d5320f2ee2442ab4a173aa510ece8d
GOOGLE_FACT_CHECK_API_KEY=AIzaSyAp725XJZQ0hUpiqmSep33CdizPLK1mz0c
```

#### 3. Backend Log'larında Hata Var mı?

Terminal'de şunları arayın:
```
[ERROR] ...
[WARN] Google Fact Check API key not configured
[WARN] News API key not configured
```

#### 4. Claim Bulunamıyorsa?

Eğer log'da şunu görüyorsanız:
```
[INFO] No verifiable claims found
[INFO] === OVERALL VERDICT: no_claims_found ===
```

Bu durumda:
- Metin çok kısa olabilir
- Metin iddia içermiyor olabilir
- Score 50'ye sınırlanacak

#### 5. API'ler Yanıt Vermiyor mu?

Eğer şunları görüyorsanız:
```
[ERROR] Google Fact Check API error: 403
[ERROR] News API error: 401
```

API key'leri kontrol edin veya internet bağlantınızı test edin.

---

## 📊 Debug Test Metinleri

### Test 1: Açık Sahte Haber (En Düşük Skor)
```
Bill Gates öldü. Microsoft kurucusu Bill Gates bugün sabah evinde ölü bulundu. Ailesi açıklama yaptı.
```
**Beklenen: 15-30**

### Test 2: Erdoğan Ölüm Haberi
```
Cumhurbaşkanı Erdoğan vefat etti. Ankara'da yapılan törende cenaze namazı kılındı.
```
**Beklenen: 20-35**

### Test 3: Bilimsel Sahte Haber
```
Bilim insanları kanser ilacı buldu. Tüm kanser türlerini tedavi eden mucize ilaç keşfedildi. Yarın eczanelerde satışa sunulacak.
```
**Beklenen: 25-40**

### Test 4: Gerçek Haber (Yüksek Skor)
```
Türkiye Cumhurbaşkanı Erdoğan bugün Ankara'da bir açıklama yaptı. Ekonomi reformları hakkında detaylar verdi.
```
**Beklenen: 60-80**

---

## 🎯 Manuel Test Adımları

1. ✅ Tüm Node process'lerini temizleyin
2. ✅ Backend'i başlatın (`cd backend && npm run dev`)
3. ✅ Frontend'i başlatın (`cd frontend && npm run dev`)
4. ✅ http://localhost:3000 açın
5. ✅ Sahte haber metni yapıştırın
6. ✅ "Analiz Et" butonuna tıklayın
7. ✅ Backend terminal'ini izleyin
8. ✅ Sonucu frontend'de kontrol edin
9. ✅ Backend log'larını okuyun

---

## 📝 Log Okuma Rehberi

### İyi Durum ✅
```
[INFO] Querying Google Fact Check: "..."
[INFO] Google Fact Check found 2 results
[INFO] → Verdict: mostly_false
[INFO] FINAL CREDIBILITY SCORE: 25
```

### Sorunlu Durum ⚠️
```
[WARN] Google Fact Check API key not configured
[INFO] No sources found - verdict: unverified
[INFO] FINAL CREDIBILITY SCORE: 65  ← YÜKSEK!
```

### API Hatası ❌
```
[ERROR] Google Fact Check API error: 403 - ...
[ERROR] News API error: 401 - Invalid API key
```

---

## 🚀 Hızlı Düzeltme

Eğer hala sorun varsa:

```bash
# 1. Tüm process'leri durdur
Get-Process node | Stop-Process -Force

# 2. Backend'i başlat
cd backend
npm run dev

# 3. Frontend'i başlat (başka terminal)
cd frontend
npm run dev

# 4. Test et
# http://localhost:3000
```

---

**Not:** Backend yeniden başlatıldı ve çok daha detaylı log'lar eklendi. Şimdi test edin ve backend terminal'indeki log'ları bana gönderin!

Hangi metni test ettiniz ve backend terminal'inde ne gördünüz? 🔍
