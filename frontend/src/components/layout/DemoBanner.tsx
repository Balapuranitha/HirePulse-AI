import React from 'react';
import { Sparkles, RefreshCw, Sliders, MessageSquare, Database } from 'lucide-react';

interface DemoBannerProps {
  onLoadDemoDrive: () => void;
  onGenerateAiInsights: () => void;
  onSimulateOptimization: () => void;
  onGenerateSampleFeedback: () => void;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onLoadDemoDrive,
  onGenerateAiInsights,
  onSimulateOptimization,
  onGenerateSampleFeedback,
}) => {
  return (
    <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-950 border-b border-indigo-500/20 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Indicator */}
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold uppercase tracking-wider text-[10px] border border-emerald-500/30 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            DEMO MODE ACTIVE
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Loaded: <strong className="text-white">Software Engineer Walk-In Drive (300 Candidates)</strong>
          </span>
        </div>

        {/* Quick Demo Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={onLoadDemoDrive}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Database className="w-3.5 h-3.5 text-sky-400" />
            <span>Load Demo Drive</span>
          </button>

          <button
            onClick={onGenerateAiInsights}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Generate AI Insights</span>
          </button>

          <button
            onClick={onSimulateOptimization}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white font-medium shadow transition"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>Simulate Optimization</span>
          </button>

          <button
            onClick={onGenerateSampleFeedback}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
          >
            <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
            <span>Sample Feedback</span>
          </button>
        </div>

      </div>
    </div>
  );
};
