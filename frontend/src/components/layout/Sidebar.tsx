import React from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Users, 
  GitMerge, 
  Flame, 
  MessageSquareText, 
  UserX, 
  Sparkles, 
  Sliders, 
  TrendingUp, 
  FileText,
  HelpCircle,
  Zap
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'drives', label: 'Drives', icon: Layers },
    { id: 'candidates', label: 'Candidates', icon: Users, badge: '300' },
    { id: 'journey', label: 'Journey Analytics', icon: GitMerge, badge: 'Critical', badgeColor: 'bg-rose-500/20 text-rose-400' },
    { id: 'friction', label: 'Friction Score', icon: Flame, badge: '78/100', badgeColor: 'bg-amber-500/20 text-amber-400' },
    { id: 'feedback', label: 'Feedback Intelligence', icon: MessageSquareText },
    { id: 'dropout', label: 'Dropout Prediction', icon: UserX, badge: 'AI Risk', badgeColor: 'bg-indigo-500/20 text-indigo-400' },
    { id: 'root-cause', label: 'AI Root Cause', icon: HelpCircle },
    { id: 'recommendations', label: 'AI Recommendations', icon: Sparkles, badge: '3 Actions', badgeColor: 'bg-emerald-500/20 text-emerald-400' },
    { id: 'simulations', label: 'Recruitment Simulator', icon: Sliders, highlight: true },
    { id: 'impact', label: 'Business Impact', icon: TrendingUp },
    { id: 'reports', label: 'Executive Report', icon: FileText },
  ];

  return (
    <aside className="w-64 shrink-0 hidden md:block bg-slate-950/60 border-r border-slate-800/80 p-4 min-h-[calc(100vh-65px)]">
      <div className="space-y-1">
        <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Navigation Architecture
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-600/30 font-semibold'
                  : item.highlight
                  ? 'bg-indigo-950/40 border border-indigo-500/30 text-indigo-300 hover:bg-indigo-900/40 hover:text-white'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-indigo-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Simulator Feature Callout Card */}
      <div className="mt-8 p-3.5 rounded-xl bg-gradient-to-br from-indigo-950/80 to-slate-900 border border-indigo-500/30">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold mb-1">
          <Zap className="w-4 h-4" />
          <span>Process Simulator</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Test what-if hiring scenarios before drive launch to eliminate bottlenecks.
        </p>
        <button
          onClick={() => setActiveTab('simulations')}
          className="mt-2.5 w-full py-1.5 px-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold shadow transition"
        >
          Launch Simulator
        </button>
      </div>
    </aside>
  );
};
