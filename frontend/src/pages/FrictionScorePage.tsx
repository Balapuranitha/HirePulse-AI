import React, { useEffect, useState } from 'react';
import { Flame, AlertTriangle, ShieldAlert, CheckCircle2, TrendingUp, Info } from 'lucide-react';
import { api } from '../services/api';

export const FrictionScorePage: React.FC = () => {
  const [frictionData, setFrictionData] = useState<any>(null);

  useEffect(() => {
    async function loadFriction() {
      try {
        const res = await api.getFriction();
        setFrictionData(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadFriction();
  }, []);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Flame className="w-6 h-6 text-amber-400" />
            <span>Candidate Friction Score Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Proprietary metric quantifying overall process friction (Scale: 0–100. Higher score = worse experience).
          </p>
        </div>
      </div>

      {/* Overall Score Header Banner */}
      <div className="glass-card p-6 border-amber-500/30 bg-gradient-to-r from-amber-950/30 via-slate-900 to-indigo-950/30">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Overall Drive Friction</span>
            <div className="text-5xl font-black text-amber-400 mt-1">
              58.4 <span className="text-xl text-slate-400 font-normal">/ 100</span>
            </div>
            <span className="inline-block mt-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30">
              High Friction Detected
            </span>
          </div>

          <div className="md:col-span-2 space-y-3 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6 text-xs text-slate-300">
            <h3 className="font-bold text-white text-sm">Friction Mathematical Factors</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Waiting Time Ratio (35%)</span>
                <strong className="text-rose-400 font-bold">38.2 pts</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Negative Sentiment (25%)</span>
                <strong className="text-amber-400 font-bold">22.5 pts</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Stage Dropouts (25%)</span>
                <strong className="text-rose-400 font-bold">24.0 pts</strong>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                <span className="text-slate-400 block">Communication Delays (15%)</span>
                <strong className="text-sky-400 font-bold">15.3 pts</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stage Breakdown Cards Grid */}
      <div>
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider mb-4">Stage-by-Stage Friction Breakdown</h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Registration */}
          <div className="glass-card p-5 border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Stage 01</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">Low Friction</span>
            </div>
            <h3 className="font-extrabold text-white">Registration</h3>
            <div className="text-3xl font-black text-emerald-400">18 <span className="text-xs text-slate-400">/ 100</span></div>
            <p className="text-[11px] text-slate-300">Smooth entry check-in with minimal queueing variance.</p>
          </div>

          {/* HR Screening */}
          <div className="glass-card p-5 border-sky-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Stage 02</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">Medium Friction</span>
            </div>
            <h3 className="font-extrabold text-white">HR Screening</h3>
            <div className="text-3xl font-black text-sky-400">32 <span className="text-xs text-slate-400">/ 100</span></div>
            <p className="text-[11px] text-slate-300">Moderate arrival burst at 10 AM causing minor wait spikes.</p>
          </div>

          {/* Technical Round - CRITICAL */}
          <div className="glass-card p-5 border-rose-500 bg-rose-950/20 space-y-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-300">Stage 03</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white animate-pulse">Critical Friction</span>
            </div>
            <h3 className="font-extrabold text-white">Technical Round</h3>
            <div className="text-3xl font-black text-rose-400">78 <span className="text-xs text-slate-300">/ 100</span></div>
            <p className="text-[11px] text-rose-200">Extended 78.5 min wait time. Primary bottleneck responsible for dropouts.</p>
          </div>

          {/* Managerial Round */}
          <div className="glass-card p-5 border-amber-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Stage 04</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Medium Friction</span>
            </div>
            <h3 className="font-extrabold text-white">Managerial Round</h3>
            <div className="text-3xl font-black text-amber-400">41 <span className="text-xs text-slate-400">/ 100</span></div>
            <p className="text-[11px] text-slate-300">Transition gap delays between Technical pass and Managerial room assignment.</p>
          </div>

        </div>
      </div>

      {/* Critical Alert Detailed Explanation */}
      <div className="glass-card p-6 border-l-4 border-l-rose-500 bg-rose-950/20 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
          <ShieldAlert className="w-5 h-5" />
          <span>Critical Friction Detected: Technical Round (Score: 78/100)</span>
        </div>
        <p className="text-xs text-slate-200 leading-relaxed">
          The Candidate Friction Score for Technical Round has breached the acceptable threshold of 50/100. This is driven by 78.5-minute average waiting times, 42% negative candidate feedback mentions, and 48 silent process dropouts. Adding 1 interviewer panel is projected to lower this friction score from 78 → 42/100.
        </p>
      </div>

    </div>
  );
};
