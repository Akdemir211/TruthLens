# ✅ Supabase Kurulum Tamamlandı - Şimdi Ne Yapmalısınız?

## 🎯 Adım 1: Supabase SQL Schema'yı Yükleyin (2 dakika)

### Manuel Kurulum (Gerekli)

1. **Supabase Dashboard'a gidin:**
   - https://supabase.com/dashboard
   - Projeniz: `qylhgfszyhvuaehmrjyq`

2. **SQL Editor'ı açın:**
   - Sol menüden "SQL Editor" sekmesine tıklayın
   - Veya direkt: https://supabase.com/dashboard/project/qylhgfszyhvuaehmrjyq/sql

3. **Schema'yı kopyalayın:**
   - `backend/database/schema.sql` dosyasını açın (şu an açık)
   - Tüm içeriği kopyalayın (Ctrl+A, Ctrl+C)

4. **SQL Editor'e yapıştırın:**
   - SQL Editor'de "New query" butonuna tıklayın
   - Kopyaladığınız SQL kodunu yapıştırın
   - Sağ alttaki "RUN" butonuna tıklayın

5. **Başarı mesajını bekleyin:**
   - "Success. No rows returned" görmelisiniz
   - Bu normal! Tablolar oluşturuldu demektir

### ✅ Doğrulama

SQL çalıştıktan sonra:
- Sol menüden "Table Editor" sekmesine gidin
- Şu tabloları görmelisiniz:
  - ✅ `analyses`
  - ✅ `claims`
  - ✅ `sources` (14 kaynak ile dolu)

---

## 🚀 Adım 2: Dependencies'leri Yükleyin

Environment variables hazır, şimdi npm paketlerini yükleyin:

### Backend

Yeni bir terminal açın:
```bash
cd backend
npm install
```

Bu şunları yükleyecek:
- Express.js
- TypeScript
- Supabase client
- Natural (NLP)
- Axios, Zod, vb.

### Frontend

Başka bir terminal açın:
```bash
cd frontend
npm install
```

Bu şunları yükleyecek:
- Next.js 14
- React 18
- TailwindCSS
- Recharts
- Axios

### Root (Opsiyonel)

Monorepo için:
```bash
cd ..
npm install
```

**Toplam süre:** ~3-5 dakika (internet hızınıza bağlı)

---

## 🎉 Adım 3: Projeyi Çalıştırın

### Seçenek A: Tüm projeyi root'tan çalıştırma (Önerilen)

```bash
npm run dev
```

Bu hem backend (port 5000) hem frontend'i (port 3000) başlatır.

### Seçenek B: Ayrı terminallerde

**Terminal 1 (Backend):**
```bash
cd backend
npm run dev
```
Backend: http://localhost:5000

**Terminal 2 (Frontend):**
```bash
cd frontend
npm run dev
```
Frontend: http://localhost:3000

---

## 🧪 Adım 4: Test Edin

1. Tarayıcıda **http://localhost:3000** adresine gidin

2. Bu örnek metni yapıştırın:
```
Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı. Bu karar Avrupa Birliği'nde büyük tartışmalara yol açtı. Uzmanlar, bu kararın iklim değişikliği ile mücadelede büyük bir geri adım olduğunu belirtiyor.
```

3. "Analiz Et" butonuna tıklayın

4. 10-20 saniye içinde sonuçları görmelisiniz:
   - ✅ AI Detection Score
   - ✅ Credibility Meter
   - ✅ Detailed Indicators

---

## 📊 Yapılandırma Özeti

### ✅ Tamamlanan İşlemler

- [x] Backend `.env` dosyası oluşturuldu
- [x] Frontend `.env.local` dosyası oluşturuldu
- [x] Supabase credentials eklendi
- [x] SQL schema hazır (manuel yükleme bekleniyor)

### 📋 API Keys Durumu

- ✅ **Supabase**: TAMAMLANDI
- ⚠️ **News API**: Opsiyonel (boş)
- ⚠️ **Google Fact Check**: Opsiyonel (boş)

**Not:** News API ve Google Fact Check olmadan da proje çalışır. AI detection ve temel analiz yapılır. Daha sonra ekleyebilirsiniz.

---

## 🔧 Sorun Giderme

### "Supabase credentials not found" hatası
**Çözüm:** Backend `.env` dosyasını kontrol edin. Credentials doğru mu?

### Backend başlamıyor
**Çözüm:** 
```bash
cd backend
npm install
npm run dev
```

### Frontend hata veriyor
**Çözüm:**
```bash
cd frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Port 5000 kullanımda
**Çözüm:** Backend `.env` dosyasında `PORT=5001` yapın

---

## 📚 Sonraki Adımlar

### Hemen:
1. ✅ Supabase SQL schema'yı yükleyin
2. ✅ `npm install` çalıştırın (backend + frontend)
3. ✅ `npm run dev` ile projeyi başlatın
4. ✅ http://localhost:3000 adresinde test edin

### İsteğe Bağlı:
- [ ] News API key alın (https://newsapi.org)
- [ ] Google Fact Check API key alın
- [ ] Production'a deploy edin (Vercel + Railway)

---

## 🎯 Özetle Yapmanız Gerekenler

```bash
# 1. Supabase'de SQL schema'yı çalıştırın (Dashboard'da)

# 2. Dependencies yükleyin
cd backend
npm install

cd ../frontend
npm install

# 3. Projeyi başlatın
cd ..
npm run dev

# 4. Test edin
# http://localhost:3000 adresine gidin
```

---

**Toplam Süre:** ~10 dakika

**Hazır mısınız?** Başlayın! 🚀

Sorularınız olursa yardımcı olmaya hazırım! 😊
