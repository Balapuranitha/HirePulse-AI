import React from 'react';
import { 
  Activity, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  TrendingUp, 
  Sliders, 
  Users, 
  Clock, 
  ShieldCheck,
  Zap,
  BarChart3,
  Bot
} from 'lucide-react';

interface LandingPageProps {
  onLaunchDemo: () => void;
  onViewDashboard: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunchDemo, onViewDashboard }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-4 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/30 via-slate-950 to-slate-950"></div>
        
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-8 animate-bounce">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Recruitment Intelligence Platform</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Turn Every Walk-In Drive Into <span className="gradient-text">Hiring Intelligence</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            HirePulse AI analyzes candidate journeys, detects recruitment bottlenecks, predicts dropouts, and recommends how HR can optimize the next hiring drive.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onLaunchDemo}
              className="gradient-btn px-8 py-4 rounded-xl text-base font-bold flex items-center gap-3 shadow-indigo-500/25"
            >
              <span>Launch Live Demo</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={onViewDashboard}
              className="px-8 py-4 rounded-xl bg-slate-900 hover:bg-slate-850 text-slate-200 border border-slate-800 font-semibold text-base transition flex items-center gap-2"
            >
              <BarChart3 className="w-5 h-5 text-indigo-400" />
              <span>View Analytics Dashboard</span>
            </button>
          </div>

          {/* KPI Snapshot Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="glass-card p-4">
              <div className="text-2xl font-black text-white">300</div>
              <div className="text-xs text-slate-400 font-medium">Candidates Analyzed</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-black text-rose-400">78.5m</div>
              <div className="text-xs text-slate-400 font-medium">Critical Tech Wait Time</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-black text-amber-400">78 / 100</div>
              <div className="text-xs text-slate-400 font-medium">Friction Score Peak</div>
            </div>
            <div className="glass-card p-4">
              <div className="text-2xl font-black text-emerald-400">36% ↓</div>
              <div className="text-xs text-slate-400 font-medium">Simulated Optimization</div>
            </div>
          </div>

        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-b border-slate-800/80">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-white">The Walk-In Recruitment Bottleneck Problem</h2>
          <p className="text-slate-400 mt-2 text-sm max-w-2xl mx-auto">
            Traditional recruitment drives lose up to 30% of top tech talent due to process friction, unmonitored queues, and silent dropouts.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="glass-card p-6 border-l-4 border-l-rose-500">
            <div className="w-10 h-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">75+ Mins Tech Queue Delays</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Technical round interviewers become severe bottlenecks during peak morning candidate arrivals.
            </p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-amber-500">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-4">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Silent Process Abandonment</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              Candidates walk away without filling out exit surveys, leaving HR blind to true operational friction.
            </p>
          </div>

          <div className="glass-card p-6 border-l-4 border-l-indigo-500">
            <div className="w-10 h-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Lack of Real-Time Intelligence</h3>
            <p className="text-xs text-slate-300 mt-2 leading-relaxed">
              HR teams rely on post-event complaints rather than predictive journey analytics and live queue management.
            </p>
          </div>
        </div>
      </section>

      {/* How HirePulse Works */}
      <section className="py-20 px-4 bg-slate-900/40 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-white">How HirePulse AI Transforms Hiring Drives</h2>
            <p className="text-slate-400 mt-2 text-sm">
              An end-to-end intelligence engine that turns candidate journey data into HR action.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Journey Tracking', desc: 'Real-time stage timestamps & wait counters' },
              { step: '02', title: 'AI Analysis', desc: 'NLP sentiment, topic & voice extraction' },
              { step: '03', title: 'Bottleneck Detect', desc: 'Proprietary 0-100 Candidate Friction Score' },
              { step: '04', title: 'Dropout Predict', desc: 'ML silent dropout probability classification' },
              { step: '05', title: 'Process Simulator', desc: 'What-if capacity optimization modeling' },
            ].map((s, idx) => (
              <div key={idx} className="glass-card p-5 text-center relative group hover:border-indigo-500/50 transition">
                <div className="text-xs font-black text-indigo-400 mb-2">{s.step}</div>
                <h4 className="font-bold text-white text-sm">{s.title}</h4>
                <p className="text-[11px] text-slate-400 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Capabilities & Value Proposition */}
      <section className="py-20 px-4 max-w-6xl mx-auto border-b border-slate-800/80">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-indigo-400 font-bold text-xs uppercase tracking-wider mb-2">Core Differentiators</div>
            <h2 className="text-3xl font-extrabold text-white leading-tight">
              An AI Platform That Learns From Every Candidate Journey
            </h2>
            <p className="text-slate-300 mt-4 text-sm leading-relaxed">
              HirePulse AI goes far beyond static surveys. It creates a dynamic digital twin of your recruitment drive, simulating capacity changes before you deploy interviewers.
            </p>

            <div className="mt-8 space-y-4">
              {[
                'Proprietary Candidate Friction Score (0-100) per recruitment stage',
                'Silent Dropout Detection identifying process abandonment before candidates leave',
                'Speech-to-Text Voice Feedback with real-time sentiment and topic extraction',
                'What-If Recruitment Process Simulator predicting wait time reduction and throughput',
                'Printable Executive HR Leadership Reports for post-drive debriefs'
              ].map((feat, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-200 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Preview Card */}
          <div className="glass-card p-6 border-indigo-500/30">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-indigo-400" />
                <span className="font-bold text-sm text-white">Live AI Insight Preview</span>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold">Critical Alert</span>
            </div>

            <div className="mt-4 space-y-3 text-xs">
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Bottleneck Stage:</span>
                <span className="font-bold text-white ml-2">Technical Round (78.5 min wait)</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800">
                <span className="text-slate-400">Primary Root Cause:</span>
                <span className="text-slate-200 block mt-1">Interviewer capacity shortage during 10:00 AM - 12:00 PM peak arrival window.</span>
              </div>

              <div className="bg-indigo-950/40 p-3 rounded-lg border border-indigo-500/30">
                <span className="text-indigo-300 font-bold block mb-1">AI Recommendation:</span>
                <span className="text-slate-200">Deploy +1 Technical Interviewer panel. Projected wait time reduction: 75m → 48m (-36%).</span>
              </div>
            </div>

            <button
              onClick={onLaunchDemo}
              className="mt-6 w-full py-3 rounded-xl gradient-btn font-bold text-xs flex items-center justify-center gap-2"
            >
              <span>Explore Interactive Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-16 px-4 text-center">
        <h2 className="text-2xl font-bold text-white">Ready to Optimize Your Next Recruitment Drive?</h2>
        <p className="text-slate-400 text-xs mt-2 max-w-xl mx-auto">
          Explore HirePulse AI now with the pre-populated demo dataset (300 candidates, Technical bottleneck, process simulator).
        </p>
        <button
          onClick={onLaunchDemo}
          className="mt-6 gradient-btn px-8 py-3.5 rounded-xl font-bold text-sm inline-flex items-center gap-2"
        >
          <span>Launch Demo Environment</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

    </div>
  );
};
