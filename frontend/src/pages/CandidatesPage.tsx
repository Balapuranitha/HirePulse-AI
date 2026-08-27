import React, { useEffect, useState } from 'react';
import { Users, Search, Filter, AlertTriangle, CheckCircle2, UserX, Clock, Eye, X } from 'lucide-react';
import { api } from '../services/api';
import { Candidate } from '../types';

export const CandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [search, setSearch] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [silentOnly, setSilentOnly] = useState<boolean>(false);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCandidates() {
      try {
        const res = await api.getCandidates({
          silent_dropout: silentOnly ? true : undefined,
          stage: stageFilter !== 'All' ? stageFilter : undefined,
          status: statusFilter !== 'All' ? statusFilter : undefined
        });
        setCandidates(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadCandidates();
  }, [stageFilter, statusFilter, silentOnly]);

  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.candidate_code.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" />
            <span>Candidate Directory</span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
              {filteredCandidates.length} Candidates Loaded
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time candidate tracking, journey status, friction scores, and dropout probability flags.
          </p>
        </div>
      </div>

      {/* Filter & Search Toolbar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative flex-1 min-w-[240px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by name, ID (e.g. HP-284), email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Stages</option>
            <option value="Registration">Registration</option>
            <option value="HR Screening">HR Screening</option>
            <option value="Technical Round">Technical Round</option>
            <option value="Managerial Round">Managerial Round</option>
            <option value="Final Decision">Final Decision</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="All">All Statuses</option>
            <option value="In Progress">In Progress</option>
            <option value="Selected">Selected</option>
            <option value="Rejected">Rejected</option>
            <option value="Dropout">Dropout</option>
          </select>

          <button
            onClick={() => setSilentOnly(!silentOnly)}
            className={`px-3 py-2 rounded-xl border transition text-xs font-semibold flex items-center gap-1.5 ${
              silentOnly
                ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
                : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Silent Dropouts Only</span>
          </button>

        </div>
      </div>

      {/* Candidate Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Code & Name</th>
                <th className="py-3 px-4">Current Stage</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Total Wait</th>
                <th className="py-3 px-4">Friction Score</th>
                <th className="py-3 px-4">Dropout Risk</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {filteredCandidates.slice(0, 50).map((c) => {
                const isHighRisk = c.dropout_probability >= 0.65;
                return (
                  <tr key={c.id} className="hover:bg-slate-900/60 transition">
                    <td className="py-3 px-4">
                      <div className="font-bold text-white flex items-center gap-2">
                        <span>{c.name}</span>
                        {c.silent_dropout && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">
                            Silent Abandonment
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400">{c.candidate_code} • {c.email}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-slate-800 text-slate-200 text-[11px]">
                        {c.current_stage}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                        c.status === 'Selected' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                        c.status === 'Dropout' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        c.status === 'Rejected' ? 'bg-slate-800 text-slate-400' :
                        'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      }`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-slate-300 font-mono">
                      {c.total_wait_minutes} mins
                    </td>

                    <td className="py-3 px-4">
                      <span className={`font-bold ${c.friction_score >= 70 ? 'text-rose-400' : c.friction_score >= 40 ? 'text-amber-400' : 'text-emerald-400'}`}>
                        {c.friction_score} / 100
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-800 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${isHighRisk ? 'bg-rose-500' : c.dropout_probability >= 0.35 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                            style={{ width: `${c.dropout_probability * 100}%` }}
                          ></div>
                        </div>
                        <span className={`font-bold text-[11px] ${isHighRisk ? 'text-rose-400' : 'text-slate-300'}`}>
                          {Math.round(c.dropout_probability * 100)}%
                        </span>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedCandidate(c)}
                        className="p-1.5 rounded-lg bg-slate-800 hover:bg-indigo-600 text-slate-300 hover:text-white transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-xl w-full p-6 space-y-4 relative">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center font-bold text-white text-lg">
                {selectedCandidate.name.charAt(0)}
              </div>
              <div>
                <h3 className="font-extrabold text-white text-lg">{selectedCandidate.name}</h3>
                <p className="text-xs text-slate-400">{selectedCandidate.candidate_code} • {selectedCandidate.email} • {selectedCandidate.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Current Stage</span>
                <span className="font-bold text-white text-sm">{selectedCandidate.current_stage}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Journey Status</span>
                <span className="font-bold text-emerald-400 text-sm">{selectedCandidate.status}</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Total Waiting Time</span>
                <span className="font-bold text-amber-400 text-sm">{selectedCandidate.total_wait_minutes} mins</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400 block mb-1">Friction Score</span>
                <span className="font-bold text-rose-400 text-sm">{selectedCandidate.friction_score} / 100</span>
              </div>
            </div>

            {/* Risk Breakdown Card */}
            <div className="bg-indigo-950/40 p-4 rounded-xl border border-indigo-500/30 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-indigo-300">Dropout Risk Prediction</span>
                <span className="font-black text-rose-400 text-sm">{Math.round(selectedCandidate.dropout_probability * 100)}% Risk</span>
              </div>
              <p className="text-slate-300 text-[11px]">Primary Contributing Factors:</p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {(selectedCandidate.top_risk_factors || []).map((rf, i) => (
                  <li key={i}>{rf}</li>
                ))}
              </ul>
              <div className="pt-2 text-[10px] text-slate-400 italic">
                * Note: Model estimates, synthetic demo prediction.
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
