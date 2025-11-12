import { useState } from 'react';
import { Question, Choice } from '../../types/test';

interface AddQuestionFormProps {
  onAddQuestion: (question: Question) => void;
  onSearchImage: (query: string) => Promise<string>;
}

export function AddQuestionForm({ onAddQuestion, onSearchImage }: AddQuestionFormProps) {
  const [questionType, setQuestionType] = useState<'text' | 'image'>('text');
  const [questionText, setQuestionText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageSearchQuery, setImageSearchQuery] = useState('');
  const [isSearchingImage, setIsSearchingImage] = useState(false);
  const [choices, setChoices] = useState<Omit<Choice, 'id'>[]>([
    { text: '' },
    { text: '' },
    { text: '' },
    { text: '' },
  ]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(0);

  const handleSearchImage = async () => {
    if (!imageSearchQuery.trim()) return;
    
    setIsSearchingImage(true);
    try {
      const url = await onSearchImage(imageSearchQuery);
      setImageUrl(url);
    } catch (error) {
      alert('Failed to search image. Please try again.');
    } finally {
      setIsSearchingImage(false);
    }
  };

  const handleChoiceChange = (index: number, text: string) => {
    const updated = [...choices];
    updated[index] = { text };
    setChoices(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) {
      alert('Please enter a question text');
      return;
    }

    if (questionType === 'image' && !imageUrl.trim()) {
      alert('Please search and select an image');
      return;
    }

    if (choices.some((c) => !c.text.trim())) {
      alert('Please fill in all answer choices');
      return;
    }

    const questionId = `q${Date.now()}`;
    const choicesWithIds: Choice[] = choices.map((choice, index) => ({
      id: `${questionId}-${String.fromCharCode(97 + index)}`,
      text: choice.text,
    }));

    const newQuestion: Question = {
      id: questionId,
      type: questionType,
      text: questionText,
      imageUrl: questionType === 'image' ? imageUrl : undefined,
      choices: choicesWithIds,
      correctAnswerId: choicesWithIds[correctAnswerIndex].id,
    };

    onAddQuestion(newQuestion);

    // Reset form
    setQuestionText('');
    setImageUrl('');
    setImageSearchQuery('');
    setChoices([{ text: '' }, { text: '' }, { text: '' }, { text: '' }]);
    setCorrectAnswerIndex(0);
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-900">Add New Question</h2>

      <div className="space-y-4">
        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Question Type</label>
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => setQuestionType('text')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition ${
                questionType === 'text'
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'
              }`}
            >
              📝 Text Question
            </button>
            <button
              type="button"
              onClick={() => setQuestionType('image')}
              className={`flex-1 rounded-xl border-2 px-4 py-3 font-semibold transition ${
                questionType === 'image'
                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-purple-300'
              }`}
            >
              🖼️ Image Question
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="questionText" className="mb-2 block text-sm font-semibold text-slate-700">
            Question Text *
          </label>
          <textarea
            id="questionText"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            rows={3}
            placeholder="Enter your question here..."
            required
          />
        </div>

        {questionType === 'image' && (
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">Question Image *</label>
            <div className="space-y-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={imageSearchQuery}
                  onChange={(e) => setImageSearchQuery(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder="Search for images (e.g., 'mathematics', 'science')"
                />
                <button
                  type="button"
                  onClick={handleSearchImage}
                  disabled={isSearchingImage}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isSearchingImage ? 'Searching...' : 'Search'}
                </button>
              </div>
              {imageUrl && (
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <img src={imageUrl} alt="Selected" className="h-48 w-full object-cover" />
                </div>
              )}
            </div>
          </div>
        )}

        <div>
          <label className="mb-2 block text-sm font-semibold text-slate-700">Answer Choices *</label>
          <div className="space-y-3">
            {choices.map((choice, index) => (
              <div key={index} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={correctAnswerIndex === index}
                  onChange={() => setCorrectAnswerIndex(index)}
                  className="h-5 w-5 text-green-600"
                />
                <input
                  type="text"
                  value={choice.text}
                  onChange={(e) => handleChoiceChange(index, e.target.value)}
                  className="flex-1 rounded-xl border border-slate-300 px-4 py-3 text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  placeholder={`Choice ${String.fromCharCode(65 + index)}`}
                  required
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-slate-500">Select the radio button to mark the correct answer</p>
        </div>

        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-semibold text-white shadow-lg transition hover:from-blue-700 hover:to-purple-700"
        >
          Add Question
        </button>
      </div>
    </form>
  );
}
