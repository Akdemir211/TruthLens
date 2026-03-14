import { aiProvider } from '../utils/ai-provider';
import { AIDetectionResult } from '../types';
import logger from '../utils/logger';

export class AIDetectionService {
  async analyzeText(text: string): Promise<AIDetectionResult> {
    try {
      logger.info('Starting AI detection analysis');
      
      const result = await aiProvider.detectAIGenerated(text);
      
      const indicators = this.calculateDetailedIndicators(text);
      
      return {
        probability: result.probability,
        confidence: result.confidence,
        indicators,
        explanation: result.reasoning
      };
    } catch (error) {
      logger.error('AI detection analysis failed', error);
      throw new Error('AI detection analysis failed');
    }
  }

  private calculateDetailedIndicators(text: string) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const lexicalDiversity = uniqueWords.size / words.length;
    
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
    const avgLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((sum, len) => 
      sum + Math.pow(len - avgLength, 2), 0) / sentenceLengths.length;
    
    const repetitiveness = this.calculateRepetitiveness(text);
    const stylometry = this.calculateStylometry(text);
    const readability = this.calculateReadability(words, sentences);

    return {
      perplexity: lexicalDiversity < 0.4 ? 'low' : lexicalDiversity < 0.6 ? 'medium' : 'high',
      repetitiveness: repetitiveness > 0.7 ? 'high' : repetitiveness > 0.4 ? 'medium' : 'low',
      stylometry: stylometry > 0.7 ? 'llm-like' : stylometry > 0.4 ? 'mixed' : 'human-like',
      lexicalDiversity: Math.round(lexicalDiversity * 100) / 100,
      sentenceLengthVariance: Math.round(variance * 100) / 100,
      readabilityScore: Math.round(readability * 100) / 100
    };
  }

  private calculateRepetitiveness(text: string): number {
    const phrases: { [key: string]: number } = {};
    const words = text.split(/\s+/);
    let repetitions = 0;
    
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]}`.toLowerCase();
      phrases[phrase] = (phrases[phrase] || 0) + 1;
      if (phrases[phrase] > 1) repetitions++;
    }
    
    return Math.min(repetitions / Math.max(words.length / 10, 1), 1);
  }

  private calculateStylometry(text: string): number {
    const aiIndicators = [
      /\b(however|moreover|furthermore|additionally|consequently)\b/gi,
      /\b(it is important to note|it should be noted|significantly)\b/gi,
      /\b(overall|in conclusion|ultimately|essentially)\b/gi,
      /\b(önemli olan|belirtmek gerekir|sonuç olarak|genel olarak)\b/gi
    ];
    
    let score = 0;
    aiIndicators.forEach(pattern => {
      const matches = text.match(pattern);
      if (matches) score += matches.length * 0.15;
    });
    
    return Math.min(score, 1);
  }

  private calculateReadability(words: string[], sentences: string[]): number {
    const avgWordLength = words.reduce((sum, w) => sum + w.length, 0) / words.length;
    const avgSentenceLength = words.length / sentences.length;
    
    const score = 206.835 - 1.015 * avgSentenceLength - 84.6 * (avgWordLength / avgSentenceLength);
    
    return Math.max(0, Math.min(100, score));
  }
}

export const aiDetectionService = new AIDetectionService();
