import { useState } from 'react';
import { useResultsStore } from '../../store/resultsStore';

export function TestSettings() {
  const settings = useResultsStore((state) => state.settings);
  const updateSettings = useResultsStore((state) => state.updateSettings);

  const [formData, setFormData] = useState(settings);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    updateSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Test Settings</h2>

      <div className="space-y-6">
        <div>
          <label htmlFor="totalQuestions" className="mb-2 block text-sm font-semibold text-slate-700">
            Number of Questions
          </label>
          <input
            id="totalQuestions"
            type="number"
            min="1"
            max="100"
            value={formData.totalQuestions}
            onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) || 1 })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <p className="mt-1 text-xs text-slate-500">Total questions in the test (currently have 11 questions)</p>
        </div>

        <div>
          <label htmlFor="passingScore" className="mb-2 block text-sm font-semibold text-slate-700">
            Passing Score (%)
          </label>
          <input
            id="passingScore"
            type="number"
            min="0"
            max="100"
            value={formData.passingScore}
            onChange={(e) => setFormData({ ...formData, passingScore: parseInt(e.target.value) || 0 })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <p className="mt-1 text-xs text-slate-500">Minimum percentage required to pass</p>
        </div>

        <div>
          <label htmlFor="timeLimit" className="mb-2 block text-sm font-semibold text-slate-700">
            Time Limit (minutes)
          </label>
          <input
            id="timeLimit"
            type="number"
            min="1"
            max="180"
            value={formData.timeLimit}
            onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) || 1 })}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          <p className="mt-1 text-xs text-slate-500">Maximum time allowed for the test</p>
        </div>

        <div className="rounded-xl border-2 border-blue-200 bg-blue-50 p-4">
          <div className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            <p className="text-sm text-blue-800">
              These settings will apply to new tests. Existing test results will retain their original settings.
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleSave}
            className="flex-1 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700"
          >
            {isSaved ? 'Saved ✓' : 'Save Settings'}
          </button>
        </div>
      </div>
    </div>
  );
}
