import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Question, TestResult } from '../../types/test';
import { mockQuestions } from '../../mocks/questions';
import { QuestionList } from '../../components/admin/QuestionList';
import { AddQuestionForm } from '../../components/admin/AddQuestionForm';
import { ResultsTable } from '../../components/admin/ResultsTable';
import { ReportModal } from '../../components/admin/ReportModal';
import { TestSettings } from '../../components/admin/TestSettings';
import { useResultsStore } from '../../store/resultsStore';

export function Admin() {
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [activeTab, setActiveTab] = useState<'list' | 'add' | 'results' | 'settings'>('results');
  const [selectedResult, setSelectedResult] = useState<TestResult | null>(null);
  
  const results = useResultsStore((state) => state.getAllResults());

  const handleAddQuestion = (question: Question) => {
    setQuestions([...questions, question]);
    setActiveTab('list');
    alert('Question added successfully!');
  };

  const handleDeleteQuestion = (id: string) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleSearchImage = async (query: string): Promise<string> => {
    // This is a mock implementation
    // In production, this would integrate with Unsplash API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Return a placeholder Unsplash image based on the query
        resolve(`https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400`);
      }, 1000);
    });
  };

  const handleViewDetails = (result: TestResult) => {
    setSelectedResult(result);
  };

  const handleCloseModal = () => {
    setSelectedResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-slate-600 hover:text-slate-900">
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </Link>
              <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">
                Total Questions: <span className="font-semibold text-slate-900">{questions.length}</span>
              </span>
              <span className="text-sm text-slate-600">
                Total Results: <span className="font-semibold text-slate-900">{results.length}</span>
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="mb-6 flex gap-4 overflow-x-auto">
          <button
            onClick={() => setActiveTab('results')}
            className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition ${
              activeTab === 'results'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            📊 Student Results
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition ${
              activeTab === 'settings'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            ⚙️ Test Settings
          </button>
          <button
            onClick={() => setActiveTab('list')}
            className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition ${
              activeTab === 'list'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            📋 Question List
          </button>
          <button
            onClick={() => setActiveTab('add')}
            className={`whitespace-nowrap rounded-xl px-6 py-3 font-semibold transition ${
              activeTab === 'add'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-white text-slate-600 hover:bg-slate-50'
            }`}
          >
            ➕ Add Question
          </button>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white/50 p-6 backdrop-blur-sm">
          {activeTab === 'results' && (
            <div>
              <h2 className="mb-6 text-2xl font-bold text-slate-900">Student Test Results</h2>
              <ResultsTable results={results} onViewDetails={handleViewDetails} />
            </div>
          )}
          {activeTab === 'settings' && <TestSettings />}
          {activeTab === 'list' && <QuestionList questions={questions} onDelete={handleDeleteQuestion} />}
          {activeTab === 'add' && (
            <AddQuestionForm onAddQuestion={handleAddQuestion} onSearchImage={handleSearchImage} />
          )}
        </div>

        {activeTab !== 'results' && (
          <div className="mt-8 rounded-2xl border border-blue-200 bg-blue-50 p-6">
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900">Note: Mock Data Storage</h3>
                <p className="mt-1 text-sm text-blue-800">
                  Questions and settings are currently stored in memory/localStorage. Enable Youware Backend to persist
                  data to PostgreSQL database and add features like Excel import, advanced analytics, and user management.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ReportModal result={selectedResult} onClose={handleCloseModal} />
    </div>
  );
}
