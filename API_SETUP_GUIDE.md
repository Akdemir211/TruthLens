# 🚀 News API ve Google Fact Check API Kurulum Rehberi

## 📰 News API Kurulumu

### Adım 1: News API Key Alın (2 dakika, Ücretsiz)

1. **Web sitesine gidin:**
   ```
   https://newsapi.org/register
   ```

2. **Kayıt olun:**
   - İsim, email, şifre girin
   - "Register" butonuna tıklayın

3. **Email'inizi doğrulayın:**
   - Gelen kutunuzu kontrol edin
   - Doğrulama linkine tıklayın

4. **API Key'inizi alın:**
   - Dashboard'a giriş yapın: https://newsapi.org/account
   - "API key" bölümünden key'inizi kopyalayın
   - Örnek: `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6`

### Ücretsiz Plan Limitleri:
- ✅ 100 istek/gün
- ✅ Geliştirme amaçlı kullanım
- ✅ 1 aylık haber arşivi
- ✅ Ticari olmayan projeler

---

## 🔍 Google Fact Check API Kurulumu

### Adım 1: Google Cloud Console'a gidin (5 dakika, Ücretsiz)

1. **Google Cloud Console'a gidin:**
   ```
   https://console.cloud.google.com/
   ```

2. **Google hesabınızla giriş yapın**
   - Gmail hesabınızı kullanın

### Adım 2: Yeni Proje Oluşturun

1. **Proje seçiciye tıklayın:**
   - Üst menüde "Select a project" yazısına tıklayın
   
2. **"NEW PROJECT" butonuna tıklayın**

3. **Proje adı girin:**
   - Proje adı: `TruthLens` veya `Fact-Checker`
   - "CREATE" butonuna tıklayın
   - 30 saniye bekleyin

### Adım 3: Fact Check Tools API'yi Enable Edin

1. **API Library'ye gidin:**
   ```
   https://console.cloud.google.com/apis/library
   ```

2. **"Fact Check Tools API" arayın:**
   - Arama kutusuna "Fact Check" yazın
   - "Fact Check Tools API" seçeneğine tıklayın

3. **Enable butonuna tıklayın:**
   - Mavi "ENABLE" butonuna tıklayın
   - API aktif hale gelecek (1-2 dakika)

### Adım 4: API Key Oluşturun

1. **Credentials sayfasına gidin:**
   ```
   https://console.cloud.google.com/apis/credentials
   ```

2. **"+ CREATE CREDENTIALS" butonuna tıklayın**

3. **"API key" seçin**

4. **API Key'inizi kopyalayın:**
   - Otomatik olarak key oluşturulacak
   - "COPY" butonuna tıklayın
   - Örnek: `AIzaSyD1234567890abcdefghijklmnopqrstu`

5. **API Key'i kısıtlayın (Önerilen):**
   - "RESTRICT KEY" butonuna tıklayın
   - "API restrictions" bölümünde:
     - "Restrict key" seçin
     - "Fact Check Tools API" seçin
   - "SAVE" butonuna tıklayın

### Ücretsiz Plan Limitleri:
- ✅ 10,000 istek/gün (ücretsiz)
- ✅ Ticari kullanım mümkün
- ✅ Kredi kartı gerekmez (başlangıç için)

---

## ⚙️ API Key'leri Projeye Ekleyin

### Backend .env Dosyasını Güncelleyin

1. **`.env` dosyasını açın:**
   ```
   backend/.env
   ```

2. **API key'lerinizi ekleyin:**

**Şu anda:**
```env
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://qylhgfszyhvuaehmrjyq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# External APIs (Optional)
NEWS_API_KEY=
GOOGLE_FACT_CHECK_API_KEY=
```

