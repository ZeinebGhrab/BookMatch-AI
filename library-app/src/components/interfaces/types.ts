
export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  match_score:  number;
}

export type AppMode = 'register' | 'select_books' | 'recommend';

export interface BookListProps {
  books: Book[];
  selectedBooks: number[];
  onSelect: (id: number) => void;
  onSave?: () => Promise<void>; 
  isLoading: boolean;
  mode: AppMode;
  userBooks: Book[]; 
}

export interface RegisterFormProps {
  username: string;
  isLoading: boolean;
  onRegister: () => void;
}

export interface ApiResponse {
  action: 'register' | 'select_books' | 'recommend';
  books: Book[];
  message: string;
}