import React, { useEffect, useState } from 'react';
import { Sparkles, CheckCircle2, ArrowRight, TrendingUp, Sliders, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';
import { Recommendation } from '../types';

interface RecommendationsPageProps {
  onNavigate: (tab: string) => void;
}

export const RecommendationsPage: React.FC<RecommendationsPageProps> = ({ onNavigate }) => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);

  useEffect(() => {
    async function loadRecs() {
      try {
        const res = await api.getRecommendations();
        setRecommendations(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadRecs();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-indigo-400" />
            <span>AI Recommendation Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Data-backed HR recommendations with evidence cards and projected operational impact metrics.
          </p>
        </div>

        <button
          onClick={() => onNavigate('simulations')}
          className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Sliders className="w-4 h-4" />
          <span>Validate via What-If Simulator</span>
        </button>
      </div>

      {/* Recommendations Cards List */}
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="glass-card p-6 border-indigo-500/30 space-y-4">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded text-xs font-black uppercase ${
                  rec.priority === 'Critical' ? 'bg-rose-500 text-white animate-pulse' :
                  rec.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' :
                  'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {rec.priority} Priority
                </span>
                <span className="font-extrabold text-white text-base">{rec.stage} Optimization</span>
              </div>
              <span className="text-xs text-slate-400 font-mono">ID: {rec.id}</span>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 text-xs">
              
              {/* Problem & Evidence */}
              <div className="lg:col-span-2 space-y-3">
                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-rose-400 block mb-1">Identified Operational Deficit</span>
                  <p className="text-slate-200 leading-relaxed">{rec.problem}</p>
                </div>

                <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
                  <span className="font-bold text-amber-400 block mb-1">Data Evidence & Feedback Cluster</span>
                  <p className="text-slate-300 leading-relaxed">{rec.evidence}</p>
                </div>

                <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30">
                  <span className="font-bold text-indigo-300 block mb-1">AI Recommendation</span>
                  <p className="text-white text-sm font-semibold leading-relaxed">{rec.recommendation}</p>
                </div>
              </div>

              {/* Expected Impact Table */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                    <span className="font-bold text-white">Projected Impact</span>
                    <span className="text-[10px] text-slate-400 italic">* Simulated estimates</span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Avg Wait Time:</span>
                      <div className="flex items-center gap-1 font-mono font-bold">
                        <span className="text-rose-400 line-through">{rec.expected_impact.waiting_time_before}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-emerald-400">{rec.expected_impact.waiting_time_after}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Dropout Rate:</span>
                      <div className="flex items-center gap-1 font-mono font-bold">
                        <span className="text-rose-400 line-through">{rec.expected_impact.dropout_rate_before}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-emerald-400">{rec.expected_impact.dropout_rate_after}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">Candidate Sat:</span>
                      <div className="flex items-center gap-1 font-mono font-bold">
                        <span className="text-amber-400">{rec.expected_impact.candidate_sat_before}</span>
                        <ArrowRight className="w-3 h-3 text-slate-500" />
                        <span className="text-emerald-400">{rec.expected_impact.candidate_sat_after}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('simulations')}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs flex items-center justify-center gap-2 transition"
                >
                  <span>Test in Simulator</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
