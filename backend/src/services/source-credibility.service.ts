import supabase from '../utils/supabase';
import logger from '../utils/logger';

export interface SourceCredibilityInfo {
  domain: string;
  credibility: number;
  category: string;
}

export class SourceCredibilityService {
  async getSourceCredibility(domain: string): Promise<number> {
    try {
      const normalizedDomain = domain.toLowerCase().replace('www.', '');
      
      const { data, error } = await supabase
        .from('sources')
        .select('credibility_score')
        .eq('domain', normalizedDomain)
        .single();

      if (error || !data) {
        logger.debug(`Source not found in database: ${domain}`);
        return this.estimateCredibility(normalizedDomain);
      }

      return data.credibility_score;
    } catch (error) {
      logger.warn('Error fetching source credibility', error);
      return this.estimateCredibility(domain);
    }
  }

  async analyzeSourceCredibility(domains: string[]): Promise<SourceCredibilityInfo[]> {
    const results: SourceCredibilityInfo[] = [];

    for (const domain of domains) {
      const credibility = await this.getSourceCredibility(domain);
      const category = this.categorizeSource(domain);
      
      results.push({
        domain,
        credibility,
        category
      });
    }

    return results;
  }

  calculateOverallCredibilityScore(sources: SourceCredibilityInfo[]): number {
    if (sources.length === 0) return 50;

    const avgCredibility = sources.reduce((sum, s) => sum + s.credibility, 0) / sources.length;
    
    const highCredibilityCount = sources.filter(s => s.credibility >= 85).length;
    const bonus = (highCredibilityCount / sources.length) * 10;
    
    return Math.min(Math.round(avgCredibility + bonus), 100);
  }

  private estimateCredibility(domain: string): number {
    const knownSuspicious = [
      'fake', 'conspiracy', 'hoax', 'rumor', 'viral',
      'sahte', 'yalan', 'komplo', 'dedikodu'
    ];

    const lowerDomain = domain.toLowerCase();
    
    if (knownSuspicious.some(word => lowerDomain.includes(word))) {
      return 20;
    }

    const trustedTLDs = ['.gov', '.edu', '.org'];
    if (trustedTLDs.some(tld => domain.endsWith(tld))) {
      return 75;
    }

    const wellKnownNews = ['news', 'times', 'post', 'journal', 'daily'];
    if (wellKnownNews.some(word => lowerDomain.includes(word))) {
      return 65;
    }

    return 55;
  }

  private categorizeSource(domain: string): string {
    const categories: { [key: string]: string[] } = {
      news: ['news', 'times', 'post', 'daily', 'gazette', 'herald', 'tribune'],
      science: ['science', 'nature', 'academic', 'research', 'journal'],
      government: ['.gov', 'official', 'ministry'],
      reference: ['wikipedia', 'britannica', 'encyclopedia'],
      social: ['twitter', 'facebook', 'instagram', 'tiktok', 'reddit']
    };

    const lowerDomain = domain.toLowerCase();
    
    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => lowerDomain.includes(keyword))) {
        return category;
      }
    }

    return 'general';
  }

  async addOrUpdateSource(domain: string, credibilityScore: number, category: string): Promise<void> {
    try {
      const normalizedDomain = domain.toLowerCase().replace('www.', '');
      
      const { error } = await supabase
        .from('sources')
        .upsert({
          domain: normalizedDomain,
          credibility_score: credibilityScore,
          category,
          last_updated: new Date().toISOString()
        }, {
          onConflict: 'domain'
        });

      if (error) {
        logger.error('Error adding/updating source', error);
      } else {
        logger.info(`Source updated: ${domain} (${credibilityScore})`);
      }
    } catch (error) {
      logger.error('Error in addOrUpdateSource', error);
    }
  }
}

export const sourceCredibilityService = new SourceCredibilityService();
