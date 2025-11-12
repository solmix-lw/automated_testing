# Automated Testing System Guide

## Overview
- **Project Type**: React 18 + TypeScript + Vite + Tailwind CSS web application
- **Purpose**: Online automated testing system for students with instant grading and admin management
- **Entry Point**: `src/main.tsx`
- **Router**: React Router DOM v6 with BrowserRouter
- **State Management**: Zustand with localStorage persistence for authentication and test results

## Architecture

### Frontend Structure
- **Pages**:
  - `src/pages/Home.tsx` - Landing page with navigation to registration and admin dashboard
  - `src/pages/Register.tsx` - Student registration form with validation
  - `src/pages/test/TakeTest.tsx` - Main test-taking flow with instructions, questions, timer, and results (requires authentication)
  - `src/pages/admin/Admin.tsx` - Admin dashboard with 4 tabs: Student Results, Test Settings, Question List, Add Question
- **Test Components**:
  - `src/components/test/QuestionCard.tsx` - Displays questions with support for text answers, image questions, and image-based choices (grid layout)
  - `src/components/test/TestTimer.tsx` - Countdown timer with visual warnings
  - `src/components/test/ProgressBar.tsx` - Visual progress indicator
  - `src/components/test/ResultSummary.tsx` - Displays test results with score, pass/fail status, and answer review
- **Admin Components**:
  - `src/components/admin/QuestionList.tsx` - Lists all questions with delete functionality
  - `src/components/admin/AddQuestionForm.tsx` - Form to add new text or image-based questions
  - `src/components/admin/ResultsTable.tsx` - Table showing all student test results with pass/fail status
  - `src/components/admin/ReportModal.tsx` - Detailed modal showing question-by-question analysis of student answers
  - `src/components/admin/TestSettings.tsx` - Form to configure number of questions, passing score, and time limit
- **Stores**:
  - `src/store/authStore.ts` - Zustand store for authentication state with localStorage persistence
  - `src/store/resultsStore.ts` - Zustand store for test results and test settings with localStorage persistence
- **Types**: `src/types/test.ts` - TypeScript interfaces for Question, Test, StudentAnswer, TestResult, Student
- **Mock Data**: `src/mocks/questions.ts` - 11 sample questions (3 image questions, 1 image-choice question)

### Routes
- `/` - Home page
- `/register` - Student registration form
- `/test` - Student test-taking interface (protected - requires registration)
- `/admin` - Admin dashboard (results, settings, questions)

### Authentication Flow
1. User lands on home page
2. Clicks "Take Test" → redirected to `/register`
3. Fills registration form with full name, email, phone, telegram ID (optional), username, password
4. System generates unique Student ID (e.g., STU123456)
5. User data stored in localStorage via Zustand persist middleware
6. User automatically logged in and redirected to `/test`
7. Test page checks authentication state - redirects to `/register` if not authenticated

### Test Results Flow
1. Student completes test and submits answers
2. System calculates score, percentage, and pass/fail status
3. Result saved to localStorage via resultsStore (includes all answers, timestamps, student ID)
4. Admin can view results in "Student Results" tab
5. Admin can click "View Report" to see detailed question-by-question analysis
6. Report shows correct/incorrect answers, student responses, and question images

### Admin Features
- **Student Results Tab**: Table with student name, ID, date, score, percentage, pass/fail badge, "View Report" button
- **Test Settings Tab**: Configure total questions (1-100), passing score (0-100%), time limit (1-180 minutes)
- **Question List Tab**: View all questions with type badges, correct answers highlighted, delete functionality
- **Add Question Tab**: Create text or image-based questions with Unsplash image search (mock)

### Question Types
1. **Text Question**: Standard multiple choice with text-only options
2. **Image Question**: Question displays an image, choices are text
3. **Image-Choice Question**: Question is text, each choice includes both text label and image (displayed in 2x2 grid)

### Key Features
- **Authentication**: Registration-based access control with localStorage persistence
- **Auto-generated Student ID**: Unique ID created during registration (format: STU + timestamp)
- **Protected Routes**: Test page requires authentication, redirects to registration if not logged in
- **Test Results Storage**: All test results saved to localStorage with complete answer history
- **Detailed Reports**: Question-by-question analysis with correct/incorrect highlighting
- **Configurable Settings**: Admin can set number of questions, passing score, time limit
- **Image-Based Choices**: Support for questions where each answer choice includes an image
- **Timed Tests**: Visual countdown with auto-submission on timeout
- **Instant Grading**: Automatic scoring with pass/fail determination
- **Admin Dashboard**: Comprehensive management interface with results, settings, and questions

## Data Storage (localStorage)
- **auth-storage**: Student authentication state (currentUser, isAuthenticated)
- **test-results-storage**: Test results array and test settings (totalQuestions, passingScore, timeLimit)

## Backend Integration (Next Phase)
Currently uses localStorage for all data. Future backend integration will require:
- **Youware Backend MCP tool** enabled for:
  - PostgreSQL database for questions, students, test results, settings
  - Server-side user authentication with bcrypt password hashing
  - R2 file storage for Excel uploads and question images
  - API endpoints: user registration/login, CRUD questions, CRUD results, test settings
- **Database Schema** (to be implemented):
  - `questions` table: id, type, text, image_url, choices (JSON with imageUrl support), correct_answer_id
  - `students` table: id, student_id, full_name, email, phone, telegram_id, username, password_hash
  - `tests` table: id, title, total_questions, passing_score, time_limit
  - `test_results` table: id, test_id, student_id, answers (JSON), score, percentage, passed, start_time, end_time
  - `test_settings` table: id, total_questions, passing_score, time_limit, created_at

## Commands
- Install dependencies: `npm install`
- Development server: `npm run dev`
- Production build: `npm run build`
- Preview production build: `npm run preview`

## Styling Conventions
- Tailwind CSS utility-first approach
- Gradient backgrounds: `from-blue-50 via-white to-purple-50` (student), `from-slate-50 via-white to-blue-50` (admin)
- Card-based UI with rounded-3xl borders and shadow-lg
- Color scheme: Blue for primary actions, Green for success/passed, Red for warnings/failed, Purple for image questions
- Responsive breakpoints using `md:` and `sm:` prefixes
- 8px-based spacing scale for consistent layout
- Grid layout (2x2) for image-based choices

## Next Development Steps
1. Enable Youware Backend MCP tool
2. Migrate all localStorage data to PostgreSQL database
3. Implement server-side authentication with bcrypt and JWT
4. Add real Unsplash API integration for image search
5. Add Excel file upload and parsing for bulk question import
6. Add admin authentication and role-based access control
7. Implement test history and analytics (charts, trends)
8. Add student login page for returning users
9. Add export functionality for test results (PDF, CSV)
