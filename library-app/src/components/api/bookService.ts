import axios from 'axios';
import { ApiResponse, Book } from '../interfaces/types';

const API_URL = 'http://localhost:5000';

export const apiService = {
  getRecommendations: async (username: string): Promise<ApiResponse> => {
    const response = await axios.post(`${API_URL}/recommend`, { username });
    return response.data;
  },

  registerUser: async (username: string): Promise<{message: string}> => {
    const response = await axios.post(`${API_URL}/register`, { username });
    return response.data;
  },

  getUserBooks: async (username: string): Promise<Book[]> => {
    const response = await axios.post(`${API_URL}/user_books`, { username });
    return response.data.books;
  },

  saveSelectedBooks: async (username: string, book_ids: number[]): Promise<{message: string}> => {
    const response = await axios.post(`${API_URL}/select_books`, { username, book_ids });
    return response.data;
  },

  getAllBooks: async (): Promise<Book[]> => {
    const response = await axios.get(`${API_URL}/available_books`);
    return response.data;
  }
  
};

export default apiService;