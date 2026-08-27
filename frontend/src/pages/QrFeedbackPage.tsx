import React from 'react';
import { QrCode, ExternalLink, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';

interface QrFeedbackPageProps {
  driveId?: string;
  onOpenCandidatePortal: () => void;
}

export const QrFeedbackPage: React.FC<QrFeedbackPageProps> = ({
  driveId = 'DRIVE-2026-001',
  onOpenCandidatePortal,
}) => {
  return (
    <div className="max-w-md mx-auto py-8 px-4 text-center space-y-6">
      
      <div className="glass-card p-6 border-indigo-500/40 space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-bold border border-indigo-500/30">
          <QrCode className="w-3.5 h-3.5" />
          <span>Walk-In Drive Feedback Link</span>
        </div>

        <h1 className="text-xl font-extrabold text-white">Scan to Give Feedback</h1>
        <p className="text-xs text-slate-400">
          Scan the QR code below on your smartphone or click the button to submit instant walk-in journey feedback.
        </p>

        {/* Demo SVG QR Code Graphic */}
        <div className="bg-white p-6 rounded-2xl inline-block shadow-2xl mx-auto border-4 border-indigo-500/30">
          <svg className="w-48 h-48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="100" height="100" fill="white"/>
            {/* Standard QR Code positioning squares */}
            <rect x="10" y="10" width="25" height="25" fill="#0F172A"/>
            <rect x="15" y="15" width="15" height="15" fill="white"/>
            <rect x="18" y="18" width="9" height="9" fill="#4F46E5"/>

            <rect x="65" y="10" width="25" height="25" fill="#0F172A"/>
            <rect x="70" y="15" width="15" height="15" fill="white"/>
            <rect x="73" y="18" width="9" height="9" fill="#4F46E5"/>

            <rect x="10" y="65" width="25" height="25" fill="#0F172A"/>
            <rect x="15" y="70" width="15" height="15" fill="white"/>
            <rect x="18" y="73" width="9" height="9" fill="#4F46E5"/>

            {/* Pattern data blocks */}
            <rect x="40" y="10" width="8" height="8" fill="#0F172A"/>
            <rect x="52" y="15" width="8" height="8" fill="#4F46E5"/>
            <rect x="40" y="30" width="12" height="8" fill="#0F172A"/>
            <rect x="10" y="42" width="15" height="8" fill="#4F46E5"/>
            <rect x="30" y="45" width="8" height="15" fill="#0F172A"/>
            <rect x="45" y="42" width="15" height="15" fill="#4F46E5"/>
            <rect x="65" y="40" width="10" height="10" fill="#0F172A"/>
            <rect x="80" y="45" width="10" height="10" fill="#4F46E5"/>
            <rect x="40" y="65" width="8" height="25" fill="#0F172A"/>
            <rect x="55" y="75" width="15" height="15" fill="#4F46E5"/>
            <rect x="75" y="65" width="15" height="10" fill="#0F172A"/>
          </svg>
        </div>

        <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs font-mono text-indigo-300">
          /feedback/drive/{driveId}
        </div>

        <button
          onClick={onOpenCandidatePortal}
          className="gradient-btn w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-indigo-500/20"
        >
          <ExternalLink className="w-4 h-4" />
          <span>Open Candidate Feedback Form</span>
        </button>
      </div>

    </div>
  );
};
