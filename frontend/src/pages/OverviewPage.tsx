import React, { useEffect, useState } from 'react';
import { 
  Users, 
  CheckCircle2, 
  Clock, 
  UserX, 
  Star, 
  AlertTriangle, 
  Flame, 
  TrendingUp, 
  Sparkles,
  ArrowUpRight,
  Bot
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar 
} from 'recharts';
import { api } from '../services/api';
import { KPIs } from '../types';

interface OverviewPageProps {
  onNavigate: (tab: string) => void;
}

const COLORS = ['#6366F1', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899'];

export const OverviewPage: React.FC<OverviewPageProps> = ({ onNavigate }) => {
  const [kpis, setKpis] = useState<KPIs | null>(null);
  const [charts, setCharts] = useState<any>(null);
  const [execSummary, setExecSummary] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOverviewData() {
      try {
        const [kpiRes, chartRes, summaryRes] = await Promise.all([
          api.getKpis(),
          api.getCharts(),
          api.getExecutiveSummary()
        ]);
        setKpis(kpiRes);
        setCharts(chartRes);
        setExecSummary(summaryRes);
      } catch (err) {
        console.error('Failed to load overview data:', err);
      } finally {
        setLoading(false);
      }
    }
    loadOverviewData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[600px]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs text-slate-400 font-medium">Loading HirePulse Intelligence Engine...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <span>HR Recruitment Intelligence Overview</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              Live Analytics
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time candidate journey metrics, stage bottleneck analysis, and AI recommendations.
          </p>
        </div>

        <button
          onClick={() => onNavigate('simulations')}
          className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 shadow-indigo-500/20"
        >
          <Sparkles className="w-4 h-4" />
          <span>Run What-If Simulation</span>
        </button>
      </div>

      {/* 8 KPI Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Total</span>
            <Users className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-black text-white">{kpis?.total_candidates || 300}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Walk-In Candidates</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Selected</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          </div>
          <div className="text-xl font-black text-emerald-400">{kpis?.selected || 42}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Hired (14.0%)</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">In Progress</span>
            <Clock className="w-3.5 h-3.5 text-sky-400" />
          </div>
          <div className="text-xl font-black text-sky-400">{kpis?.in_progress || 60}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Active Pipelines</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Dropouts</span>
            <UserX className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-black text-rose-400">{kpis?.dropouts || 72}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Abandoned (24.0%)</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Avg Wait</span>
            <Clock className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div className="text-xl font-black text-amber-400">72.5m</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Target: 25.0m</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">CSAT Score</span>
            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
          </div>
          <div className="text-xl font-black text-yellow-400">{kpis?.candidate_experience_score || 3.7} / 5</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Candidate Rating</div>
        </div>

        <div className="glass-card p-3.5">
          <div className="flex items-center justify-between text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase">Process Time</span>
            <TrendingUp className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <div className="text-xl font-black text-indigo-300">{kpis?.overall_process_duration_hours || 6.2}h</div>
          <div className="text-[10px] text-slate-400 mt-0.5">Total Drive Duration</div>
        </div>

        <div className="glass-card p-3.5 border-rose-500/30 bg-rose-500/5">
          <div className="flex items-center justify-between text-rose-400 mb-1">
            <span className="text-[10px] font-bold uppercase">High Risk</span>
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          </div>
          <div className="text-xl font-black text-rose-400">{kpis?.high_risk_candidates_count || 38}</div>
          <div className="text-[10px] text-rose-300/80 mt-0.5">Silent Dropout Risk</div>
        </div>
      </div>

      {/* AI Executive Summary Banner Card */}
      <div className="glass-card p-5 border-l-4 border-l-indigo-500 relative overflow-hidden">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-indigo-400" />
              <span className="font-bold text-sm text-white">AI Executive Summary</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                Primary Bottleneck: {kpis?.highest_friction_stage || 'Technical Round'}
              </span>
            </div>
            <p className="text-xs text-slate-200 leading-relaxed font-medium">
              "{execSummary?.headline || 'Technical Round identified as primary drive bottleneck causing 68% of candidate dropouts.'}"
            </p>
            <div className="grid md:grid-cols-3 gap-3 pt-2 text-[11px]">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-rose-400 block mb-0.5">Observed Problem</span>
                <span className="text-slate-300">{execSummary?.problem}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-amber-400 block mb-0.5">Key Evidence</span>
                <span className="text-slate-300">{execSummary?.evidence}</span>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                <span className="font-bold text-emerald-400 block mb-0.5">Recommended Action</span>
                <span className="text-slate-300">{execSummary?.recommendation}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onNavigate('recommendations')}
            className="shrink-0 p-2 rounded-lg bg-indigo-600/20 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/30 transition text-xs font-semibold flex items-center gap-1"
          >
            <span>View All AI Actions</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 9 Charts Section Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Chart 1: Recruitment Funnel */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">1. Recruitment Funnel</h3>
            <span className="text-[10px] text-slate-400">Entered Candidates</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={charts?.count_by_stage || []} margin={{ top: 5, right: 20, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#64748B" fontSize={10} />
                <YAxis dataKey="stage" type="category" stroke="#94A3B8" fontSize={10} width={90} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="count" fill="#6366F1" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Candidate Count by Stage */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">2. Stage Throughput</h3>
            <span className="text-[10px] text-slate-400">Entered vs Completed</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.count_by_stage || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748B" fontSize={9} interval={0} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="count" fill="#3B82F6" name="Entered" radius={[4, 4, 0, 0]} />
                <Bar dataKey="completed" fill="#10B981" name="Completed" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 3: Avg Waiting Time by Stage */}
        <div className="glass-card p-5 space-y-3 border-rose-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-rose-300">3. Waiting Time by Stage</h3>
            <span className="text-[10px] text-rose-400 font-bold">Tech: 78.5 min</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.wait_time_by_stage || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748B" fontSize={9} interval={0} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="wait_time_mins" fill="#EF4444" radius={[4, 4, 0, 0]} name="Avg Wait (min)" />
                <Bar dataKey="target_mins" fill="#334155" radius={[4, 4, 0, 0]} name="Target (min)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Sentiment Distribution */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">4. Sentiment Distribution</h3>
            <span className="text-[10px] text-slate-400">120 Submissions</span>
          </div>
          <div className="h-56 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={charts?.sentiment_dist || []} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label>
                  {(charts?.sentiment_dist || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={entry.name === 'Negative' ? '#EF4444' : entry.name === 'Positive' ? '#10B981' : '#F59E0B'} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 5: Feedback Topic Distribution */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">5. Feedback Topics</h3>
            <span className="text-[10px] text-slate-400">Extracted Topics</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart layout="vertical" data={charts?.topic_dist || []} margin={{ top: 5, right: 10, left: 40, bottom: 5 }}>
                <XAxis type="number" stroke="#64748B" fontSize={10} />
                <YAxis dataKey="topic" type="category" stroke="#94A3B8" fontSize={9} width={95} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 6: Dropout Rate by Stage */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">6. Stage Dropout Rate (%)</h3>
            <span className="text-[10px] text-slate-400">72 Total Dropouts</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.dropout_by_stage || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748B" fontSize={9} interval={0} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="dropout_pct" fill="#F43F5E" radius={[4, 4, 0, 0]} name="Dropout %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 7: Candidate Friction Score by Stage */}
        <div className="glass-card p-5 space-y-3 border-amber-500/20">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-amber-300">7. Candidate Friction Score</h3>
            <span className="text-[10px] text-amber-400 font-bold">0-100 Score</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.friction_by_stage || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748B" fontSize={9} interval={0} />
                <YAxis stroke="#64748B" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="friction_score" fill="#F59E0B" radius={[4, 4, 0, 0]} name="Friction Score" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 8: Hourly Candidate Flow */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">8. Hourly Candidate Flow</h3>
            <span className="text-[10px] text-slate-400">Arrivals vs Processed</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts?.hourly_flow || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="hour" stroke="#64748B" fontSize={9} />
                <YAxis stroke="#64748B" fontSize={10} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Line type="monotone" dataKey="arrivals" stroke="#6366F1" strokeWidth={2} name="Arrivals" />
                <Line type="monotone" dataKey="processed" stroke="#10B981" strokeWidth={2} name="Processed" />
                <Line type="monotone" dataKey="queue" stroke="#EF4444" strokeWidth={2} name="Queue Build-up" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 9: Interviewer Utilization */}
        <div className="glass-card p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-200">9. Interviewer Utilization</h3>
            <span className="text-[10px] text-slate-400">Tech: 98% Utilized</span>
          </div>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={charts?.utilization || []} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <XAxis dataKey="stage" stroke="#64748B" fontSize={9} />
                <YAxis stroke="#64748B" fontSize={10} domain={[0, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px' }} />
                <Bar dataKey="utilization_pct" fill="#38BDF8" radius={[4, 4, 0, 0]} name="Utilization (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>

    </div>
  );
};
