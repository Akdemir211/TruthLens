# TruthLens Frontend Deployment

## Vercel Deployment

### Hızlı Deployment

1. Vercel hesabınıza giriş yapın: https://vercel.com
2. "Add New..." > "Project"
3. GitHub repository'nizi import edin
4. Ayarları yapılandırın:
   - **Framework Preset:** Next.js
   - **Root Directory:** frontend
   - **Build Command:** `npm run build`
   - **Output Directory:** `.next`

5. Environment Variables ekleyin:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

6. "Deploy" butonuna tıklayın

### Vercel CLI ile Deployment

```bash
cd frontend
npm install -g vercel
vercel login
vercel
```

Komutları takip ederek deploy edin.

### Environment Variables

Production ortamında backend API URL'inizi ekleyin:

```
NEXT_PUBLIC_API_URL=https://truthlens-api.railway.app
```

### Custom Domain (Opsiyonel)

Vercel dashboard'undan:
1. Projenizi seçin
2. "Settings" > "Domains"
3. Custom domain ekleyin

## Build Kontrolü (Local)

Deploy etmeden önce local'de test edin:

```bash
npm run build
npm start
```

Hata yoksa deploy edebilirsiniz.

## Post-Deployment

1. Backend URL'in doğru olduğundan emin olun
2. CORS ayarlarının production URL'i içerdiğinden emin olun
3. Test için bir metin analiz edin

## Sorun Giderme

**Build hatası alıyorsanız:**
- TypeScript hatalarını kontrol edin
- Dependencies'lerin yüklendiğinden emin olun
- Build loglarını inceleyin

**API bağlantı hatası alıyorsanız:**
- NEXT_PUBLIC_API_URL doğru mu kontrol edin
- Backend servisinizin çalıştığından emin olun
- CORS ayarlarını kontrol edin
