# TruthLens - Fake News & AI Generated Text Detection Engine

<div align="center">

🔍 **AI tarafından üretilmiş metinleri ve sahte haberleri tespit edin**

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-4.18-green)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-brightgreen)](https://supabase.com/)

[Demo](#) • [Dokümantasyon](#-dokümantasyon) • [Kurulum](#-hızlı-başlangıç)

</div>

---

## 🌟 Özellikler

- 🤖 **AI-Powered Fact Checking** - Google Gemini AI ile gerçek zamanlı doğrulama
- ✨ **AI Detection** - İstatistiksel analiz ve NLP ile AI üretimi metin tespiti
- 🔎 **Multi-Source Verification** - Gemini AI, Google Fact Check ve News API
- 📊 **Smart Credibility Scoring** - AI destekli akıllı skorlama
- 🔗 **Similar Articles** - Benzer haber makaleleri bulma
- 📈 **Visual Reports** - Detaylı ve anlaşılır analiz raporları
- 🚀 **Real-time Analysis** - Hızlı ve etkili metin analizi
- 🌍 **Multi-Language** - Türkçe ve İngilizce desteği

## 🎯 Nasıl Çalışır?

```mermaid
graph LR
    A[Metin Girişi] --> B[AI Detection]
    A --> C[Claim Extraction]
    C --> D{Gemini AI}
    D --> E[Fact Checking]
    E --> F[Google Fact Check]
    E --> G[News API]
    B --> H[Credibility Score]
    D --> H
    F --> H
    G --> H
    H --> I[Analiz Raporu]
```

1. **Metin Girişi**: Kullanıcı analiz etmek istediği metni girer (10-5000 karakter)
2. **AI Detection**: İstatistiksel ve NLP tabanlı AI tespit algoritması çalışır
3. **Claim Extraction**: Metindeki doğrulanabilir iddialar çıkarılır
4. **Gemini AI Verification**: Google Gemini AI ile gerçek zamanlı doğrulama (ÖNCELİKLİ) 🤖
5. **Multi-Source Fact Checking**: Google Fact Check ve News API ile çapraz doğrulama
6. **Credibility Analysis**: AI destekli akıllı skorlama
7. **Report**: Detaylı analiz raporu kullanıcıya sunulur

## 🚀 Hızlı Başlangıç

### Gereksinimler

- Node.js 18+
- npm veya yarn
- Supabase hesabı (ücretsiz)

### 1. Kurulum

```bash
# Projeyi klonlayın veya indirin
cd TruthLens

# Dependencies yükleyin
npm install

# Backend dependencies
cd backend && npm install

# Frontend dependencies
cd ../frontend && npm install
```

### 2. Supabase Setup

1. [Supabase](https://supabase.com) hesabı oluşturun
2. Yeni proje oluşturun
3. SQL Editor'de `backend/database/schema.sql` dosyasını çalıştırın
4. API credentials'ları kopyalayın

### 3. Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Aşağıdaki değerleri .env dosyasına ekleyin:
```

**Gerekli API Keys:**

```bash
# Supabase (Zorunlu)
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key

# Google Gemini AI (ÖNEMLİ - Sistem için kritik!)
GEMINI_API_KEY=your_gemini_api_key

# Diğer API'ler (Opsiyonel)
NEWS_API_KEY=your_news_api_key
GOOGLE_FACT_CHECK_API_KEY=your_google_api_key
```

🤖 **Gemini API Key Nasıl Alınır?**
1. https://aistudio.google.com/app/apikey adresine gidin
2. Google hesabınızla giriş yapın
3. "Create API Key" butonuna tıklayın
4. API key'inizi kopyalayın

📚 **Detaylı rehber:** [GEMINI_AI_SETUP.md](GEMINI_AI_SETUP.md)

**Frontend (.env.local):**
```bash
cd frontend
cp .env.local.example .env.local
```

### 4. Çalıştırın

```bash
# Root directory'den
npm run dev
```

🎉 Tarayıcınızda http://localhost:3000 adresine gidin!

**Detaylı kurulum için:** [QUICKSTART.md](./QUICKSTART.md) veya [SETUP.md](./SETUP.md)

## 🏗️ Proje Yapısı

```
TruthLens/
├── frontend/                 # Next.js React uygulaması
│   ├── app/                 # Next.js App Router pages
│   ├── components/          # React components
│   ├── services/            # API client
│   └── types/               # TypeScript types
│
├── backend/                 # Express.js API
│   ├── src/
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   │   ├── ai-detection.service.ts
│   │   │   ├── fact-check.service.ts
│   │   │   ├── claim-extraction.service.ts
│   │   │   └── source-credibility.service.ts
│   │   └── utils/          # Utilities
│   └── database/           # Supabase schema
│
└── docs/                   # Documentation
```

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS
- **Charts:** Recharts
- **State:** Zustand
- **HTTP:** Axios

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** Supabase (PostgreSQL)
- **AI Models:** 
  - **Google Gemini AI** 🤖 (Primary)
  - Natural (NLP)
- **Validation:** Zod

### External Services
- **Google Gemini AI** 🤖 - AI-powered fact checking (Primary)
- **Google Fact Check API** - Verified fact checking database
- **News API** - News article search
- **Supabase** - Database ve authentication

## 📡 API

### POST `/api/analyze-text`

**Request:**
```json
{
  "text": "Almanya hükümeti elektrikli arabaları yasakladı..."
}
```

**Response:**
```json
{
  "analysisId": "uuid",
  "aiDetection": {
    "probability": 0.72,
    "confidence": 0.85,
    "indicators": {
      "perplexity": "low",
      "repetitiveness": "high",
      "stylometry": "llm-like",
      "lexicalDiversity": 0.42,
      "sentenceLengthVariance": 15.3,
      "readabilityScore": 65.2
    },
    "explanation": "Düşük perplexity ve tekrarlayan yapı..."
  },
  "factCheck": {
    "claims": [...],
    "overallVerdict": "mostly_false"
  },
  "credibilityScore": 65,
  "similarArticles": [...],
  "timestamp": "2026-03-11T10:30:00Z"
}
```

**Detaylı API dokümantasyonu:** [API.md](./API.md)

## 📚 Dokümantasyon

- **[QUICKSTART.md](./QUICKSTART.md)** - 5 dakikada başlangıç
- **[SETUP.md](./SETUP.md)** - Detaylı kurulum rehberi
- **[API.md](./API.md)** - API endpoint dokümantasyonu
- **[DEPLOYMENT.md](./backend/DEPLOYMENT.md)** - Production deployment

## 🚀 Deployment

### Frontend (Vercel)
```bash
cd frontend
vercel
```

### Backend (Railway/Render)
1. GitHub repository'nizi bağlayın
2. Environment variables ekleyin
3. Deploy edin

**Detaylı deployment rehberi:** [backend/DEPLOYMENT.md](./backend/DEPLOYMENT.md) ve [frontend/DEPLOYMENT.md](./frontend/DEPLOYMENT.md)

## 🧪 Test

```bash
# Backend test
cd backend
npm test

# Frontend test
cd frontend
npm test

# E2E test
npm run test:e2e
```

## 🤝 Katkıda Bulunma

Katkılarınızı bekliyoruz! Lütfen şu adımları takip edin:

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

## 📝 Roadmap

- [ ] Multi-language support (İngilizce, Türkçe, Almanca)
- [ ] Chrome extension
- [ ] User authentication ve analysis history
- [ ] Advanced AI models (OpenAI, HuggingFace)
- [ ] Image and video deepfake detection
- [ ] Real-time social media monitoring
- [ ] API rate limiting ve caching

## ⚠️ Önemli Notlar

- Bu araç **bilgilendirme amaçlıdır** ve %100 doğruluk garanti etmez
- Fact-checking sonuçları, kullanılan API'lerin kalitesine bağlıdır
- API key'ler olmadan bazı özellikler çalışmayabilir
- Production kullanımı için rate limiting ve monitoring ekleyin

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın

## 🙏 Teşekkürler

- News API
- Google Fact Check API
- Supabase
- Next.js ve Express.js toplulukları

---

<div align="center">

**Yapımcı:** AI Engineer

**Versiyon:** 1.0.0

[GitHub](https://github.com/yourusername/truthlens) • [Issues](https://github.com/yourusername/truthlens/issues) • [Docs](./docs)

</div>
