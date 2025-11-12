import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { TestResult } from '../types/test';

interface TestSettings {
  totalQuestions: number;
  passingScore: number;
  timeLimit: number;
}

interface ResultsState {
  results: TestResult[];
  settings: TestSettings;
  addResult: (result: TestResult) => void;
  updateSettings: (settings: Partial<TestSettings>) => void;
  getAllResults: () => TestResult[];
}

export const useResultsStore = create<ResultsState>()(
  persist(
    (set, get) => ({
      results: [],
      settings: {
        totalQuestions: 11,
        passingScore: 60,
        timeLimit: 15,
      },
      addResult: (result) =>
        set((state) => ({
          results: [...state.results, result],
        })),
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      getAllResults: () => get().results,
    }),
    {
      name: 'test-results-storage',
    }
  )
);
