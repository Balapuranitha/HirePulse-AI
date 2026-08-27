import React, { useState, useEffect } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { DemoBanner } from './components/layout/DemoBanner';

import { LandingPage } from './pages/LandingPage';
import { OverviewPage } from './pages/OverviewPage';
import { DrivesPage } from './pages/DrivesPage';
import { CandidatesPage } from './pages/CandidatesPage';
import { JourneyAnalyticsPage } from './pages/JourneyAnalyticsPage';
import { FrictionScorePage } from './pages/FrictionScorePage';
import { FeedbackIntelligencePage } from './pages/FeedbackIntelligencePage';
import { DropoutPredictionPage } from './pages/DropoutPredictionPage';
import { RootCausePage } from './pages/RootCausePage';
import { RecommendationsPage } from './pages/RecommendationsPage';
import { SimulationsPage } from './pages/SimulationsPage';
import { BusinessImpactPage } from './pages/BusinessImpactPage';
import { ReportsPage } from './pages/ReportsPage';
import { CandidatePortalPage } from './pages/CandidatePortalPage';
import { QrFeedbackPage } from './pages/QrFeedbackPage';

import { api } from './services/api';
import { Drive } from './types';
import { X } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [drives, setDrives] = useState<Drive[]>([]);
  const [currentDrive, setCurrentDrive] = useState<Drive | null>(null);
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    async function init() {
      try {
        const driveList = await api.getDrives();
        setDrives(driveList);
        if (driveList.length > 0) {
          setCurrentDrive(driveList[0]);
        }
      } catch (err) {
        console.error('API connection error:', err);
      }
    }
    init();
  }, []);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectDrive = (drive: Drive) => {
    setCurrentDrive(drive);
    triggerToast(`Switched drive to ${drive.title}`);
  };

  const handleLoadDemoDrive = () => {
    triggerToast('Demo dataset reloaded (300 candidates).');
    setActiveTab('overview');
  };

  const handleGenerateAiInsights = () => {
    triggerToast('AI Engine generated 3 critical recommendations.');
    setActiveTab('recommendations');
  };

  const handleSimulateOptimization = () => {
    triggerToast('Simulator loaded with baseline parameters.');
    setActiveTab('simulations');
  };

  const handleGenerateSampleFeedback = () => {
    triggerToast('Sample feedback loaded in Feedback Intelligence.');
    setActiveTab('feedback');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-indigo-600 text-white px-4 py-3 rounded-xl shadow-2xl font-bold text-xs flex items-center gap-2 animate-bounce">
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar
        currentDrive={currentDrive}
        drives={drives}
        onSelectDrive={handleSelectDrive}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenQrModal={() => setShowQrModal(true)}
      />

      {/* Demo Controls Header Banner (Shown when not on Landing page) */}
      {activeTab !== 'landing' && activeTab !== 'candidate-portal' && (
        <DemoBanner
          onLoadDemoDrive={handleLoadDemoDrive}
          onGenerateAiInsights={handleGenerateAiInsights}
          onSimulateOptimization={handleSimulateOptimization}
          onGenerateSampleFeedback={handleGenerateSampleFeedback}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* Render Sidebar only in HR Admin views */}
        {activeTab !== 'landing' && activeTab !== 'candidate-portal' && activeTab !== 'qr-feedback' && (
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        )}

        {/* Tab Route Content */}
        <main className={`flex-1 p-4 lg:p-8 overflow-y-auto ${activeTab === 'landing' || activeTab === 'candidate-portal' ? 'p-0 lg:p-0' : ''}`}>
          {activeTab === 'landing' && (
            <LandingPage
              onLaunchDemo={() => setActiveTab('overview')}
              onViewDashboard={() => setActiveTab('overview')}
            />
          )}

          {activeTab === 'overview' && <OverviewPage onNavigate={setActiveTab} />}
          {activeTab === 'drives' && <DrivesPage onSelectDrive={handleSelectDrive} />}
          {activeTab === 'candidates' && <CandidatesPage />}
          {activeTab === 'journey' && <JourneyAnalyticsPage />}
          {activeTab === 'friction' && <FrictionScorePage />}
          {activeTab === 'feedback' && <FeedbackIntelligencePage />}
          {activeTab === 'dropout' && <DropoutPredictionPage />}
          {activeTab === 'root-cause' && <RootCausePage />}
          {activeTab === 'recommendations' && <RecommendationsPage onNavigate={setActiveTab} />}
          {activeTab === 'simulations' && <SimulationsPage />}
          {activeTab === 'impact' && <BusinessImpactPage />}
          {activeTab === 'reports' && <ReportsPage />}

          {activeTab === 'candidate-portal' && <CandidatePortalPage />}
          {activeTab === 'qr-feedback' && (
            <QrFeedbackPage
              driveId={currentDrive?.id}
              onOpenCandidatePortal={() => setActiveTab('candidate-portal')}
            />
          )}
        </main>

      </div>

      {/* QR Feedback Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowQrModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
            <QrFeedbackPage
              driveId={currentDrive?.id}
              onOpenCandidatePortal={() => {
                setShowQrModal(false);
                setActiveTab('candidate-portal');
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default App;