**Güncellenmiş (API key'lerinizi ekleyin):**
```env
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://qylhgfszyhvuaehmrjyq.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# External APIs
NEWS_API_KEY=BURAYA_NEWS_API_KEYINIZI_YAPIŞTIRIN
GOOGLE_FACT_CHECK_API_KEY=BURAYA_GOOGLE_API_KEYINIZI_YAPIŞTIRIN
```

3. **Dosyayı kaydedin**

---

## ✅ Test Edin

### Backend'i Yeniden Başlatın

API key'leri ekledikten sonra backend'i yeniden başlatmanız gerekir:

```bash
# Eğer çalışıyorsa durdurun (Ctrl+C)
# Sonra tekrar başlatın:
cd backend
npm run dev
```

### Frontend'de Test Edin

1. **http://localhost:3000** adresine gidin

2. **Bu test metnini yapıştırın:**
```
Breaking News: Scientists discover new planet in our solar system. The planet, named "Nibiru", is approaching Earth at unprecedented speed. NASA officials remain silent on the matter. Multiple astronomers from Harvard University confirmed the discovery yesterday.
```

3. **"Analiz Et" butonuna tıklayın**

4. **Gelişmiş sonuçları görün:**
   - ✅ AI Detection Score
   - ✅ **Fact Check sonuçları** (News API sayesinde)
   - ✅ **Benzer haberler** (News API'den)
   - ✅ **Kaynak doğrulama** (Google Fact Check'ten)
   - ✅ Credibility Score

---

## 🎯 API'ler Eklenince Ne Değişir?

### Öncesi (API'ler olmadan):
- ❌ Fact-checking çok sınırlı
- ❌ Benzer haber bulunamıyor
- ❌ Kaynak doğrulama yok
- ⚠️ Credibility score düşük

### Sonrası (API'ler ile):
- ✅ Google Fact Check'ten profesyonel doğrulama
- ✅ News API'den benzer 3-5 haber makalesi
- ✅ Güvenilir kaynaklardan cross-reference
- ✅ Daha yüksek credibility score
- ✅ Daha fazla kaynak (Reuters, BBC, AP, vb.)

---

## 📊 Örnek Sonuç Karşılaştırması

### API'ler Olmadan:
```json
{
  "factCheck": {
    "claims": [],
    "overallVerdict": "no_claims_found"
  },
  "similarArticles": [],
  "credibilityScore": 50
}
```

### API'ler İle:
```json
{
  "factCheck": {
    "claims": [
      {
        "text": "New planet discovered in solar system",
        "verdict": "false",
        "confidence": 0.92,
        "sources": [
          {
            "title": "NASA: No New Planet in Solar System",
            "url": "https://reuters.com/...",
            "credibility": 95
          }
        ]
      }
    ],
    "overallVerdict": "mostly_false"
  },
  "similarArticles": [
    {
      "title": "Debunking Solar System Myths",
      "source": "BBC Science",
      "similarity": 0.78
    }
  ],
  "credibilityScore": 85
}
```

---

## 🔒 Güvenlik Notları

### ✅ Yapmanız Gerekenler:
- API key'leri `.env` dosyasında saklayın
- `.env` dosyası `.gitignore`'da (zaten eklendi)
- API key'leri asla GitHub'a yüklemeyin
- Production'da environment variables kullanın

### ❌ Yapmamanız Gerekenler:
- API key'leri frontend koduna yazmayın
- API key'leri public repository'de paylaşmayın
- API key'leri screenshot'larda göstermeyin

---

## 🆘 Sorun Giderme

### News API hatası alıyorum
**Hata:** `401 Unauthorized`
**Çözüm:** API key'inizi kontrol edin, doğru kopyalandığından emin olun

### Google Fact Check çalışmıyor
**Hata:** `403 Forbidden`
**Çözüm:** 
1. API'nin enable olduğundan emin olun
2. Billing açık mı kontrol edin (ücretsiz kota için gerekli değil)
3. API key restrictions'ı kontrol edin

### API limitleri aşıldı
**Hata:** `429 Too Many Requests`
**Çözüm:** 
- News API: Günde 100 istek limitiniz var, yarın tekrar deneyin
- Google: Günde 10,000 istek, normal kullanımda aşılmaz

---

## 📈 İleriye Dönük Planlama

### Ücretsiz Limitler Yetmezse:

**News API:**
- Developer Plan: $0 (100 req/day)
- Business Plan: $449/month (250,000 req/day)

**Google Fact Check:**
- İlk 10,000 ücretsiz
- Sonrası: $0.005 per request

### Alternatif API'ler:
- **Bing News API** (Microsoft)
- **NewsData.io** (ücretsiz tier)
- **MediaStack API**

---

## 🎉 Sonuç

API key'leri ekledikten sonra:
1. Backend'i yeniden başlatın
2. Test metni ile deneyin
3. Çok daha güçlü analiz sonuçları görün!

**Sorularınız olursa yardımcı olmaya hazırım!** 🚀
