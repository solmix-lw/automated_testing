import { TestResult } from '../../types/test';
import { useAuthStore } from '../../store/authStore';

interface ResultsTableProps {
  results: TestResult[];
  onViewDetails: (result: TestResult) => void;
}

export function ResultsTable({ results, onViewDetails }: ResultsTableProps) {
  // Get student details from localStorage (in production, this would come from backend)
  const getStudentName = (studentId: string) => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed.state?.currentUser?.studentId === studentId) {
        return parsed.state.currentUser.fullName;
      }
    }
    return studentId;
  };

  if (results.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">
        <svg className="mx-auto h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
        <h3 className="mt-4 text-lg font-semibold text-slate-900">No test results yet</h3>
        <p className="mt-2 text-slate-600">Student test results will appear here once tests are completed.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Student Name</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Student ID</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Date</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Score</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Percentage</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Status</th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {results.map((result, index) => {
              const duration = Math.round(
                (new Date(result.endTime).getTime() - new Date(result.startTime).getTime()) / 1000 / 60
              );

              return (
                <tr key={index} className="transition hover:bg-slate-50">
                  <td className="px-6 py-4 text-sm text-slate-900">{getStudentName(result.studentId)}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">{result.studentId}</td>
                  <td className="px-6 py-4 text-sm text-slate-600">
                    {new Date(result.endTime).toLocaleDateString()} <br />
                    <span className="text-xs text-slate-500">
                      {new Date(result.endTime).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {result.score} / {result.answers.length}
                  </td>
                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">{result.percentage}%</td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                        result.passed
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {result.passed ? '✓ Passed' : '✗ Failed'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => onViewDetails(result)}
                      className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:bg-blue-100"
                    >
                      View Report
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
