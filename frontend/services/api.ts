import axios from 'axios';
import { AnalysisRequest, AnalysisResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  analyzeText: async (text: string): Promise<AnalysisResponse> => {
    const response = await apiClient.post<AnalysisResponse>('/api/analyze-text', {
      text,
    } as AnalysisRequest);
    return response.data;
  },

  healthCheck: async (): Promise<{ status: string; timestamp: string }> => {
    const response = await apiClient.get('/api/health');
    return response.data;
  },
};

export default api;
