# TruthLens - Web Yayınlama Rehberi

Bu rehber, TruthLens projesini ücretsiz olarak internette yayınlamak için adım adım talimatlar içerir.

## Tek Tıkla Deploy Bağlantıları

| Servis | Bağlantı |
|--------|----------|
| **Backend (Render)** | [Deploy to Render](https://render.com/deploy?repo=https://github.com/Akdemir211/TruthLens) |
| **Frontend (Vercel)** | [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Akdemir211/TruthLens) |

---

## Mimari

- **Frontend**: Next.js (Vercel)
- **Backend**: Express API (Railway veya Render)

---

## Adım 1: Backend'i Yayınla (Önce Backend!)

Backend önce yayınlanmalı çünkü frontend, API URL'sine ihtiyaç duyacak.

### Seçenek A: Railway (Önerilen)

1. [railway.app](https://railway.app) adresine git ve GitHub ile giriş yap
2. **"New Project"** → **"Deploy from GitHub repo"**
3. TruthLens reposunu seç
4. **Settings** → **Root Directory**: `backend` olarak ayarla
5. **Variables** sekmesine git ve şu değişkenleri ekle:
   - `GEMINI_API_KEY` - [Google AI Studio](https://aistudio.google.com/app/apikey)'dan al
   - `NEWS_API_KEY` - [NewsAPI](https://newsapi.org)'dan al (opsiyonel)
   - `SUPABASE_URL` - Supabase proje URL'in
   - `SUPABASE_ANON_KEY` - Supabase anon key
   - `FRONTEND_URL` - Henüz boş bırak, frontend yayınlandıktan sonra ekle (örn: `https://truthlens.vercel.app`)
6. **Deploy** butonuna tıkla
7. Yayınlandıktan sonra **Settings** → **Networking** → **Generate Domain** ile URL al (örn: `https://truthlens-api.up.railway.app`)

### Seçenek B: Render (Tek Tıkla)

1. [Deploy to Render](https://render.com/deploy?repo=https://github.com/Akdemir211/TruthLens) bağlantısına tıkla
2. GitHub ile giriş yap
3. **Apply** ile `render.yaml` ayarlarını uygula (Root Directory: backend otomatik)
4. **Environment Variables** ekle: `GEMINI_API_KEY`, `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `NEWS_API_KEY`
5. **Create Web Service** ile yayınla
6. Deploy tamamlanınca backend URL'ini kopyala (örn: `https://truthlens-api.onrender.com`)

---

## Adım 2: Frontend'i Yayınla (Vercel)

1. [Deploy to Vercel](https://vercel.com/new/clone?repository-url=https://github.com/Akdemir211/TruthLens) bağlantısına tıkla
2. GitHub ile giriş yap (gerekirse)
3. **Configure Project** ekranında:
   - **Root Directory**: `frontend` olarak ayarla (Edit → frontend klasörünü seç)
   - **Framework Preset**: Next.js (otomatik algılanır)
4. **Environment Variables** bölümüne git ve ekle:
   - Name: `NEXT_PUBLIC_API_URL`
   - Value: Backend URL'in (Render'dan aldığın, örn: `https://truthlens-api.onrender.com`)
5. **Deploy** butonuna tıkla

---

## Adım 3: CORS ve URL Güncellemesi

Frontend yayınlandıktan sonra:

1. **Railway/Render** → Backend projesi → **Variables**
2. `FRONTEND_URL` değişkenini ekle: `https://truthlens-xxx.vercel.app` (Vercel'den aldığın URL)
3. Backend'i yeniden deploy et (Variables değişince otomatik olabilir)

---

## Ortam Değişkenleri Özeti

### Backend (Railway/Render)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| GEMINI_API_KEY | ✅ | Google AI Studio API anahtarı |
| NEWS_API_KEY | ⚠️ | NewsAPI anahtarı (benzer haberler için) |
| SUPABASE_URL | ⚠️ | Supabase proje URL |
| SUPABASE_ANON_KEY | ⚠️ | Supabase anon key |
| FRONTEND_URL | ✅ | Vercel frontend URL (CORS için) |

### Frontend (Vercel)

| Değişken | Zorunlu | Açıklama |
|----------|---------|----------|
| NEXT_PUBLIC_API_URL | ✅ | Backend API URL (Railway/Render) |

---

## Sorun Giderme

### "API bağlantısı kurulamadı"
- Backend URL'in doğru mu kontrol et (`NEXT_PUBLIC_API_URL`)
- Backend'in çalıştığından emin ol (Railway/Render dashboard)
- CORS: `FRONTEND_URL` backend'de doğru ayarlı mı?

### Build hatası
- `npm run build` lokal ortamda çalışıyor mu test et
- Node.js versiyonu: 18+ önerilir

### Rate limit / 429 hatası
- Railway/Render free tier sınırlarına takılmış olabilir
- Birkaç dakika bekleyip tekrar dene

---

## Özel Domain (Opsiyonel)

- **Vercel**: Project Settings → Domains → Kendi domainini ekle
- **Railway**: Settings → Networking → Custom Domain
