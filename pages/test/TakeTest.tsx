import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockTest } from '../../mocks/questions';
import { StudentAnswer, TestResult } from '../../types/test';
import { QuestionCard } from '../../components/test/QuestionCard';
import { TestTimer } from '../../components/test/TestTimer';
import { ProgressBar } from '../../components/test/ProgressBar';
import { ResultSummary } from '../../components/test/ResultSummary';
import { useAuthStore } from '../../store/authStore';
import { useResultsStore } from '../../store/resultsStore';

type TestState = 'instructions' | 'taking' | 'completed';

export function TakeTest() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);

  // Redirect to registration if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      alert('Please register first to take the test');
      navigate('/register');
    }
  }, [isAuthenticated, navigate]);

  const [testState, setTestState] = useState<TestState>('instructions');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<StudentAnswer[]>([]);
  const [startTime] = useState(new Date());

  const currentQuestion = mockTest.questions[currentQuestionIndex];
  const totalQuestions = mockTest.questions.length;

  const handleStartTest = () => {
    setTestState('taking');
    setAnswers([]);
    setCurrentQuestionIndex(0);
  };

  const handleSelectChoice = (choiceId: string) => {
    setAnswers((prev) => {
      const existingAnswerIndex = prev.findIndex((a) => a.questionId === currentQuestion.id);
      if (existingAnswerIndex >= 0) {
        const updated = [...prev];
        updated[existingAnswerIndex] = { questionId: currentQuestion.id, selectedChoiceId: choiceId };
        return updated;
      }
      return [...prev, { questionId: currentQuestion.id, selectedChoiceId: choiceId }];
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const addResult = useResultsStore((state) => state.addResult);

  const handleSubmit = () => {
    // Calculate score
    const correctAnswers = answers.filter((answer) => {
      const question = mockTest.questions.find((q) => q.id === answer.questionId);
      return question?.correctAnswerId === answer.selectedChoiceId;
    }).length;

    const percentage = Math.round((correctAnswers / mockTest.totalQuestions) * 100);
    const passed = percentage >= mockTest.passingScore;

    // Save result
    if (currentUser) {
      const testResult: TestResult = {
        testId: mockTest.id,
        studentId: currentUser.studentId,
        answers,
        score: correctAnswers,
        percentage,
        passed,
        startTime,
        endTime: new Date(),
      };
      addResult(testResult);
    }

    setTestState('completed');
  };

  const handleTimeUp = useCallback(() => {
    setTestState('completed');
  }, []);

  const handleRetry = () => {
    setTestState('instructions');
    setCurrentQuestionIndex(0);
    setAnswers([]);
  };

  const currentAnswer = answers.find((a) => a.questionId === currentQuestion?.id);

  if (testState === 'instructions') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-white">{mockTest.title}</h1>
                  {currentUser && (
                    <p className="mt-1 text-blue-100">
                      Student: {currentUser.fullName} ({currentUser.studentId})
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6 p-8">
              <div>
                <h2 className="mb-4 text-xl font-bold text-slate-900">Test Instructions</h2>
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>You have {mockTest.timeLimit} minutes to complete this test</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Total questions: {mockTest.totalQuestions}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Passing score: {mockTest.passingScore}%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>You can navigate between questions using Next and Previous buttons</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Click Submit to finish the test before time runs out</span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border-2 border-yellow-200 bg-yellow-50 p-4">
                <div className="flex items-start gap-3">
                  <svg className="mt-1 h-6 w-6 flex-shrink-0 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div className="text-sm text-yellow-800">
                    <p className="font-semibold">Important:</p>
                    <p>Once you start the test, the timer will begin. Make sure you are ready before proceeding.</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleStartTest}
                className="w-full rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Start Test
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (testState === 'completed') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12">
        <ResultSummary
          questions={mockTest.questions}
          answers={answers}
          passingScore={mockTest.passingScore}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 px-6 py-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-900">{mockTest.title}</h1>
            <TestTimer timeLimit={mockTest.timeLimit} onTimeUp={handleTimeUp} />
          </div>
          <ProgressBar current={currentQuestionIndex + 1} total={totalQuestions} />
        </div>

        <QuestionCard
          question={currentQuestion}
          questionNumber={currentQuestionIndex + 1}
          selectedChoiceId={currentAnswer?.selectedChoiceId}
          onSelectChoice={handleSelectChoice}
        />

        <div className="flex items-center justify-between gap-4">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className="rounded-full border-2 border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-slate-300 disabled:hover:bg-white"
          >
            ← Previous
          </button>

          <div className="text-center text-sm text-slate-600">
            {answers.length} of {totalQuestions} answered
          </div>

          {currentQuestionIndex === totalQuestions - 1 ? (
            <button
              onClick={handleSubmit}
              className="rounded-full bg-gradient-to-r from-green-600 to-emerald-600 px-8 py-3 font-semibold text-white shadow-lg transition hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Submit Test
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Next →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

