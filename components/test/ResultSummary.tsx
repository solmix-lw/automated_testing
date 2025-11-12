import { Question, StudentAnswer } from '../../types/test';

interface ResultSummaryProps {
  questions: Question[];
  answers: StudentAnswer[];
  passingScore: number;
  onRetry: () => void;
}

export function ResultSummary({ questions, answers, passingScore, onRetry }: ResultSummaryProps) {
  const correctAnswers = answers.filter((answer) => {
    const question = questions.find((q) => q.id === answer.questionId);
    return question?.correctAnswerId === answer.selectedChoiceId;
  }).length;

  const totalQuestions = questions.length;
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = percentage >= passingScore;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div
        className={`rounded-3xl border-2 p-8 text-center ${
          passed
            ? 'border-green-200 bg-gradient-to-br from-green-50 to-emerald-50'
            : 'border-red-200 bg-gradient-to-br from-red-50 to-orange-50'
        }`}
      >
        <div
          className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full ${
            passed ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {passed ? (
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <h2 className="mb-2 text-3xl font-bold text-slate-900">
          {passed ? 'Congratulations!' : 'Keep Trying!'}
        </h2>
        <p className="text-lg text-slate-700">
          {passed
            ? 'You have successfully passed the test.'
            : 'You did not meet the passing score this time.'}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">Your Score</p>
          <p className="mt-2 text-4xl font-bold text-slate-900">{percentage}%</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">Correct Answers</p>
          <p className="mt-2 text-4xl font-bold text-green-600">
            {correctAnswers}/{totalQuestions}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-600">Passing Score</p>
          <p className="mt-2 text-4xl font-bold text-blue-600">{passingScore}%</p>
        </div>
      </div>

      <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-xl font-bold text-slate-900">Answer Review</h3>
        <div className="space-y-3">
          {questions.map((question, index) => {
            const answer = answers.find((a) => a.questionId === question.id);
            const isCorrect = answer?.selectedChoiceId === question.correctAnswerId;
            const selectedChoice = question.choices.find((c) => c.id === answer?.selectedChoiceId);
            const correctChoice = question.choices.find((c) => c.id === question.correctAnswerId);

            return (
              <div
                key={question.id}
                className={`rounded-xl border-2 p-4 ${
                  isCorrect ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${
                      isCorrect ? 'bg-green-500' : 'bg-red-500'
                    }`}
                  >
                    {isCorrect ? (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <svg className="h-4 w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">
                      Question {index + 1}: {question.text}
                    </p>
                    <p className="mt-1 text-sm text-slate-600">
                      Your answer: <span className="font-medium">{selectedChoice?.text || 'Not answered'}</span>
                    </p>
                    {!isCorrect && (
                      <p className="mt-1 text-sm text-green-700">
                        Correct answer: <span className="font-medium">{correctChoice?.text}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={onRetry}
          className="rounded-full bg-blue-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Take Another Test
        </button>
      </div>
    </div>
  );
}
