# TruthLens - Kurulum Rehberi

Bu rehber, TruthLens projesini sıfırdan kurmanız için gereken tüm adımları içerir.

## Gereksinimler

- Node.js 18+ 
- npm veya yarn
- Supabase hesabı (ücretsiz)
- News API key (opsiyonel ama önerilen)
- Google Fact Check API key (opsiyonel)

## 1. Projeyi Klonlama veya İndirme

Projenizin bulunduğu dizinde:

```bash
cd TruthLens
```

## 2. Dependencies Yükleme

### Root seviyede (monorepo)

```bash
npm install
```

### Backend dependencies

```bash
cd backend
npm install
```

### Frontend dependencies

```bash
cd ../frontend
npm install
```

## 3. Supabase Kurulumu

### 3.1 Supabase Projesi Oluşturma

1. https://supabase.com adresine gidin
2. "New Project" butonuna tıklayın
3. Proje adı, veritabanı şifresi belirleyin
4. Region seçin (Europe (West) önerilir)
5. "Create new project" butonuna tıklayın

### 3.2 Database Schema Oluşturma

1. Supabase dashboard'unuzda "SQL Editor" sekmesine gidin
2. `backend/database/schema.sql` dosyasının içeriğini kopyalayın
3. SQL Editor'e yapıştırın
4. "Run" butonuna tıklayın

### 3.3 API Keys Alma

1. Project Settings > API sekmesine gidin
2. Şu bilgileri not alın:
   - **Project URL** (SUPABASE_URL)
   - **anon public** key (SUPABASE_ANON_KEY)

## 4. External API Keys

### 4.1 News API (Önerilen)

1. https://newsapi.org adresine gidin
2. "Get API Key" butonuna tıklayın
3. Ücretsiz plan için kayıt olun
4. API key'inizi kopyalayın

### 4.2 Google Fact Check API (Opsiyonel)

1. https://console.cloud.google.com adresine gidin
2. Yeni proje oluşturun
3. "Enable APIs and Services" > "Fact Check Tools API" arayın
4. API'yi enable edin
5. "Credentials" sekmesinden API key oluşturun

## 5. Environment Variables Kurulumu

### 5.1 Backend .env dosyası

```bash
cd backend
cp .env.example .env
```

`.env` dosyasını düzenleyin:

```env
PORT=5000
NODE_ENV=development

# Supabase
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here

# External APIs
NEWS_API_KEY=your-news-api-key
GOOGLE_FACT_CHECK_API_KEY=your-google-api-key

# Optional
OPENAI_API_KEY=optional
HUGGINGFACE_API_KEY=optional
```

### 5.2 Frontend .env.local dosyası

```bash
cd ../frontend
cp .env.local.example .env.local
```

`.env.local` dosyasını düzenleyin:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## 6. Projeyi Çalıştırma

### Seçenek 1: Tüm projeyi root'tan çalıştırma (Önerilen)

Root dizinde:

```bash
npm run dev
```

Bu komut hem backend hem frontend'i aynı anda başlatır.

### Seçenek 2: Ayrı terminallerde çalıştırma

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```

Backend şurada çalışır: http://localhost:5000

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```

Frontend şurada çalışır: http://localhost:3000

## 7. İlk Test

1. Tarayıcınızda http://localhost:3000 adresine gidin
2. Metin alanına bir örnek metin yapıştırın:

```
Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı. Bu karar Avrupa Birliği'nde büyük tartışmalara yol açtı.
```

3. "Analiz Et" butonuna tıklayın
4. Sonuçları inceleyin

## 8. Sorun Giderme

### Backend başlamıyor

**Hata:** `Error: Supabase credentials not found`
**Çözüm:** `.env` dosyasını kontrol edin, SUPABASE_URL ve SUPABASE_ANON_KEY'in doğru olduğundan emin olun.

**Hata:** `Port 5000 already in use`
**Çözüm:** `.env` dosyasında PORT değişkenini farklı bir port'a değiştirin (örn: 5001)

### Frontend başlamıyor

**Hata:** TypeScript errors
**Çözüm:** `npm install` komutunu tekrar çalıştırın ve tüm dependencies'in yüklendiğinden emin olun.

### API bağlantı hatası

**Hata:** `Network Error` veya `Connection refused`
**Çözüm:** 
- Backend servisinin çalıştığından emin olun (http://localhost:5000/api/health kontrol edin)
- `.env.local` dosyasında NEXT_PUBLIC_API_URL'in doğru olduğundan emin olun

### Analiz çalışmıyor

**Sorun:** Analiz sonucu döndürülmüyor
**Çözüm:**
- Tarayıcı Console'unu açın (F12) ve hata mesajlarını kontrol edin
- Backend terminal loglarını inceleyin
- API key'lerinizin geçerli olduğundan emin olun

## 9. Geliştirme İpuçları

### Hot Reload

Hem backend hem frontend hot reload destekler. Dosyalarda yaptığınız değişiklikler otomatik olarak yansır.

### Backend Loglama

Backend terminal'inde detaylı loglar göreceksiniz:
- API istekleri
- Analiz adımları
- Hatalar ve uyarılar

### TypeScript Kontrol

**Backend:**
```bash
cd backend
npx tsc --noEmit
```

**Frontend:**
```bash
cd frontend
npm run lint
```

## 10. Production Build Test (Opsiyonel)

Deploy etmeden önce production build'i test edin:

**Backend:**
```bash
cd backend
npm run build
npm start
```

**Frontend:**
```bash
cd frontend
npm run build
npm start
```

## Sonraki Adımlar

- [Deployment Guide](./DEPLOYMENT.md) - Projeyi production'a deploy etme
- [API Documentation](./API.md) - API endpoint'lerinin detaylı dökümantasyonu
- [Contributing Guide](./CONTRIBUTING.md) - Projeye katkıda bulunma

## Destek

Sorun yaşarsanız:
1. Bu dokümantasyonu tekrar okuyun
2. GitHub Issues'da arayın
3. Yeni bir issue açın

İyi kodlamalar! 🚀
