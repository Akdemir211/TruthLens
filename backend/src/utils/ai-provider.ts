export interface AIProvider {
  detectAIGenerated(text: string): Promise<{
    probability: number;
    confidence: number;
    reasoning: string;
  }>;
}

export class StatisticalAIProvider implements AIProvider {
  async detectAIGenerated(text: string): Promise<{
    probability: number;
    confidence: number;
    reasoning: string;
  }> {
    const indicators = this.analyzeText(text);
    const probability = this.calculateProbability(indicators);
    const confidence = this.calculateConfidence(indicators);
    const reasoning = this.generateReasoning(indicators);

    return { probability, confidence, reasoning };
  }

  private analyzeText(text: string) {
    const words = text.split(/\s+/).filter(w => w.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    const uniqueWords = new Set(words.map(w => w.toLowerCase()));
    const lexicalDiversity = uniqueWords.size / words.length;
    
    const sentenceLengths = sentences.map(s => s.split(/\s+/).length);
    const avgSentenceLength = sentenceLengths.reduce((a, b) => a + b, 0) / sentenceLengths.length;
    const variance = sentenceLengths.reduce((sum, len) => 
      sum + Math.pow(len - avgSentenceLength, 2), 0) / sentenceLengths.length;
    
    const repetitivePatterns = this.detectRepetitivePatterns(text);
    const formalityScore = this.calculateFormality(words);
    const transitionWords = this.countTransitionWords(text);

    return {
      lexicalDiversity,
      sentenceLengthVariance: variance,
      avgSentenceLength,
      repetitivePatterns,
      formalityScore,
      transitionWords,
      wordCount: words.length
    };
  }

  private calculateProbability(indicators: any): number {
    let score = 0;
    
    if (indicators.lexicalDiversity < 0.4) score += 0.25;
    else if (indicators.lexicalDiversity < 0.5) score += 0.15;
    
    if (indicators.sentenceLengthVariance < 10) score += 0.25;
    else if (indicators.sentenceLengthVariance < 20) score += 0.15;
    
    if (indicators.repetitivePatterns > 3) score += 0.20;
    else if (indicators.repetitivePatterns > 1) score += 0.10;
    
    if (indicators.formalityScore > 0.7) score += 0.15;
    if (indicators.transitionWords > 5) score += 0.15;

    return Math.min(score, 1.0);
  }

  private calculateConfidence(indicators: any): number {
    const dataPoints = [
      indicators.lexicalDiversity,
      indicators.sentenceLengthVariance / 100,
      indicators.repetitivePatterns / 10,
      indicators.formalityScore
    ];
    
    const variance = dataPoints.reduce((sum, val) => {
      const mean = dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length;
      return sum + Math.pow(val - mean, 2);
    }, 0) / dataPoints.length;
    
    return Math.max(0.5, Math.min(0.95, 1 - variance));
  }

  private generateReasoning(indicators: any): string {
    const reasons: string[] = [];
    
    if (indicators.lexicalDiversity < 0.4) {
      reasons.push('Düşük kelime çeşitliliği (AI metinlerin tipik özelliği)');
    }
    
    if (indicators.sentenceLengthVariance < 10) {
      reasons.push('Cümle uzunluklarında düşük varyans (tutarlı yapı)');
    }
    
    if (indicators.repetitivePatterns > 3) {
      reasons.push('Yüksek oranda tekrarlayan ifade kalıpları');
    }
    
    if (indicators.formalityScore > 0.7) {
      reasons.push('Yüksek formalite skoru (AI\'ın tercih ettiği ton)');
    }

    if (reasons.length === 0) {
      reasons.push('Metin doğal insan yazısı özelliklerine sahip');
    }

    return reasons.join('. ');
  }

  private detectRepetitivePatterns(text: string): number {
    const phrases: { [key: string]: number } = {};
    const words = text.split(/\s+/);
    
    for (let i = 0; i < words.length - 2; i++) {
      const phrase = `${words[i]} ${words[i + 1]} ${words[i + 2]}`.toLowerCase();
      phrases[phrase] = (phrases[phrase] || 0) + 1;
    }
    
    return Object.values(phrases).filter(count => count > 1).length;
  }

  private calculateFormality(words: string[]): number {
    const formalWords = [
      'therefore', 'thus', 'consequently', 'furthermore', 'moreover',
      'however', 'nevertheless', 'additionally', 'specifically', 'particularly',
      'dolayısıyla', 'bu nedenle', 'ancak', 'bununla birlikte', 'ayrıca'
    ];
    
    const formalCount = words.filter(w => 
      formalWords.includes(w.toLowerCase())
    ).length;
    
    return Math.min(formalCount / Math.max(words.length / 50, 1), 1);
  }

  private countTransitionWords(text: string): number {
    const transitions = [
      'however', 'moreover', 'furthermore', 'additionally', 'consequently',
      'therefore', 'thus', 'hence', 'accordingly', 'nevertheless',
      'ancak', 'fakat', 'lakin', 'ama', 'ayrıca', 'dahası', 'bundan başka',
      'dolayısıyla', 'bu nedenle', 'bu yüzden', 'sonuç olarak'
    ];
    
    const lowerText = text.toLowerCase();
    return transitions.filter(t => lowerText.includes(t)).length;
  }
}

export const aiProvider: AIProvider = new StatisticalAIProvider();
