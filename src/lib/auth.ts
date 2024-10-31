import type { User } from '@/types/auth';

export const login = async (
  username: string,
  password: string,
  remember: boolean
): Promise<User> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (username === 'admin' && password === 'test') {
    const user = { username, isAuthenticated: true };
    if (remember) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user;
  }

  throw new Error('Invalid credentials');
};

export const logout = () => {
  localStorage.removeItem('user');
};

export const getStoredUser = (): User | null => {
  const stored = localStorage.getItem('user');
  return stored ? JSON.parse(stored) : null;
};