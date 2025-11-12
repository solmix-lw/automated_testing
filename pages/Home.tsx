import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="mb-4 text-5xl font-bold text-slate-900">Automated Testing System</h1>
          <p className="text-xl text-slate-600">
            Take your tests online with instant results and comprehensive feedback
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <Link
            to="/register"
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition hover:shadow-2xl"
          >
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 transition group-hover:text-blue-600">
              Take Test
            </h2>
            <p className="text-slate-600">
              Register and start your test. Answer questions, track your time, and get instant results with detailed feedback.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 font-semibold text-blue-600">
              Register & Begin
              <svg className="h-5 w-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            to="/admin"
            className="group overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-lg transition hover:shadow-2xl"
          >
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h2 className="mb-3 text-2xl font-bold text-slate-900 transition group-hover:text-green-600">
              Admin Dashboard
            </h2>
            <p className="text-slate-600">
              Manage questions, view student results, generate reports, and track performance statistics.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 font-semibold text-green-600">
              Manage System
              <svg className="h-5 w-5 transition group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>

        <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg">
          <h2 className="mb-6 text-2xl font-bold text-slate-900">How It Works</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                1
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Start Your Test</h3>
                <p className="text-sm text-slate-600">
                  Read the instructions and begin when ready. Timer starts automatically.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                2
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Answer Questions</h3>
                <p className="text-sm text-slate-600">
                  Navigate through questions, select answers, and track your progress.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
                3
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-slate-900">Get Results</h3>
                <p className="text-sm text-slate-600">
                  Submit and receive instant results with detailed answer review.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-3xl border border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 p-8 text-center">
          <h2 className="mb-3 text-2xl font-bold text-slate-900">Features</h2>
          <div className="grid gap-4 text-left md:grid-cols-2">
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-slate-900">Timed Tests</p>
                <p className="text-sm text-slate-600">Real-time countdown timer with warnings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-slate-900">Instant Grading</p>
                <p className="text-sm text-slate-600">Automatic scoring and pass/fail status</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-slate-900">Detailed Review</p>
                <p className="text-sm text-slate-600">See correct answers and explanations</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <svg className="mt-1 h-6 w-6 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <p className="font-semibold text-slate-900">Progress Tracking</p>
                <p className="text-sm text-slate-600">Visual progress bar and question counter</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
