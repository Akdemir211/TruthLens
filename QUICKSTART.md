# 🚀 Quick Start Guide

TruthLens'i hızlı bir şekilde çalıştırmak için bu rehberi takip edin.

## ⚡ 5 Dakikada Başlangıç

### 1. Dependencies'leri Yükleyin

```bash
# Root directory'de
npm install

# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Supabase'i Kurun

1. https://supabase.com adresine gidip ücretsiz hesap açın
2. Yeni proje oluşturun
3. SQL Editor'de `backend/database/schema.sql` dosyasını çalıştırın
4. API credentials'ları kopyalayın

### 3. Environment Variables

**Backend (.env):**
```bash
cd backend
cp .env.example .env
# Ardından .env dosyasını Supabase bilgilerinizle düzenleyin
```

**Frontend (.env.local):**
```bash
cd frontend
cp .env.local.example .env.local
# Genelde varsayılan değerler yeterlidir
```

### 4. Çalıştırın!

Root directory'de:
```bash
npm run dev
```

**Veya ayrı terminallerden:**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

### 5. Test Edin

1. http://localhost:3000 adresine gidin
2. Bu örnek metni yapıştırın:

```
Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı. Bu karar Avrupa Birliği'nde büyük tartışmalara yol açtı. Uzmanlar, bu kararın iklim değişikliği ile mücadelede büyük bir geri adım olduğunu belirtiyor.
```

3. "Analiz Et" butonuna tıklayın
4. Sonuçları inceleyin!

## 📚 Detaylı Dökümanlar

- **[SETUP.md](./SETUP.md)** - Detaylı kurulum rehberi
- **[API.md](./API.md)** - API dokümantasyonu
- **[DEPLOYMENT.md](./backend/DEPLOYMENT.md)** - Production deployment rehberi

## 🐛 Sorun mu yaşıyorsunuz?

### Backend başlamıyor
```bash
# Port kontrolü
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux

# Farklı port kullanın
# .env dosyasında PORT=5001 yapın
```

### Frontend hata veriyor
```bash
# Cache temizle ve yeniden başlat
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### API bağlanamıyor
- Backend'in çalıştığından emin olun: http://localhost:5000/api/health
- `.env.local` dosyasını kontrol edin

## 🎯 Sonraki Adımlar

1. ✅ Projeyi local'de çalıştırdınız
2. 🔑 API key'lerinizi edinin (News API, Google Fact Check)
3. 🌐 Production'a deploy edin (Vercel + Railway)
4. 🚀 Kullanıcılarınızla paylaşın!

## 💡 İpuçları

- **Hot Reload:** Kod değişiklikleri otomatik yansır
- **Loglar:** Backend terminal'inde detaylı loglar görebilirsiniz
- **Test:** Farklı metinler deneyerek sistemi test edin
- **Performance:** Uzun metinler (2000+ karakter) daha uzun sürebilir

## 🤝 Katkıda Bulunun

Projeye katkıda bulunmak isterseniz:
1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing`)
5. Pull Request açın

---

**İyi Kodlamalar!** 🎉

Sorularınız için: [GitHub Issues](https://github.com/yourusername/truthlens/issues)
