import natural from 'natural';
import logger from '../utils/logger';

export interface ExtractedClaim {
  text: string;
  type: 'factual' | 'opinion' | 'prediction';
  entities: string[];
}

export class ClaimExtractionService {
  private tokenizer: natural.WordTokenizer;
  private sentenceTokenizer: natural.SentenceTokenizer;

  constructor() {
    this.tokenizer = new natural.WordTokenizer();
    this.sentenceTokenizer = new natural.SentenceTokenizer();
  }

  async extractClaims(text: string): Promise<ExtractedClaim[]> {
    try {
      logger.info('Extracting claims from text');
      
      const sentences = this.sentenceTokenizer.tokenize(text);
      const claims: ExtractedClaim[] = [];

      logger.info(`Found ${sentences.length} sentences to analyze`);

      for (const sentence of sentences) {
        const trimmedSentence = sentence.trim();
        
        if (trimmedSentence.length < 10) {
          logger.debug(`Skipping short sentence: "${trimmedSentence}"`);
          continue;
        }

        const isFactual = this.isFactualClaim(trimmedSentence);
        logger.debug(`Sentence: "${trimmedSentence.substring(0, 50)}..." - Is factual: ${isFactual}`);
        
        if (isFactual) {
          const claim: ExtractedClaim = {
            text: trimmedSentence,
            type: this.determineClaimType(trimmedSentence),
            entities: this.extractEntities(trimmedSentence)
          };
          claims.push(claim);
          logger.info(`✓ Extracted claim: "${claim.text.substring(0, 60)}..."`);
        }
      }

      if (claims.length === 0) {
        logger.warn(`No claims extracted from ${sentences.length} sentences. Making all sentences claims.`);
        
        for (const sentence of sentences.slice(0, 3)) {
          if (sentence.trim().length >= 10) {
            claims.push({
              text: sentence.trim(),
              type: 'factual',
              entities: this.extractEntities(sentence)
            });
            logger.info(`✓ Added sentence as claim: "${sentence.trim().substring(0, 60)}..."`);
          }
        }
      }

      logger.info(`Extracted ${claims.length} claims total`);
      return claims.slice(0, 5);
    } catch (error) {
      logger.error('Claim extraction failed', error);
      return [];
    }
  }

  private isFactualClaim(sentence: string): boolean {
    const lowerSentence = sentence.toLowerCase();
    
    const factualIndicators = [
      /\b(açıkladı|duyurdu|bildirdi|yayınladı|karar verdi|yasakladı|öldü|vefat|hayatını kaybetti)\b/i,
      /\b(announced|declared|reported|published|banned|decided|died|passed away)\b/i,
      /\b\d+\b/,
      /\b(yeni|ilk|son|en büyük|en yüksek|bugün|dün|yarın)\b/i,
      /\b(new|first|latest|largest|highest|today|yesterday|tomorrow)\b/i,
      /\b(ülke|şirket|hükümet|kurum|başkan|bakan|cumhurbaşkanı)\b/i,
      /\b(country|company|government|president|minister|organization)\b/i,
      /\b(başlık|açıklama|tören|toplantı|karar|yasa)\b/i
    ];

    const opinionIndicators = [
      /\b(sanırım|bence|galiba|tahminimce|muhtemelen)\b/i,
      /\b(I think|I believe|probably|maybe|might)\b/i
    ];

    const hasFactual = factualIndicators.some(pattern => pattern.test(sentence));
    const hasOpinion = opinionIndicators.some(pattern => pattern.test(sentence));
    
    const wordCount = sentence.split(/\s+/).length;
    
    if (wordCount < 5 || wordCount > 100) {
      return false;
    }
    
    if (hasOpinion) {
      return false;
    }
    
    return hasFactual || wordCount >= 8;
  }

  private determineClaimType(sentence: string): 'factual' | 'opinion' | 'prediction' {
    const predictionWords = /\b(will|olacak|edecek|yapacak|gelecek)\b/i;
    const opinionWords = /\b(sanırım|düşünüyorum|bence|I think|I believe)\b/i;
    
    if (predictionWords.test(sentence)) return 'prediction';
    if (opinionWords.test(sentence)) return 'opinion';
    return 'factual';
  }

  private extractEntities(sentence: string): string[] {
    const entities: string[] = [];
    
    const capitalizedWords = sentence.match(/\b[A-ZÇĞIÖŞÜ][a-zçğıöşü]+(?:\s+[A-ZÇĞIÖŞÜ][a-zçğıöşü]+)*/g);
    if (capitalizedWords) {
      entities.push(...capitalizedWords);
    }
    
    const numbers = sentence.match(/\b\d+(?:[.,]\d+)*\b/g);
    if (numbers) {
      entities.push(...numbers);
    }
    
    const locations = sentence.match(/\b(Turkey|Germany|USA|UK|Türkiye|Almanya|ABD|İngiltere)\b/gi);
    if (locations) {
      entities.push(...locations);
    }

    return [...new Set(entities)];
  }
}

export const claimExtractionService = new ClaimExtractionService();
