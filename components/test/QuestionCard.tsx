import { Question } from '../../types/test';

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  selectedChoiceId?: string;
  onSelectChoice: (choiceId: string) => void;
}

export function QuestionCard({
  question,
  questionNumber,
  selectedChoiceId,
  onSelectChoice,
}: QuestionCardProps) {
  // Check if any choice has an image
  const hasImageChoices = question.choices.some(c => c.imageUrl);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
          Question {questionNumber}
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900">{question.text}</h3>

        {question.type === 'image' && question.imageUrl && (
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <img
              src={question.imageUrl}
              alt={`Question ${questionNumber} visual reference`}
              className="h-64 w-full object-cover"
            />
          </div>
        )}

        {hasImageChoices ? (
          // Grid layout for image-based choices
          <div className="grid grid-cols-2 gap-4 pt-2">
            {question.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onSelectChoice(choice.id)}
                className={`rounded-xl border-2 p-4 transition-all ${
                  selectedChoiceId === choice.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="space-y-3">
                  {choice.imageUrl && (
                    <div className="overflow-hidden rounded-lg border border-slate-200">
                      <img
                        src={choice.imageUrl}
                        alt={choice.text}
                        className="h-32 w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={`h-4 w-4 flex-shrink-0 rounded-full border-2 transition-all ${
                        selectedChoiceId === choice.id
                          ? 'border-blue-500 bg-blue-500'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {selectedChoiceId === choice.id && (
                        <div className="flex h-full items-center justify-center">
                          <div className="h-1.5 w-1.5 rounded-full bg-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm font-medium text-slate-900">{choice.text}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        ) : (
          // List layout for text-only choices
          <div className="space-y-3 pt-2">
            {question.choices.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onSelectChoice(choice.id)}
                className={`w-full rounded-xl border-2 p-4 text-left transition-all ${
                  selectedChoiceId === choice.id
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-blue-50/50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-0.5 h-5 w-5 flex-shrink-0 rounded-full border-2 transition-all ${
                      selectedChoiceId === choice.id
                        ? 'border-blue-500 bg-blue-500'
                        : 'border-slate-300 bg-white'
                    }`}
                  >
                    {selectedChoiceId === choice.id && (
                      <div className="flex h-full items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-white" />
                      </div>
                    )}
                  </div>
                  <p className="flex-1 text-base text-slate-900">{choice.text}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
