# TruthLens API Documentation

## Base URL

**Development:** `http://localhost:5000`  
**Production:** `https://your-api-domain.com`

## Endpoints

### 1. Health Check

**GET** `/api/health`

Servisin durumunu kontrol eder.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2026-03-11T10:30:00.000Z",
  "service": "TruthLens API"
}
```

**Status Codes:**
- `200 OK` - Servis çalışıyor

---

### 2. Analyze Text

**POST** `/api/analyze-text`

Verilen metni analiz eder ve AI tespiti, fact-checking ve güvenilirlik skorları döndürür.

**Request Body:**
```json
{
  "text": "Analiz edilecek metin (10-5000 karakter)"
}
```

**Request Example:**
```json
{
  "text": "Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı. Bu karar Avrupa Birliği'nde büyük tartışmalara yol açtı."
}
```

**Response:**
```json
{
  "analysisId": "uuid-string",
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
    "explanation": "Düşük perplexity ve tekrarlayan yapı. Yüksek oranda tekrarlayan ifade kalıpları."
  },
  "factCheck": {
    "claims": [
      {
        "id": "claim-1",
        "text": "Almanya elektrikli arabaları yasakladı",
        "verdict": "false",
        "confidence": 0.92,
        "sources": [
          {
            "title": "Germany's EV Policy 2026",
            "url": "https://reuters.com/...",
            "credibility": 95,
            "domain": "reuters.com",
            "publishDate": "2026-01-15"
          }
        ]
      }
    ],
    "overallVerdict": "mostly_false"
  },
  "credibilityScore": 65,
  "similarArticles": [
    {
      "title": "Electric Vehicle Policies in Europe",
      "url": "https://bbc.com/...",
      "similarity": 0.78,
      "source": "BBC",
      "snippet": "Germany continues to support electric vehicles..."
    }
  ],
  "timestamp": "2026-03-11T10:30:00.000Z"
}
```

**Status Codes:**
- `200 OK` - Analiz başarılı
- `400 Bad Request` - Validation hatası (metin çok kısa/uzun)
- `500 Internal Server Error` - Sunucu hatası

**Validation Rules:**
- `text`: String, 10-5000 karakter arası zorunlu

---

## Response Objects

### AIDetectionResult

```typescript
{
  probability: number;        // 0-1 arası, AI olma olasılığı
  confidence: number;         // 0-1 arası, güven skoru
  indicators: {
    perplexity: string;       // "low" | "medium" | "high"
    repetitiveness: string;   // "low" | "medium" | "high"
    stylometry: string;       // "llm-like" | "mixed" | "human-like"
    lexicalDiversity: number; // Kelime çeşitliliği (0-1)
    sentenceLengthVariance: number; // Cümle uzunluk varyansı
    readabilityScore: number; // Okunabilirlik skoru (0-100)
  };
  explanation: string;        // Açıklama metni
}
```

### Claim

```typescript
{
  id: string;                 // Benzersiz claim ID
  text: string;               // İddia metni
  verdict: "true" | "false" | "misleading" | "unverified";
  confidence: number;         // 0-1 arası güven skoru
  sources: Source[];          // Kaynak listesi
}
```

### Source

```typescript
{
  title: string;              // Kaynak başlığı
  url: string;                // Kaynak URL
  credibility: number;        // 0-100 arası güvenilirlik
  domain?: string;            // Domain adı
  publishDate?: string;       // Yayın tarihi
}
```

### SimilarArticle

```typescript
{
  title: string;              // Makale başlığı
  url: string;                // Makale URL
  similarity: number;         // 0-1 arası benzerlik skoru
  source: string;             // Kaynak adı
  snippet?: string;           // Makale özeti
}
```

---

## Error Responses

### Validation Error (400)

```json
{
  "error": "Validation error",
  "details": [
    {
      "code": "too_small",
      "minimum": 10,
      "type": "string",
      "path": ["text"],
      "message": "Metin en az 10 karakter olmalıdır"
    }
  ]
}
```

### Server Error (500)

```json
{
  "error": "Internal server error",
  "message": "Analiz sırasında bir hata oluştu"
}
```

---

## Rate Limiting

API, rate limiting kullanır:
- **Limit:** 30 istek / 15 dakika
- **Header:** `X-RateLimit-Remaining` - Kalan istek sayısı

Rate limit aşıldığında:
```json
{
  "error": "Too many requests",
  "message": "Çok fazla istek gönderdiniz. Lütfen 15 dakika sonra tekrar deneyin."
}
```

**Status Code:** `429 Too Many Requests`

---

## CORS

API, CORS'u destekler. Şu origin'lerden gelen isteklere izin verilir:
- Development: `http://localhost:3000`
- Production: Frontend URL (environment variable ile belirtilir)

---

## Example Usage

### cURL

```bash
curl -X POST http://localhost:5000/api/analyze-text \
  -H "Content-Type: application/json" \
  -d '{
    "text": "Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı."
  }'
```

### JavaScript (Axios)

```javascript
import axios from 'axios';

const analyzeText = async (text) => {
  try {
    const response = await axios.post('http://localhost:5000/api/analyze-text', {
      text
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
  }
};

analyzeText('Your text here...');
```

### Python (Requests)

```python
import requests

url = "http://localhost:5000/api/analyze-text"
data = {
    "text": "Almanya hükümeti, 2025 yılı itibariyle tüm elektrikli araçların satışını yasaklayan yeni bir yasa çıkardı."
}

response = requests.post(url, json=data)
print(response.json())
```

---

## Notes

- **Timeout:** Analiz maksimum 60 saniye sürebilir
- **Text Length:** Optimal sonuç için 100-2000 karakter arası metinler önerilir
- **Language:** Hem İngilizce hem Türkçe metinler desteklenir
- **API Keys:** External API key'ler opsiyoneldir ancak fact-checking kalitesini artırır

---

## Support

API ile ilgili sorularınız için:
- GitHub Issues: [github.com/yourrepo/issues](https://github.com/yourrepo/issues)
- Documentation: [docs.truthlens.com](https://docs.truthlens.com)
