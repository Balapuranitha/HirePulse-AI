import React, { useEffect, useState } from 'react';
import { Layers, Plus, Calendar, MapPin, Users, Briefcase, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../services/api';
import { Drive } from '../types';

interface DrivesPageProps {
  onSelectDrive: (drive: Drive) => void;
}

export const DrivesPage: React.FC<DrivesPageProps> = ({ onSelectDrive }) => {
  const [drives, setDrives] = useState<Drive[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('HirePulse Tech Solutions');
  const [date, setDate] = useState('2026-09-01');
  const [location, setLocation] = useState('Building B, Tech Park');
  const [jobRole, setJobRole] = useState('Frontend React Engineer');
  const [expectedCandidates, setExpectedCandidates] = useState(250);

  useEffect(() => {
    async function loadDrives() {
      try {
        const res = await api.getDrives();
        setDrives(res);
      } catch (err) {
        console.error(err);
      }
    }
    loadDrives();
  }, []);

  const handleCreateDrive = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newDrive = await api.createDrive({
        title,
        company,
        date,
        location,
        job_role: jobRole,
        expected_candidates: expectedCandidates,
        stages: ["Registration", "HR Screening", "Technical Round", "Managerial Round", "Final Decision"]
      });
      setDrives([...drives, newDrive]);
      setShowCreateModal(false);
      onSelectDrive(newDrive);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Title & Action */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
            <Layers className="w-6 h-6 text-indigo-400" />
            <span>Recruitment Drive Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, configure, and inspect high-volume walk-in hiring drives.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Create Walk-In Drive</span>
        </button>
      </div>

      {/* Drives Cards Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drives.map((drive) => (
          <div key={drive.id} className="glass-card-hover p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded">
                  {drive.id}
                </span>
                <span className="text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {drive.status}
                </span>
              </div>

              <h3 className="font-extrabold text-white text-base leading-snug">{drive.title}</h3>
              <p className="text-xs text-slate-400 font-medium mt-1">{drive.company}</p>

              <div className="mt-4 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-slate-500" />
                  <span>{drive.job_role}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-500" />
                  <span>{drive.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-slate-500" />
                  <span>{drive.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-slate-500" />
                  <span>Target: <strong>{drive.expected_candidates}</strong> candidates</span>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex flex-wrap gap-1">
                {(drive.stages || []).map((stage, i) => (
                  <span key={i} className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                    {stage}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => onSelectDrive(drive)}
              className="w-full py-2 bg-slate-800 hover:bg-indigo-600 text-slate-200 hover:text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <span>Inspect Drive Intelligence</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Create Drive Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="glass-card max-w-lg w-full p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">Create New Walk-In Drive</h2>
            <form onSubmit={handleCreateDrive} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Drive Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Software Engineer Walk-In 2026"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Company</label>
                  <input
                    type="text"
                    required
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Location / Venue</label>
                <input
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Target Job Role</label>
                  <input
                    type="text"
                    required
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Expected Candidates</label>
                  <input
                    type="number"
                    required
                    value={expectedCandidates}
                    onChange={(e) => setExpectedCandidates(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="gradient-btn px-4 py-2 rounded-lg font-bold text-white"
                >
                  Create & Initialize Drive
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
