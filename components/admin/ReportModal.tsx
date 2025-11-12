import { TestResult } from '../../types/test';
import { mockQuestions } from '../../mocks/questions';

interface ReportModalProps {
  result: TestResult | null;
  onClose: () => void;
}

export function ReportModal({ result, onClose }: ReportModalProps) {
  if (!result) return null;

  const getStudentName = (studentId: string) => {
    const authStorage = localStorage.getItem('auth-storage');
    if (authStorage) {
      const parsed = JSON.parse(authStorage);
      if (parsed.state?.currentUser?.studentId === studentId) {
        return parsed.state.currentUser.fullName;
      }
    }
    return 'Unknown Student';
  };

  const duration = Math.round(
    (new Date(result.endTime).getTime() - new Date(result.startTime).getTime()) / 1000 / 60
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Detailed Test Report</h2>
              <p className="mt-1 text-blue-100">
                {getStudentName(result.studentId)} - {result.studentId}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full bg-white/20 p-2 text-white transition hover:bg-white/30"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="max-h-[calc(90vh-120px)] overflow-y-auto p-8">
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-600">Score</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">
                {result.score}/{result.answers.length}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-600">Percentage</p>
              <p className="mt-2 text-4xl font-bold text-slate-900">{result.percentage}%</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-sm font-medium text-slate-600">Status</p>
              <p
                className={`mt-2 text-2xl font-bold ${
                  result.passed ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {result.passed ? 'Passed' : 'Failed'}
              </p>
            </div>
          </div>

          <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Test Information</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Test Date</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {new Date(result.endTime).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Completion Time</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {new Date(result.endTime).toLocaleTimeString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Duration</p>
                <p className="mt-1 font-semibold text-slate-900">{duration} minutes</p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Questions Answered</p>
                <p className="mt-1 font-semibold text-slate-900">
                  {result.answers.length} questions
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-lg font-semibold text-slate-900">Question-by-Question Analysis</h3>
            <div className="space-y-4">
              {result.answers.map((answer, index) => {
                const question = mockQuestions.find((q) => q.id === answer.questionId);
                if (!question) return null;

                const isCorrect = answer.selectedChoiceId === question.correctAnswerId;
                const selectedChoice = question.choices.find((c) => c.id === answer.selectedChoiceId);
                const correctChoice = question.choices.find((c) => c.id === question.correctAnswerId);

                return (
                  <div
                    key={answer.questionId}
                    className={`rounded-2xl border-2 p-6 ${
                      isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
                          isCorrect ? 'bg-green-500' : 'bg-red-500'
                        }`}
                      >
                        {isCorrect ? (
                          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-slate-900">
                          Question {index + 1}: {question.text}
                        </p>
                        {question.type === 'image' && question.imageUrl && (
                          <img
                            src={question.imageUrl}
                            alt="Question"
                            className="mt-2 h-24 rounded-lg border border-slate-200 object-cover"
                          />
                        )}
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            <span className="font-medium text-slate-700">Student's Answer:</span>{' '}
                            <span className={isCorrect ? 'text-green-700' : 'text-red-700'}>
                              {selectedChoice?.text || 'Not answered'}
                            </span>
                          </p>
                          {!isCorrect && (
                            <p className="text-sm">
                              <span className="font-medium text-slate-700">Correct Answer:</span>{' '}
                              <span className="text-green-700">{correctChoice?.text}</span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-8 py-4">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Close Report
          </button>
        </div>
      </div>
    </div>
  );
}
