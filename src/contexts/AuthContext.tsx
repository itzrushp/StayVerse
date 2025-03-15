
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Define user type
interface User {
  id: string;
  name: string;
  email: string;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

// API URL - Use the window.location origin to ensure it works in both development and production
const API_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : `${window.location.origin}/api`;

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  loading: false
});

// Auth provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  // Load user from token on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Set auth header
        axios.defaults.headers.common['x-auth-token'] = token;
        
        // Get user data
        const res = await axios.get(`${API_URL}/user`);
        
        if (res.data) {
          setUser({
            id: res.data.id,
            name: res.data.name,
            email: res.data.email
          });
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        delete axios.defaults.headers.common['x-auth-token'];
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/login`, { email, password });
      
      if (res.data.token) {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set auth header
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        
        // Update state
        setUser(res.data.user);
        setIsAuthenticated(true);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/register`, { name, email, password });
      
      if (res.data.token) {
        // Save token to localStorage
        localStorage.setItem('token', res.data.token);
        
        // Set auth header
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        
        // Update state
        setUser(res.data.user);
        setIsAuthenticated(true);
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    
    // Remove auth header
    delete axios.defaults.headers.common['x-auth-token'];
    
    // Update state
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
