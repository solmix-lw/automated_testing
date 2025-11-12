import { Question, Test } from '../types/test';

export const mockQuestions: Question[] = [
  {
    id: 'q1',
    type: 'text',
    text: 'What does HTML stand for?',
    choices: [
      { id: 'q1-a', text: 'Hyper Text Markup Language' },
      { id: 'q1-b', text: 'High Tech Modern Language' },
      { id: 'q1-c', text: 'Home Tool Markup Language' },
      { id: 'q1-d', text: 'Hyperlinks and Text Markup Language' },
    ],
    correctAnswerId: 'q1-a',
  },
  {
    id: 'q2',
    type: 'text',
    text: 'Which programming language is known as the "language of the web"?',
    choices: [
      { id: 'q2-a', text: 'Python' },
      { id: 'q2-b', text: 'JavaScript' },
      { id: 'q2-c', text: 'Java' },
      { id: 'q2-d', text: 'C++' },
    ],
    correctAnswerId: 'q2-b',
  },
  {
    id: 'q3',
    type: 'image',
    text: 'What does this code snippet demonstrate?',
    imageUrl: 'https://images.unsplash.com/photo-1624953587687-daf255b6b80a?w=400',
    choices: [
      { id: 'q3-a', text: 'Web Development' },
      { id: 'q3-b', text: 'Database Design' },
      { id: 'q3-c', text: 'Mobile App Development' },
      { id: 'q3-d', text: 'Game Development' },
    ],
    correctAnswerId: 'q3-a',
  },
  {
    id: 'q4',
    type: 'text',
    text: 'What is the purpose of CSS?',
    choices: [
      { id: 'q4-a', text: 'To structure web pages' },
      { id: 'q4-b', text: 'To style web pages' },
      { id: 'q4-c', text: 'To add interactivity' },
      { id: 'q4-d', text: 'To manage databases' },
    ],
    correctAnswerId: 'q4-b',
  },
  {
    id: 'q5',
    type: 'text',
    text: 'Which of the following is a JavaScript framework?',
    choices: [
      { id: 'q5-a', text: 'Django' },
      { id: 'q5-b', text: 'Flask' },
      { id: 'q5-c', text: 'React' },
      { id: 'q5-d', text: 'Laravel' },
    ],
    correctAnswerId: 'q5-c',
  },
  {
    id: 'q6',
    type: 'text',
    text: 'What does SQL stand for?',
    choices: [
      { id: 'q6-a', text: 'Structured Query Language' },
      { id: 'q6-b', text: 'Simple Question Language' },
      { id: 'q6-c', text: 'Standard Query Logic' },
      { id: 'q6-d', text: 'Structured Question Logic' },
    ],
    correctAnswerId: 'q6-a',
  },
  {
    id: 'q7',
    type: 'text',
    text: 'Which HTTP method is used to retrieve data from a server?',
    choices: [
      { id: 'q7-a', text: 'POST' },
      { id: 'q7-b', text: 'GET' },
      { id: 'q7-c', text: 'PUT' },
      { id: 'q7-d', text: 'DELETE' },
    ],
    correctAnswerId: 'q7-b',
  },
  {
    id: 'q8',
    type: 'text',
    text: 'What is the main purpose of Git?',
    choices: [
      { id: 'q8-a', text: 'Version control' },
      { id: 'q8-b', text: 'Database management' },
      { id: 'q8-c', text: 'Web hosting' },
      { id: 'q8-d', text: 'Code compilation' },
    ],
    correctAnswerId: 'q8-a',
  },
  {
    id: 'q9',
    type: 'image',
    text: 'What mathematical concept is shown in this image?',
    imageUrl: 'https://images.unsplash.com/photo-1758685734312-5134968399a8?w=400',
    choices: [
      { id: 'q9-a', text: 'Algebraic Equations' },
      { id: 'q9-b', text: 'Geometric Theorems' },
      { id: 'q9-c', text: 'Calculus Derivatives' },
      { id: 'q9-d', text: 'Statistical Analysis' },
    ],
    correctAnswerId: 'q9-a',
  },
  {
    id: 'q10',
    type: 'image',
    text: 'What type of scientific equipment is shown?',
    imageUrl: 'https://images.unsplash.com/photo-1631106321638-d94d9a8f3e1f?w=400',
    choices: [
      { id: 'q10-a', text: 'Chemistry Laboratory Glassware' },
      { id: 'q10-b', text: 'Physics Measurement Tools' },
      { id: 'q10-c', text: 'Biology Microscope' },
      { id: 'q10-d', text: 'Astronomy Telescope' },
    ],
    correctAnswerId: 'q10-a',
  },
  {
    id: 'q11',
    type: 'text',
    text: 'Which flag is for the USA?',
    choices: [
      { id: 'q11-a', text: 'USA Flag', imageUrl: 'https://images.unsplash.com/photo-1634587621091-2c3a46ad5fa5?w=400' },
      { id: 'q11-b', text: 'UK Flag', imageUrl: 'https://images.unsplash.com/photo-1684196044476-60d019bf6743?w=400' },
      { id: 'q11-c', text: 'Canada Flag', imageUrl: 'https://images.unsplash.com/photo-1616532459966-d30934dfcbe2?w=400' },
      { id: 'q11-d', text: 'Australia Flag', imageUrl: 'https://images.unsplash.com/photo-1680173764109-bfe1a34a1877?w=400' },
    ],
    correctAnswerId: 'q11-a',
  },
];

export const mockTest: Test = {
  id: 'test-001',
  title: 'Web Development Fundamentals',
  totalQuestions: 11,
  passingScore: 60, // 60% to pass
  timeLimit: 15, // 15 minutes
  questions: mockQuestions,
};
