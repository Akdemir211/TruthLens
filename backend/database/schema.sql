-- TruthLens Database Schema for Supabase

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Analyses table: stores all text analysis results
CREATE TABLE IF NOT EXISTS analyses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  text TEXT NOT NULL,
  ai_probability FLOAT CHECK (ai_probability >= 0 AND ai_probability <= 1),
  credibility_score INTEGER CHECK (credibility_score >= 0 AND credibility_score <= 100),
  overall_verdict TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Claims table: stores extracted claims from analyzed text
CREATE TABLE IF NOT EXISTS claims (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  analysis_id UUID REFERENCES analyses(id) ON DELETE CASCADE,
  claim_text TEXT NOT NULL,
  verdict TEXT CHECK (verdict IN ('true', 'false', 'misleading', 'unverified')),
  sources JSONB DEFAULT '[]'::jsonb,
  confidence FLOAT CHECK (confidence >= 0 AND confidence <= 1),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Sources table: stores credibility information for domains
CREATE TABLE IF NOT EXISTS sources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain TEXT UNIQUE NOT NULL,
  credibility_score INTEGER CHECK (credibility_score >= 0 AND credibility_score <= 100),
  category TEXT,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analyses_created_at ON analyses(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_claims_analysis_id ON claims(analysis_id);
CREATE INDEX IF NOT EXISTS idx_sources_domain ON sources(domain);

-- Insert some pre-populated credible sources
INSERT INTO sources (domain, credibility_score, category) VALUES
  ('reuters.com', 95, 'news'),
  ('bbc.com', 95, 'news'),
  ('apnews.com', 95, 'news'),
  ('cnn.com', 85, 'news'),
  ('nytimes.com', 90, 'news'),
  ('theguardian.com', 88, 'news'),
  ('aljazeera.com', 85, 'news'),
  ('npr.org', 90, 'news'),
  ('aa.com.tr', 82, 'news'),
  ('hurriyet.com.tr', 75, 'news'),
  ('trthaber.com', 78, 'news'),
  ('wikipedia.org', 80, 'reference'),
  ('nature.com', 95, 'science'),
  ('sciencedirect.com', 92, 'science')
ON CONFLICT (domain) DO NOTHING;

-- Function to automatically update last_updated timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update last_updated for sources
CREATE TRIGGER update_sources_updated_at BEFORE UPDATE ON sources
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
