import React, { useEffect, useState } from 'react';
import { UserX, AlertTriangle, ShieldAlert, Clock, CheckCircle2, Info, Eye } from 'lucide-react';
import { api } from '../services/api';
import { Candidate } from '../types';

export const DropoutPredictionPage: React.FC = () => {
  const [silentCandidates, setSilentCandidates] = useState<Candidate[]>([]);
  const [highRiskCandidates, setHighRiskCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    async function loadDropoutData() {
      try {
        const [silentRes, riskRes] = await Promise.all([
          api.getSilentDropouts(),
          api.getDropoutPredictions()
        ]);
        setSilentCandidates(silentRes);
        setHighRiskCandidates(riskRes);
      } catch (err) {
        console.error(err);
      }
    }
    loadDropoutData();
  }, []);

  // Signature Candidate #184
  const candidate184 = silentCandidates.find(c => c.id === 'CAND-184') || {
    id: 'CAND-184',
    name: 'Ananya Verma (Demo Signature Candidate)',
    candidate_code: 'HP-284',
    email: 'ananya.verma184@example.com',
    current_stage: 'Technical Round',
    status: 'Dropout',
    total_wait_minutes: 84.0,
    friction_score: 86.5,
    dropout_probability: 0.78,
    silent_dropout: true,
    top_risk_factors: [
      'Waiting time: 84 min in Technical Queue',
      'Rounds completed: 1/3 (HR Done)',
      'Communication status: No status update',
      'High risk classification: Probable Process-Induced Dropout'
    ]
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <UserX className="w-6 h-6 text-rose-400" />
            <span>Silent Dropout Detection & Risk Prediction</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Detect candidates who abandon the walk-in process silently without filing negative exit feedback.
          </p>
        </div>

        <span className="text-[10px] font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
          <Info className="w-3.5 h-3.5" />
          Model estimates / synthetic prototype prediction
        </span>
      </div>

      {/* Signature Feature Highlight Card: Candidate #184 */}
      <div className="glass-card p-6 border-rose-500 bg-gradient-to-r from-rose-950/40 via-slate-900 to-indigo-950/30 relative overflow-hidden">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <span className="font-extrabold text-sm text-white">Signature Case Study: Candidate #184</span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-500 text-white uppercase animate-pulse">
              Probable Process-Induced Dropout
            </span>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">ID: CAND-184</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-4 items-center">
          
          {/* Risk Gauge Visual */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-center">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Predicted Dropout Probability</div>
            <div className="text-5xl font-black text-rose-400">78%</div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden mt-3">
              <div className="bg-rose-500 h-full w-[78%]"></div>
            </div>
            <span className="text-[10px] text-rose-300 font-bold mt-2">HIGH DROPOUT RISK CLASSIFICATION</span>
          </div>

          {/* Journey Details */}
          <div className="space-y-2 text-xs">
            <div className="font-bold text-white text-sm">{candidate184.name}</div>
            <p className="text-slate-400">{candidate184.candidate_code} • {candidate184.email}</p>
            
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-400">Registration:</span>
                <span className="text-emerald-400 font-bold">Completed ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">HR Screening:</span>
                <span className="text-emerald-400 font-bold">Completed ✓</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Technical Round:</span>
                <span className="text-rose-400 font-bold">Never Attended (Waited 84 mins)</span>
              </div>
            </div>
          </div>

          {/* Contributing Factors Breakdown */}
          <div className="bg-rose-950/40 p-4 rounded-xl border border-rose-500/30 space-y-2 text-xs">
            <span className="font-bold text-rose-300 block mb-1">Major Contributing Factors:</span>
            <ul className="space-y-1 text-slate-200">
              {(candidate184.top_risk_factors || []).map((rf, i) => (
                <li key={i} className="flex items-start gap-1.5 text-[11px]">
                  <span className="text-rose-400 font-bold">•</span>
                  <span>{rf}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Silent Dropouts Table */}
      <div className="glass-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-extrabold text-white text-sm uppercase tracking-wider">
            Detected Silent Process Dropouts ({silentCandidates.length})
          </h2>
          <span className="text-xs text-slate-400">Candidates who abandoned process without feedback</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase font-bold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Candidate</th>
                <th className="py-3 px-4">Stage Abandoned</th>
                <th className="py-3 px-4">Waiting Time</th>
                <th className="py-3 px-4">Friction Score</th>
                <th className="py-3 px-4">Dropout Probability</th>
                <th className="py-3 px-4">AI Classification</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-medium">
              {silentCandidates.slice(0, 15).map((c) => (
                <tr key={c.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-4 font-bold text-white">
                    {c.name}
                    <div className="text-[10px] text-slate-400 font-normal">{c.candidate_code}</div>
                  </td>
                  <td className="py-3 px-4 text-slate-200">{c.current_stage}</td>
                  <td className="py-3 px-4 font-mono text-amber-400">{c.total_wait_minutes} mins</td>
                  <td className="py-3 px-4 font-bold text-rose-400">{c.friction_score} / 100</td>
                  <td className="py-3 px-4">
                    <span className="font-extrabold text-rose-400">{Math.round(c.dropout_probability * 100)}%</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Probable Process-Induced Dropout
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
