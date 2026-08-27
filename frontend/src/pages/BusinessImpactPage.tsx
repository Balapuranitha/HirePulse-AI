import React from 'react';
import { TrendingUp, Clock, UserX, Star, ShieldCheck, Zap, Info } from 'lucide-react';

export const BusinessImpactPage: React.FC = () => {
  const impactMetrics = [
    { metric: 'Average Waiting Time', current: '75.0 mins', optimized: '48.0 mins', improvement: '36.0% Reduction', color: 'text-emerald-400' },
    { metric: 'Candidate Dropout Rate', current: '24.5%', optimized: '16.0%', improvement: '35.0% Reduction', color: 'text-emerald-400' },
    { metric: 'Total Drive Duration', current: '6.0 hours', optimized: '4.8 hours', improvement: '1.2 Hours Saved', color: 'text-sky-400' },
    { metric: 'Candidate Experience Score', current: '3.6 / 5', optimized: '4.4 / 5', improvement: '+0.8 Rating Increase', color: 'text-yellow-400' },
    { metric: 'Manual Analysis Time', current: '4.0 hours', optimized: '40 mins', improvement: '83.3% Time Saved', color: 'text-indigo-400' },
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-indigo-400" />
            <span>Business Impact & Recruitment ROI Engine</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Quantifiable ROI comparing Current Unoptimized Walk-In Drives vs HirePulse AI Optimized Drives.
          </p>
        </div>

        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-400">
          Illustrative simulation — not measured real-world results
        </span>
      </div>

      {/* Impact Metric Cards Grid */}
      <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {impactMetrics.map((item, idx) => (
          <div key={idx} className="glass-card p-4 space-y-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">{item.metric}</span>
            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
              <span className="text-slate-400">Before:</span>
              <span className="text-rose-400 font-mono font-bold">{item.current}</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400">After:</span>
              <span className="text-emerald-400 font-mono font-bold">{item.optimized}</span>
            </div>
            <div className={`pt-2 text-xs font-black ${item.color} border-t border-slate-800 text-center`}>
              {item.improvement}
            </div>
          </div>
        ))}
      </div>

      {/* Before vs After Detailed Table */}
      <div className="glass-card p-6 space-y-4">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider">
          Side-by-Side Operational Comparison
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Performance Dimension</th>
                <th className="py-3 px-4">Current Manual Process</th>
                <th className="py-3 px-4">HirePulse AI Process</th>
                <th className="py-3 px-4">Business Value Delivered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              <tr className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 px-4 font-bold text-white">Candidate Queue Visibility</td>
                <td className="py-3.5 px-4 text-rose-300">Manual whiteboard tokens & verbal calls</td>
                <td className="py-3.5 px-4 text-emerald-300 font-bold">Real-time mobile queue notifications & live boards</td>
                <td className="py-3.5 px-4 text-slate-200">Reduces candidate anxiety and waiting room chaos</td>
              </tr>
              <tr className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 px-4 font-bold text-white">Bottleneck Identification</td>
                <td className="py-3.5 px-4 text-rose-300">Discovered post-event after complaints</td>
                <td className="py-3.5 px-4 text-emerald-300 font-bold">Predictive Candidate Friction Score (0-100)</td>
                <td className="py-3.5 px-4 text-slate-200">Enables mid-drive interviewer reallocation</td>
              </tr>
              <tr className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 px-4 font-bold text-white">Candidate Dropouts</td>
                <td className="py-3.5 px-4 text-rose-300">24.5% silent loss without reason tracking</td>
                <td className="py-3.5 px-4 text-emerald-300 font-bold">Silent Dropout Detection (78% risk model)</td>
                <td className="py-3.5 px-4 text-slate-200">Recovers top engineering talent before exit</td>
              </tr>
              <tr className="hover:bg-slate-900/60 transition">
                <td className="py-3.5 px-4 font-bold text-white">Feedback Analysis</td>
                <td className="py-3.5 px-4 text-rose-300">Manual reading of paper survey forms</td>
                <td className="py-3.5 px-4 text-emerald-300 font-bold">Speech-to-Text Voice + AI NLP Topic Extraction</td>
                <td className="py-3.5 px-4 text-slate-200">Reduces analysis overhead from 4 hrs → 40 mins</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
