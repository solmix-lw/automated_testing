import { Question } from '../../types/test';

interface QuestionListProps {
  questions: Question[];
  onDelete: (id: string) => void;
}

export function QuestionList({ questions, onDelete }: QuestionListProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-slate-900">Question Bank ({questions.length})</h2>
      <div className="space-y-3">
        {questions.map((question) => (
          <div
            key={question.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      question.type === 'image'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {question.type === 'image' ? '🖼️ Image' : '📝 Text'}
                  </span>
                  <span className="text-sm text-slate-500">ID: {question.id}</span>
                </div>

                <p className="text-lg font-semibold text-slate-900">{question.text}</p>

                {question.type === 'image' && question.imageUrl && (
                  <img
                    src={question.imageUrl}
                    alt="Question visual"
                    className="h-32 w-auto rounded-lg border border-slate-200 object-cover"
                  />
                )}

                <div className="space-y-2">
                  {question.choices.map((choice, index) => (
                    <div
                      key={choice.id}
                      className={`flex items-start gap-2 rounded-lg p-2 text-sm ${
                        choice.id === question.correctAnswerId
                          ? 'bg-green-50 font-medium text-green-800'
                          : 'text-slate-600'
                      }`}
                    >
                      <span className="flex-shrink-0">
                        {choice.id === question.correctAnswerId ? '✓' : String.fromCharCode(65 + index)}.
                      </span>
                      <span>{choice.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => onDelete(question.id)}
                className="rounded-lg bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-100"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
