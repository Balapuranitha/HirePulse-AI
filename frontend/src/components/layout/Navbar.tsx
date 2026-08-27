import React, { useState } from 'react';
import { 
  Activity, 
  Bell, 
  ChevronDown, 
  QrCode, 
  User, 
  Sparkles, 
  ExternalLink,
  AlertTriangle,
  X
} from 'lucide-react';
import { Drive } from '../../types';

interface NavbarProps {
  currentDrive: Drive | null;
  drives: Drive[];
  onSelectDrive: (drive: Drive) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenQrModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentDrive,
  drives,
  onSelectDrive,
  activeTab,
  setActiveTab,
  onOpenQrModal,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showDriveDropdown, setShowDriveDropdown] = useState(false);

  const notifications = [
    { id: 1, type: 'critical', title: 'Critical Bottleneck Detected', text: 'Technical Round waiting time reached 78.5 mins (Friction Score: 78/100).', time: '10m ago' },
    { id: 2, type: 'warning', title: 'High Dropout Risk Flagged', text: 'Candidate #184 flagged with 78% probability of silent abandonment.', time: '25m ago' },
    { id: 3, type: 'info', title: 'New Feedback Cluster', text: '35% of negative feedback mentions waiting hall seating capacity.', time: '42m ago' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-xl border-b border-slate-800/80 px-4 lg:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Left: Brand & Drive Switcher */}
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('landing')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-sky-400 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-white">HirePulse</span>
                <span className="px-2 py-0.5 text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 rounded-full flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> AI
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-wider uppercase">Candidate Journey Intelligence</p>
            </div>
          </div>

          {/* Drive Selector */}
          <div className="relative hidden md:block">
            <button
              onClick={() => setShowDriveDropdown(!showDriveDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-sm font-medium text-slate-200 hover:bg-slate-850 hover:border-slate-700 transition"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span>{currentDrive ? currentDrive.title : 'Software Engineer Walk-In Drive 2026'}</span>
              <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>

            {showDriveDropdown && (
              <div className="absolute left-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2">
                <div className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Active Recruitment Drives</div>
                {drives.map((drive) => (
                  <button
                    key={drive.id}
                    onClick={() => {
                      onSelectDrive(drive);
                      setShowDriveDropdown(false);
                    }}
                    className="w-full text-left px-3 py-2 text-sm hover:bg-indigo-600/10 hover:text-indigo-400 flex items-center justify-between transition"
                  >
                    <div>
                      <div className="font-medium text-slate-200">{drive.title}</div>
                      <div className="text-xs text-slate-400">{drive.job_role} • {drive.date}</div>
                    </div>
                    {currentDrive?.id === drive.id && (
                      <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">Active</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3">
          
          {/* QR Code Workflow Button */}
          <button
            onClick={onOpenQrModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 hover:bg-indigo-500/20 text-xs font-medium transition"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Feedback QR</span>
          </button>

          {/* Candidate Portal View Button */}
          <button
            onClick={() => setActiveTab('candidate-portal')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
              activeTab === 'candidate-portal'
                ? 'bg-emerald-500 text-slate-950 font-semibold'
                : 'bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Candidate Portal</span>
          </button>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition relative"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-rose-500"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-4 z-50">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    <span className="font-semibold text-sm text-slate-100">Live AI Alerts</span>
                  </div>
                  <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-white">
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="mt-3 space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs">
                      <div className="flex items-center justify-between">
                        <span className={`font-semibold ${n.type === 'critical' ? 'text-rose-400' : 'text-amber-400'}`}>
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-slate-300 mt-1">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
            <div className="w-8 h-8 rounded-full bg-indigo-600/30 border border-indigo-500/40 flex items-center justify-center text-indigo-300 font-bold text-xs">
              HR
            </div>
            <div className="hidden xl:block text-left text-xs">
              <div className="font-semibold text-slate-200">Kavya Sharma</div>
              <div className="text-[10px] text-slate-400">Head of Talent Ops</div>
            </div>
          </div>

        </div>

      </div>
    </header>
  );
};
