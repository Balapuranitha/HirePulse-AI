import React, { useState, useEffect } from 'react';
import { Sliders, RefreshCw, ArrowRight, TrendingUp, Clock, UserX, CheckCircle2, Info, Sparkles } from 'lucide-react';
import { api } from '../services/api';
import { SimulationResponse } from '../types';

export const SimulationsPage: React.FC = () => {
  // Simulator Controls State
  const [techInterviewers, setTechInterviewers] = useState(3);
  const [hrInterviewers, setHrInterviewers] = useState(4);
  const [mgrInterviewers, setMgrInterviewers] = useState(3);
  const [avgTechDuration, setAvgTechDuration] = useState(20);
  const [avgHrDuration, setAvgHrDuration] = useState(15);
  const [avgMgrDuration, setAvgMgrDuration] = useState(25);
  const [breakDuration, setBreakDuration] = useState(15);
  const [parallelRooms, setParallelRooms] = useState(8);

  const [simResult, setSimResult] = useState<SimulationResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const runSimulation = async () => {
    setLoading(true);
    try {
      const res = await api.runSimulation({
        drive_id: 'DRIVE-2026-001',
        tech_interviewers: techInterviewers,
        hr_interviewers: hrInterviewers,
        managerial_interviewers: mgrInterviewers,
        avg_tech_duration_mins: avgTechDuration,
        avg_hr_duration_mins: avgHrDuration,
        avg_managerial_duration_mins: avgMgrDuration,
        break_duration_mins: breakDuration,
        parallel_rooms: parallelRooms,
      });
      setSimResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [techInterviewers, hrInterviewers, mgrInterviewers, avgTechDuration, avgHrDuration, avgMgrDuration, breakDuration, parallelRooms]);

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Sliders className="w-6 h-6 text-indigo-400" />
            <span>Recruitment Process Simulator (What-If Engine)</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Interactively simulate panel capacity changes to eliminate bottlenecks before drive execution.
          </p>
        </div>

        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          Simulation / projected estimate
        </span>
      </div>

      {/* Simulator Controls & Output Split Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Left: Controls Panel (5 cols) */}
        <div className="lg:col-span-5 glass-card p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
              <Sliders className="w-4 h-4 text-indigo-400" />
              <span>Simulation Controls</span>
            </h2>
            <button
              onClick={() => {
                setTechInterviewers(2);
                setAvgTechDuration(22.5);
              }}
              className="text-[11px] text-slate-400 hover:text-white flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" /> Reset Baseline
            </button>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Technical Interviewers Slider */}
            <div className="bg-slate-950 p-3.5 rounded-xl border border-indigo-500/30 space-y-2">
              <div className="flex justify-between font-bold">
                <span className="text-slate-200">Technical Interviewers:</span>
                <span className="text-indigo-400 text-sm">{techInterviewers} Panels</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={techInterviewers}
                onChange={(e) => setTechInterviewers(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>1 Panel</span>
                <span>Baseline: 2</span>
                <span>10 Panels</span>
              </div>
            </div>

            {/* HR Interviewers */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>HR Screening Interviewers:</span>
                <span className="text-sky-400 font-bold">{hrInterviewers} Panels</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={hrInterviewers}
                onChange={(e) => setHrInterviewers(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
            </div>

            {/* Managerial Interviewers */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Managerial Interviewers:</span>
                <span className="text-emerald-400 font-bold">{mgrInterviewers} Panels</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                value={mgrInterviewers}
                onChange={(e) => setMgrInterviewers(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
            </div>

            {/* Avg Technical Interview Duration */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Avg Tech Duration (mins):</span>
                <span className="text-amber-400 font-bold">{avgTechDuration} min</span>
              </div>
              <input
                type="range"
                min={10}
                max={45}
                step={2.5}
                value={avgTechDuration}
                onChange={(e) => setAvgTechDuration(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            {/* Parallel Rooms */}
            <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between font-semibold text-slate-300">
                <span>Parallel Interview Rooms:</span>
                <span className="text-indigo-300 font-bold">{parallelRooms} Rooms</span>
              </div>
              <input
                type="range"
                min={2}
                max={20}
                value={parallelRooms}
                onChange={(e) => setParallelRooms(Number(e.target.value))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>

          </div>
        </div>

        {/* Right: Real-Time Comparison Output (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 space-y-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-6">
              <h2 className="font-extrabold text-white text-sm uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Current vs. Simulated Optimization Results</span>
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                Live Recalculated
              </span>
            </div>

            {simResult && (
              <div className="grid sm:grid-cols-2 gap-4">
                
                {/* Current Scenario Card */}
                <div className="glass-card p-4 border-rose-500/30 bg-slate-950 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-extrabold text-rose-400 text-xs uppercase">Current Scenario</span>
                    <span className="text-[10px] text-slate-400">Baseline</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Avg Wait Time:</span>
                      <span className="font-mono font-bold text-rose-400">75.0 mins</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Queue Length:</span>
                      <span className="font-mono font-bold text-slate-200">72 candidates</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Process Duration:</span>
                      <span className="font-mono font-bold text-slate-200">6.0 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Predicted Dropout:</span>
                      <span className="font-mono font-bold text-rose-400">24.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Candidate CSAT:</span>
                      <span className="font-mono font-bold text-amber-400">3.6 / 5</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Scenario Card */}
                <div className="glass-card p-4 border-emerald-500 bg-emerald-950/20 space-y-3 relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-extrabold text-emerald-400 text-xs uppercase">Simulated Scenario</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500 text-slate-950">Optimized</span>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-300">Avg Wait Time:</span>
                      <span className="font-mono font-black text-emerald-400 text-sm">
                        {simResult.simulated_scenario.avg_waiting_time_mins} mins
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Max Queue Length:</span>
                      <span className="font-mono font-bold text-white">
                        {simResult.simulated_scenario.max_queue_length} candidates
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Process Duration:</span>
                      <span className="font-mono font-bold text-white">
                        {simResult.simulated_scenario.total_process_duration_hours} hours
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Predicted Dropout:</span>
                      <span className="font-mono font-bold text-emerald-400">
                        {simResult.simulated_scenario.predicted_dropout_rate_pct}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-300">Candidate CSAT:</span>
                      <span className="font-mono font-bold text-yellow-300">
                        {simResult.simulated_scenario.candidate_satisfaction_score} / 5
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            )}
          </div>

          {/* Delta Highlights Banner */}
          {simResult && (
            <div className="bg-indigo-950/60 border border-indigo-500/30 p-4 rounded-xl flex flex-wrap items-center justify-around gap-4 text-center">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Wait Time Delta</span>
                <span className="text-lg font-black text-emerald-400">
                  {simResult.delta_waiting_time_pct}% ↓
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Dropout Risk Delta</span>
                <span className="text-lg font-black text-emerald-400">
                  {simResult.delta_dropout_pct}% ↓
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Process Duration Saved</span>
                <span className="text-lg font-black text-sky-400">
                  {Math.abs(simResult.delta_duration_hours)} hours faster
                </span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
