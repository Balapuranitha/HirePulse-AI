import React, { useState } from 'react';
import { Smartphone, Star, Mic, Send, CheckCircle2, Clock, AlertCircle, Sparkles, RefreshCw } from 'lucide-react';
import { api } from '../services/api';

export const CandidatePortalPage: React.FC = () => {
  const [candidateId, setCandidateId] = useState('CAND-184');
  const [candidateName, setCandidateName] = useState('Ananya Verma');
  const [currentStage, setCurrentStage] = useState('Technical Round');
  const [queuePosition, setQueuePosition] = useState(4);
  const [estimatedWait, setEstimatedWait] = useState(25);

  // Feedback form state
  const [rating, setRating] = useState(4);
  const [issueCategory, setIssueCategory] = useState('Waiting Time');
  const [feedbackText, setFeedbackText] = useState('The HR team was polite, but I waited over 80 minutes outside the technical room.');
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<any>(null);

  const categories = [
    'Waiting Time',
    'Registration',
    'Interview Process',
    'Job Role Clarity',
    'HR Communication',
    'Infrastructure',
    'Interviewer Behavior',
    'Other'
  ];

  const handleVoiceRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    setIsRecording(true);

    // Try browser Web Speech API
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        
        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setVoiceTranscript(transcript);
          setFeedbackText(transcript);
          setIsRecording(false);
        };

        recognition.onerror = () => {
          // Fallback to sample transcribed text if mic fails or denied
          useDemoVoiceFallback();
        };

        recognition.start();
      } catch (err) {
        useDemoVoiceFallback();
      }
    } else {
      useDemoVoiceFallback();
    }
  };

  const useDemoVoiceFallback = () => {
    setTimeout(() => {
      const demoVoice = "I arrived at 9:30 AM and completed HR quickly, but then waited almost 85 minutes for the technical round without any status updates.";
      setVoiceTranscript(demoVoice);
      setFeedbackText(demoVoice);
      setIsRecording(false);
    }, 1200);
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.submitFeedback({
        drive_id: 'DRIVE-2026-001',
        candidate_id: candidateId,
        rating,
        issue_category: issueCategory,
        feedback_text: feedbackText,
        is_voice: !!voiceTranscript,
        voice_transcript: voiceTranscript || undefined
      });
      setAiAnalysis(res);
      setSubmitted(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto py-6 px-4 space-y-6">
      
      {/* Mobile Header Card */}
      <div className="glass-card p-5 border-indigo-500/30 text-center space-y-2 relative">
        <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2.5 py-0.5 rounded-full">
          Candidate Self-Service Portal
        </span>
        <h1 className="text-xl font-extrabold text-white">{candidateName}</h1>
        <p className="text-xs text-slate-400 font-mono">ID: {candidateId} • Drive: Software Engineer Walk-In</p>

        {/* Queue Status Box */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-xs mt-3">
          <div>
            <span className="text-slate-400 block text-[10px]">Queue Position</span>
            <strong className="text-lg font-black text-indigo-400">#{queuePosition} in line</strong>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Estimated Wait</span>
            <strong className="text-lg font-black text-amber-400">~{estimatedWait} mins</strong>
          </div>
        </div>
      </div>

      {/* Live Stage Tracker */}
      <div className="glass-card p-5 space-y-3">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">Live Stage Progress Tracker</h2>

        <div className="space-y-2 text-xs">
          {[
            { stage: 'Registration', status: 'Completed' },
            { stage: 'HR Screening', status: 'Completed' },
            { stage: 'Technical Round', status: 'Current' },
            { stage: 'Managerial Round', status: 'Upcoming' },
            { stage: 'Final Decision', status: 'Upcoming' },
          ].map((st, i) => (
            <div
              key={i}
              className={`p-2.5 rounded-lg flex items-center justify-between font-medium ${
                st.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20' :
                st.status === 'Current' ? 'bg-indigo-600 text-white font-bold shadow-lg shadow-indigo-600/30' :
                'bg-slate-950 text-slate-500 border border-slate-800'
              }`}
            >
              <div className="flex items-center gap-2">
                {st.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock className="w-4 h-4" />}
                <span>{st.stage}</span>
              </div>
              <span className="text-[10px] uppercase font-bold">{st.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Feedback Form */}
      <div className="glass-card p-5 space-y-4">
        <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-300">How is your experience so far?</h2>

        {submitted && aiAnalysis ? (
          <div className="bg-emerald-950/40 p-4 rounded-xl border border-emerald-500/40 space-y-2 text-xs">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <CheckCircle2 className="w-5 h-5" />
              <span>Feedback Submitted Successfully!</span>
            </div>
            <p className="text-slate-300">Thank you for sharing your experience. AI has processed your feedback:</p>
            <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
              <div><strong className="text-slate-400">Sentiment:</strong> <span className="text-indigo-300 font-bold">{aiAnalysis.sentiment}</span></div>
              <div><strong className="text-slate-400">Category:</strong> <span className="text-slate-200">{aiAnalysis.issue_category}</span></div>
              <div><strong className="text-slate-400">AI Action Triggered:</strong> <span className="text-emerald-300">{aiAnalysis.suggested_action}</span></div>
            </div>
            <button
              onClick={() => setSubmitted(false)}
              className="w-full py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
            >
              Submit Another Response
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmitFeedback} className="space-y-4 text-xs">
            
            {/* 1-5 Rating Stars */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Rating (1 to 5 Stars)</label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-yellow-400 hover:scale-110 transition"
                  >
                    <Star className={`w-7 h-7 ${star <= rating ? 'fill-yellow-400' : 'text-slate-700'}`} />
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Issue Category Chips */}
            <div>
              <label className="block text-slate-400 mb-1.5 font-medium">Topic / Issue Category</label>
              <div className="flex flex-wrap gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setIssueCategory(cat)}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition ${
                      issueCategory === cat
                        ? 'bg-indigo-600 text-white'
                        : 'bg-slate-950 text-slate-400 hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Voice Feedback Recorder Button */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Voice Feedback (Optional)</label>
              <button
                type="button"
                onClick={handleVoiceRecord}
                className={`w-full py-2.5 px-3 rounded-xl border flex items-center justify-center gap-2 font-bold transition ${
                  isRecording
                    ? 'bg-rose-500/20 text-rose-300 border-rose-500 animate-pulse'
                    : voiceTranscript
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                    : 'bg-indigo-950/40 text-indigo-300 border-indigo-500/30 hover:bg-indigo-900/40'
                }`}
              >
                <Mic className="w-4 h-4" />
                <span>
                  {isRecording ? 'Listening... (Speak Now)' : voiceTranscript ? 'Voice Captured ✓ (Tap to Re-record)' : 'Record Voice Feedback'}
                </span>
              </button>
            </div>

            {/* Text Response Box */}
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Text Feedback</label>
              <textarea
                rows={3}
                required
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                placeholder="Share your thoughts about queue time, interviewers, venue..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="gradient-btn w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-indigo-500/20"
            >
              <Send className="w-4 h-4" />
              <span>Submit Experience Feedback</span>
            </button>
          </form>
        )}

      </div>

    </div>
  );
};
