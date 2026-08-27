export interface Drive {
  id: string;
  title: string;
  company: string;
  date: string;
  location: string;
  job_role: string;
  expected_candidates: number;
  stages: string[];
  status: string;
}

export interface Candidate {
  id: string;
  drive_id: string;
  candidate_code: string;
  name: string;
  email: string;
  phone: string;
  current_stage: string;
  status: string;
  registration_time?: string;
  hr_start?: string;
  hr_end?: string;
  technical_start?: string;
  technical_end?: string;
  managerial_start?: string;
  managerial_end?: string;
  final_start?: string;
  final_end?: string;
  total_wait_minutes: number;
  friction_score: number;
  dropout_probability: number;
  silent_dropout: boolean;
  top_risk_factors: string[];
}

export interface Feedback {
  id: string;
  drive_id: string;
  candidate_id: string;
  candidate_name?: string;
  stage_name?: string;
  rating: number;
  issue_category: string;
  feedback_text: string;
  is_voice: boolean;
  voice_transcript?: string;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  topics: string[];
  severity: 'Low' | 'Medium' | 'High' | 'Critical';
  root_cause?: string;
  suggested_action?: string;
  created_at?: string;
}

export interface KPIs {
  total_candidates: number;
  selected: number;
  in_progress: number;
  dropouts: number;
  avg_waiting_time_mins: number;
  candidate_experience_score: number;
  overall_process_duration_hours: number;
  high_risk_candidates_count: number;
  highest_friction_stage: string;
}

export interface StageMetric {
  stage_name: string;
  stage_order: number;
  entered_count: number;
  completed_count: number;
  avg_wait_mins: number;
  avg_process_mins: number;
  dropout_count: number;
  negative_feedback_pct: number;
  friction_score: number;
  bottleneck_status: string;
  is_critical_friction?: boolean;
  possible_cause?: string;
}

export interface Recommendation {
  id: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  stage: string;
  problem: string;
  evidence: string;
  recommendation: string;
  expected_impact: {
    waiting_time_before: string;
    waiting_time_after: string;
    dropout_rate_before: string;
    dropout_rate_after: string;
    candidate_sat_before: string;
    candidate_sat_after: string;
  };
  status: string;
}

export interface SimulationInput {
  drive_id: string;
  tech_interviewers: number;
  hr_interviewers: number;
  managerial_interviewers: number;
  avg_tech_duration_mins: number;
  avg_hr_duration_mins: number;
  avg_managerial_duration_mins: number;
  break_duration_mins: number;
  parallel_rooms: number;
}

export interface ScenarioResult {
  avg_waiting_time_mins: number;
  max_queue_length: number;
  total_process_duration_hours: number;
  candidate_throughput_per_hour: number;
  predicted_dropout_rate_pct: number;
  candidate_satisfaction_score: number;
}

export interface SimulationResponse {
  drive_id: string;
  current_scenario: ScenarioResult;
  simulated_scenario: ScenarioResult;
  delta_waiting_time_pct: number;
  delta_dropout_pct: number;
  delta_duration_hours: number;
}
