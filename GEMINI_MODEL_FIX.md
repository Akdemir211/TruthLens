# Gemini Model 404 Hatası - Çözüm

## Sorun:
```
[404 Not Found] models/gemini-1.5-flash is not found for API version v1beta
```

## Çözümler:

### 1. Model Adını Değiştir

Deneyin (sırayla):
1. `gemini-1.5-pro` ✅ (şu an kullanılıyor)
2. `gemini-pro`
3. `models/gemini-1.5-pro`
4. `models/gemini-pro`

### 2. API Key Doğrula

Gemini API key'iniz aktif mi kontrol edin:
```
https://aistudio.google.com/app/apikey
```

### 3. Rate Limit

Ücretsiz tier limitleri:
- 15 request/minute
- 1500 request/day

### 4. Model Listesi

Kullanılabilir modeller:
- `gemini-1.5-pro` (recommended)
- `gemini-pro` (legacy)
- `gemini-1.5-flash` (yeni, belki henüz API'de yok)

## Şu Anda Denenen:

```typescript
this.model = this.genAI.getGenerativeModel({ 
  model: 'gemini-1.5-pro' 
});
```

Eğer bu da çalışmazsa `gemini-pro` deneyin.
