import { createContext, useContext } from 'react';

export interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  subscription?: string;
}

class AuthService {
  private user: User | null = null;

  async login(email: string, password: string): Promise<User> {
    // Implement your login logic here
    return this.user!;
  }

  async register(email: string, password: string, role: 'user' | 'admin'): Promise<User> {
    // Implement your registration logic here
    return this.user!;
  }

  async logout(): Promise<void> {
    this.user = null;
  }

  isAuthenticated(): boolean {
    return !!this.user;
  }
}

export const authService = new AuthService();
export const AuthContext = createContext<AuthService>(authService);
export const useAuth = () => useContext(AuthContext);
