import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Student } from '../types/test';

interface AuthState {
  currentUser: Student | null;
  isAuthenticated: boolean;
  login: (user: Student) => void;
  logout: () => void;
  register: (userData: Omit<Student, 'id'>) => Student;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      currentUser: null,
      isAuthenticated: false,
      login: (user) =>
        set({
          currentUser: user,
          isAuthenticated: true,
        }),
      logout: () =>
        set({
          currentUser: null,
          isAuthenticated: false,
        }),
      register: (userData) => {
        const newUser: Student = {
          ...userData,
          id: `user-${Date.now()}`,
          studentId: `STU${Date.now().toString().slice(-6)}`,
        };
        set({
          currentUser: newUser,
          isAuthenticated: true,
        });
        return newUser;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);
