export interface AnalysisRequest {
  text: string;
}

export interface AIDetectionResult {
  probability: number;
  confidence: number;
  indicators: {
    perplexity: string;
    repetitiveness: string;
    stylometry: string;
    lexicalDiversity: number;
    sentenceLengthVariance: number;
    readabilityScore: number;
  };
  explanation: string;
}

export interface Claim {
  id: string;
  text: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
  confidence: number;
  sources: Source[];
}

export interface Source {
  title: string;
  url: string;
  credibility: number;
  domain?: string;
  publishDate?: string;
  rating?: string;
  description?: string;
}

export interface FactCheckResult {
  claims: Claim[];
  overallVerdict: string;
  credibilityScore?: number;
  summary?: string;
  explanation?: string;
  redFlags?: string[];
}

export interface SimilarArticle {
  title: string;
  url: string;
  similarity: number;
  source: string;
  snippet?: string;
}

export interface AnalysisResponse {
  analysisId: string;
  aiDetection: AIDetectionResult;
  factCheck: FactCheckResult;
  credibilityScore: number;
  similarArticles: SimilarArticle[];
  timestamp: string;
}

export interface DatabaseAnalysis {
  id: string;
  text: string;
  ai_probability: number;
  credibility_score: number;
  overall_verdict: string;
  created_at: string;
  metadata: Record<string, any>;
}

export interface DatabaseClaim {
  id: string;
  analysis_id: string;
  claim_text: string;
  verdict: string;
  sources: Record<string, any>;
  confidence: number;
}

export interface DatabaseSource {
  id: string;
  domain: string;
  credibility_score: number;
  category: string;
  last_updated: string;
}
