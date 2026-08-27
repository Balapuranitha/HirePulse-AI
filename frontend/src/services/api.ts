import { Drive, Candidate, Feedback, KPIs, StageMetric, Recommendation, SimulationInput, SimulationResponse } from '../types';

const API_BASE = '/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    ...options,
  });

  if (!res.ok) {
    throw new Error(`API Error ${res.status}: ${res.statusText}`);
  }

  return res.json();
}

export const api = {
  // Drives
  getDrives: () => fetchJson<Drive[]>('/drives'),
  getDrive: (id: string) => fetchJson<Drive>(`/drives/${id}`),
  createDrive: (data: Partial<Drive>) => fetchJson<Drive>('/drives', { method: 'POST', body: JSON.stringify(data) }),

  // Candidates
  getCandidates: (params?: { drive_id?: string; stage?: string; status?: string; silent_dropout?: boolean; min_risk?: number }) => {
    const query = new URLSearchParams();
    if (params?.drive_id) query.append('drive_id', params.drive_id);
    if (params?.stage) query.append('stage', params.stage);
    if (params?.status) query.append('status', params.status);
    if (params?.silent_dropout !== undefined) query.append('silent_dropout', String(params.silent_dropout));
    if (params?.min_risk !== undefined) query.append('min_risk', String(params.min_risk));
    
    return fetchJson<Candidate[]>(`/candidates?${query.toString()}`);
  },
  getCandidate: (id: string) => fetchJson<Candidate>(`/candidates/${id}`),

  // Analytics
  getKpis: (drive_id: string = 'DRIVE-2026-001') => fetchJson<KPIs>(`/analytics/kpis?drive_id=${drive_id}`),
  getFunnel: (drive_id: string = 'DRIVE-2026-001') => fetchJson<any[]>(`/analytics/funnel?drive_id=${drive_id}`),
  getCharts: (drive_id: string = 'DRIVE-2026-001') => fetchJson<any>(`/analytics/charts?drive_id=${drive_id}`),
  getFriction: (drive_id: string = 'DRIVE-2026-001') => fetchJson<any>(`/analytics/friction?drive_id=${drive_id}`),
  getRootCause: (drive_id: string = 'DRIVE-2026-001') => fetchJson<any>(`/analytics/root-cause?drive_id=${drive_id}`),
  getExecutiveSummary: (drive_id: string = 'DRIVE-2026-001') => fetchJson<any>(`/analytics/executive-summary?drive_id=${drive_id}`),

  // Feedback
  getFeedbacks: (drive_id: string = 'DRIVE-2026-001', category?: string, sentiment?: string) => {
    const query = new URLSearchParams({ drive_id });
    if (category) query.append('category', category);
    if (sentiment) query.append('sentiment', sentiment);
    return fetchJson<Feedback[]>(`/feedback?${query.toString()}`);
  },
  submitFeedback: (data: Partial<Feedback>) => fetchJson<Feedback>('/feedback', { method: 'POST', body: JSON.stringify(data) }),
  analyzeTextLive: (feedback_text: string, stage_name?: string) => fetchJson<any>('/feedback/analyze-text', { method: 'POST', body: JSON.stringify({ feedback_text, stage_name }) }),

  // Dropout
  getDropoutPredictions: (drive_id: string = 'DRIVE-2026-001') => fetchJson<Candidate[]>(`/dropout/predictions?drive_id=${drive_id}`),
  getSilentDropouts: (drive_id: string = 'DRIVE-2026-001') => fetchJson<Candidate[]>(`/dropout/silent-dropouts?drive_id=${drive_id}`),

  // AI Recommendations
  getRecommendations: () => fetchJson<Recommendation[]>('/ai/recommendations'),

  // Simulation
  runSimulation: (input: SimulationInput) => fetchJson<SimulationResponse>('/simulation/run', { method: 'POST', body: JSON.stringify(input) }),
};
