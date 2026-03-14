# Supabase Database Setup

Bu klasör TruthLens projesi için Supabase veritabanı şema dosyalarını içerir.

## Setup Adımları

1. [Supabase](https://supabase.com) hesabınıza giriş yapın
2. Yeni bir proje oluşturun
3. SQL Editor'e gidin
4. `schema.sql` dosyasının içeriğini kopyalayıp SQL Editor'e yapıştırın
5. "Run" butonuna tıklayın

## Tablolar

### `analyses`
Ana analiz sonuçlarını saklar.
- `id`: Benzersiz analiz ID'si
- `text`: Analiz edilen metin
- `ai_probability`: AI üretimi olma olasılığı (0-1)
- `credibility_score`: Güvenilirlik skoru (0-100)
- `overall_verdict`: Genel değerlendirme
- `metadata`: Ek bilgiler (JSON)

### `claims`
Metinden çıkarılan iddiaları saklar.
- `id`: Benzersiz iddia ID'si
- `analysis_id`: Bağlı olduğu analiz
- `claim_text`: İddia metni
- `verdict`: true/false/misleading/unverified
- `sources`: Kaynaklar (JSON)
- `confidence`: Güven skoru (0-1)

### `sources`
Domain güvenilirlik bilgilerini saklar.
- `domain`: Domain adı (örn: reuters.com)
- `credibility_score`: Güvenilirlik skoru (0-100)
- `category`: Kategori (news, science, reference, vb.)

## Environment Variables

Backend `.env` dosyanıza şunları ekleyin:

```
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key
```

Bu bilgileri Supabase projenizin Settings > API bölümünden alabilirsiniz.
