'use client';

import { SimilarArticle } from '@/types';

interface SourcesListProps {
  articles: SimilarArticle[];
}

export default function SourcesList({ articles }: SourcesListProps) {
  if (articles.length === 0) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900">Benzer Haberler</h3>
        <p className="text-gray-500 text-sm">Benzer haber bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-2xl p-6">
      <h3 className="text-xl font-bold mb-4 text-gray-900">Benzer Haberler</h3>
      
      <div className="space-y-4">
        {articles.map((article, index) => (
          <a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 flex-1 pr-4">
                {article.title}
              </h4>
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {Math.round(article.similarity * 100)}% benzer
              </span>
            </div>
            
            {article.snippet && (
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                {article.snippet}
              </p>
            )}
            
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span className="font-medium">{article.source}</span>
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Kaynağa Git
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
