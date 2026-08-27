import React, { useEffect, useState } from 'react';
import { GitMerge, Clock, Users, UserX, AlertTriangle, ChevronRight, Flame, X, CheckCircle2 } from 'lucide-react';
import { api } from '../services/api';
import { StageMetric } from '../types';

export const JourneyAnalyticsPage: React.FC = () => {
  const [stages, setStages] = useState<StageMetric[]>([]);
  const [selectedStage, setSelectedStage] = useState<StageMetric | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFunnel() {
      try {
        const res = await api.getFunnel();
        setStages(res);
        if (res.length >= 3) {
          setSelectedStage(res[2]); // Technical Round default selected
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadFunnel();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <GitMerge className="w-6 h-6 text-indigo-400" />
            <span>Candidate Journey Pipeline Intelligence</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Visual recruitment stage pipeline analysis, queue wait times, and bottleneck diagnostics.
          </p>
        </div>
      </div>

      {/* 5-Stage Visual Pipeline Bar */}
      <div className="glass-card p-6">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-300 mb-6">
          End-to-End Walk-In Stage Pipeline Flow
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 relative">
          {stages.map((st, idx) => {
            const isCritical = st.bottleneck_status.includes('Critical');
            const isSelected = selectedStage?.stage_name === st.stage_name;
            
            return (
              <div
                key={st.stage_name}
                onClick={() => setSelectedStage(st)}
                className={`p-4 rounded-xl border transition-all cursor-pointer relative group ${
                  isSelected
                    ? 'bg-indigo-950/80 border-indigo-500 shadow-xl ring-2 ring-indigo-500/50'
                    : isCritical
                    ? 'bg-rose-950/30 border-rose-500/40 hover:border-rose-500'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Stage 0{idx + 1}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase ${
                    isCritical ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse' :
                    st.bottleneck_status.includes('Medium') ? 'bg-amber-500/20 text-amber-300' :
                    'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {st.bottleneck_status}
                  </span>
                </div>

                <h4 className="font-extrabold text-white text-sm mb-3">{st.stage_name}</h4>

                <div className="space-y-1.5 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Entered:</span>
                    <span className="font-bold text-white">{st.entered_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Completed:</span>
                    <span className="font-bold text-emerald-400">{st.completed_count}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Avg Wait:</span>
                    <span className={`font-bold ${st.avg_wait_mins >= 60 ? 'text-rose-400' : 'text-amber-400'}`}>
                      {st.avg_wait_mins}m
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Friction:</span>
                    <span className="font-bold text-indigo-300">{st.friction_score}/100</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 group-hover:text-indigo-400">
                  <span>Inspect Details</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage Detail Drawer / Information Card */}
      {selectedStage && (
        <div className="glass-card p-6 border-indigo-500/30 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white">{selectedStage.stage_name} Deep-Dive Diagnostics</h2>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  selectedStage.friction_score >= 70 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
                }`}>
                  Friction Score: {selectedStage.friction_score} / 100
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">Detailed candidate velocity and operational bottlenecks for {selectedStage.stage_name}.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Average Wait Time</span>
              <span className="text-2xl font-black text-amber-400">{selectedStage.avg_wait_mins} mins</span>
              <span className="text-[10px] text-slate-500 block mt-1">Target limit: 20 mins</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Stage Dropouts</span>
              <span className="text-2xl font-black text-rose-400">{selectedStage.dropout_count} candidates</span>
              <span className="text-[10px] text-slate-500 block mt-1">Process abandonment</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Negative Feedback</span>
              <span className="text-2xl font-black text-indigo-400">{Math.round(selectedStage.negative_feedback_pct * 100)}%</span>
              <span className="text-[10px] text-slate-500 block mt-1">Mentioning queue/delay</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
              <span className="text-slate-400 block mb-1">Bottleneck Status</span>
              <span className="text-lg font-extrabold text-white">{selectedStage.bottleneck_status}</span>
              <span className="text-[10px] text-slate-500 block mt-1">Queue capacity indicator</span>
            </div>
          </div>

          {selectedStage.friction_score >= 70 && (
            <div className="bg-rose-950/40 border border-rose-500/40 p-4 rounded-xl text-xs space-y-1">
              <div className="flex items-center gap-2 font-bold text-rose-400">
                <AlertTriangle className="w-4 h-4" />
                <span>Critical Friction Detected at {selectedStage.stage_name}</span>
              </div>
              <p className="text-slate-300">
                Possible cause: Technical interviewer panel capacity shortage during peak arrival hours (10:00 AM - 12:00 PM). Queue wait time has reached {selectedStage.avg_wait_mins} mins.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};
