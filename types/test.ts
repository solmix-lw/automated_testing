export interface Choice {
  id: string;
  text: string;
  imageUrl?: string;
}

export interface Question {
  id: string;
  type: 'text' | 'image';
  text: string;
  imageUrl?: string;
  choices: Choice[];
  correctAnswerId: string;
}

export interface Test {
  id: string;
  title: string;
  totalQuestions: number;
  passingScore: number;
  timeLimit: number; // in minutes
  questions: Question[];
}

export interface StudentAnswer {
  questionId: string;
  selectedChoiceId: string;
}

export interface TestResult {
  testId: string;
  studentId: string;
  answers: StudentAnswer[];
  score: number;
  percentage: number;
  passed: boolean;
  startTime: Date;
  endTime: Date;
}

export interface Student {
  id: string;
  studentId: string; // auto-generated ID
  fullName: string;
  email: string;
  phone: string;
  telegramId?: string;
  username: string;
}
