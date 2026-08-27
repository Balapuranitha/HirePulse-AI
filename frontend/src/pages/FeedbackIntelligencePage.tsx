import React, { useEffect, useState } from 'react';
import { MessageSquareText, Star, Mic, Sparkles, Filter, AlertTriangle, CheckCircle2, Bot, Play } from 'lucide-react';
import { api } from '../services/api';
import { Feedback } from '../types';

export const FeedbackIntelligencePage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [sentimentFilter, setSentimentFilter] = useState<string>('All');

  // Live analyzer states
  const [testText, setTestText] = useState('The interviewers were professional, but I waited almost 90 minutes before the technical round and did not receive any update.');
  const [testStage, setTestStage] = useState('Technical Round');
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);

  useEffect(() => {
    async function loadFeedbacks() {
      try {
        const res = await api.getFeedbacks(
          'DRIVE-2026-001',
          categoryFilter !== 'All' ? categoryFilter : undefined,
          sentimentFilter !== 'All' ? sentimentFilter : undefined
        );
        setFeedbacks(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadFeedbacks();
  }, [categoryFilter, sentimentFilter]);

  const handleRunLiveAnalysis = async () => {
    if (!testText.trim()) return;
    setAnalyzing(true);
    try {
      const res = await api.analyzeTextLive(testText, testStage);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <MessageSquareText className="w-6 h-6 text-indigo-400" />
            <span>AI Feedback Intelligence & NLP Service</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Automated sentiment classification, topic extraction, severity scoring, and root-cause action mapping.
          </p>
        </div>
      </div>

      {/* Live AI Analyzer Interactive Tool */}
      <div className="glass-card p-6 border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-950 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-400 animate-spin" />
          <h2 className="text-sm font-extrabold text-white">Live AI Feedback Analyzer Tool</h2>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300">
            Real-time Inference Engine
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-3">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Target Stage</label>
              <select
                value={testStage}
                onChange={(e) => setTestStage(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="Technical Round">Technical Round</option>
                <option value="HR Screening">HR Screening</option>
                <option value="Managerial Round">Managerial Round</option>
                <option value="Registration">Registration</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Candidate Feedback Response (Text or Voice Transcript)</label>
              <textarea
                rows={3}
                value={testText}
                onChange={(e) => setTestText(e.target.value)}
                placeholder="Type or paste candidate feedback..."
                className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              onClick={handleRunLiveAnalysis}
              disabled={analyzing}
              className="gradient-btn w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-indigo-500/20"
            >
              {analyzing ? (
                <span>Running AI NLP Engine...</span>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Analyze Feedback with AI</span>
                </>
              )}
            </button>
          </div>

          {/* AI Result Card */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between space-y-3">
            {analysisResult ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                  <span className="font-bold text-white">AI NLP Analysis Result</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    analysisResult.sentiment === 'Negative' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {analysisResult.sentiment} Sentiment
                  </span>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Extracted Topics</span>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(analysisResult.topics || []).map((t: string, i: number) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-semibold">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-slate-400 block text-[10px]">Detected Root Cause</span>
                  <p className="text-slate-200 mt-0.5 font-medium">{analysisResult.root_cause}</p>
                </div>

                <div className="bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-500/30">
                  <span className="font-bold text-indigo-300 block text-[10px]">AI Suggested HR Action</span>
                  <p className="text-slate-200 mt-0.5">{analysisResult.suggested_action}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center min-h-[160px] text-slate-500 text-center">
                <Bot className="w-8 h-8 text-slate-600 mb-2" />
                <p>Click "Analyze Feedback with AI" to view live sentiment, topic extraction, and root cause mapping.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-card p-4 flex flex-wrap items-center justify-between gap-4">
        <h3 className="font-bold text-white text-xs uppercase tracking-wider">Candidate Submissions ({feedbacks.length})</h3>

        <div className="flex items-center gap-3 text-xs">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
          >
            <option value="All">All Categories</option>
            <option value="Waiting Time">Waiting Time</option>
            <option value="HR Communication">HR Communication</option>
            <option value="Interview Process">Interview Process</option>
            <option value="Infrastructure">Infrastructure</option>
            <option value="Registration">Registration</option>
          </select>

          <select
            value={sentimentFilter}
            onChange={(e) => setSentimentFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-slate-200"
          >
            <option value="All">All Sentiments</option>
            <option value="Negative">Negative</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
          </select>
        </div>
      </div>

      {/* Feedback Submissions Cards Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {feedbacks.map((fb) => (
          <div key={fb.id} className="glass-card p-5 space-y-3 relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-xs">{fb.candidate_name}</span>
                <span className="text-[10px] text-slate-400">({fb.stage_name})</span>
              </div>

              <div className="flex items-center gap-1.5">
                {fb.is_voice && (
                  <span className="px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-bold flex items-center gap-1">
                    <Mic className="w-3 h-3" /> Voice
                  </span>
                )}
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  fb.sentiment === 'Negative' ? 'bg-rose-500/20 text-rose-300' :
                  fb.sentiment === 'Positive' ? 'bg-emerald-500/20 text-emerald-300' :
                  'bg-amber-500/20 text-amber-300'
                }`}>
                  {fb.sentiment}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < fb.rating ? 'fill-yellow-400' : 'text-slate-700'}`} />
              ))}
              <span className="text-xs font-bold text-slate-300 ml-2">{fb.issue_category}</span>
            </div>

            <p className="text-xs text-slate-200 italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">
              "{fb.feedback_text}"
            </p>

            {fb.voice_transcript && (
              <div className="bg-indigo-950/30 p-2.5 rounded-lg border border-indigo-500/20 text-[11px] text-indigo-200">
                <span className="font-bold block text-[10px] text-indigo-400 mb-0.5">Voice Transcript:</span>
                "{fb.voice_transcript}"
              </div>
            )}

            <div className="pt-2 border-t border-slate-800 text-[11px] space-y-1">
              <div><strong className="text-slate-400">Root Cause:</strong> <span className="text-slate-300">{fb.root_cause}</span></div>
              <div><strong className="text-indigo-400">Suggested Action:</strong> <span className="text-slate-200">{fb.suggested_action}</span></div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
