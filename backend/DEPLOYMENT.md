# TruthLens Backend Deployment

## Railway Deployment

### Adımlar

1. Railway hesabınıza giriş yapın: https://railway.app
2. "New Project" > "Deploy from GitHub repo" seçin
3. TruthLens repository'sini seçin
4. "Add variables" ile environment variables ekleyin:

```
PORT=5000
NODE_ENV=production
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
NEWS_API_KEY=your_news_api_key
GOOGLE_FACT_CHECK_API_KEY=your_google_api_key
FRONTEND_URL=https://your-frontend.vercel.app
```

5. "Deploy" butonuna tıklayın

### Build Ayarları

- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Root Directory:** `backend`

## Render Deployment (Alternatif)

1. Render hesabınıza giriş yapın: https://render.com
2. "New +" > "Web Service"
3. GitHub repository'nizi bağlayın
4. Ayarları yapılandırın:
   - **Name:** truthlens-api
   - **Root Directory:** backend
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

5. Environment variables ekleyin (yukarıdaki listeyi kullanın)

## API URL

Deploy işlemi tamamlandıktan sonra, size verilen URL'i frontend `.env.local` dosyasına ekleyin:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

## Veritabanı

Supabase projesi zaten cloud'da çalıştığı için ayrı bir deployment'a gerek yok. Sadece connection string'leri environment variables olarak ekleyin.
