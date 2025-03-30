import { useState, useEffect } from 'react';
import { RegisterForm } from './RegisterForm';
import BookDisplay from './BookDisplay'; 
import { AppMode, Book } from './interfaces/types';
import apiService from './api/bookService';

export default function BookRecommender() {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [mode, setMode] = useState<AppMode>('recommend');
  const [loading, setLoading] = useState(false);
  const [userBooks, setUserBooks] = useState<Book[]>([]);
  const [showAddBooks, setShowAddBooks] = useState(false);

  useEffect(() => {
    apiService.getAllBooks().then(setBooks).catch(() => setMessage('Erreur'));
  }, []);

  const handleRecommend = async () => {
    if (!username.trim()) return setMessage("Nom vide");
    setLoading(true);
    const res = await apiService.getRecommendations(username);
    setMode(res.action);
    setBooks(res.books || []);
    setMessage(res.message);
    setSelectedBooks([]);
    if (res.action === 'recommend') setUserBooks(await apiService.getUserBooks(username));
    setLoading(false);
  };

  const handleRegister = async () => {
    setLoading(true);
    await apiService.registerUser(username);
    setBooks(await apiService.getAllBooks());
    setMode('select_books');
    setMessage('Inscrit ! Choisis');
    setLoading(false);
  };

  const handleSave = async () => {
    if (!selectedBooks.length) return setMessage('Choisis un livre');
    setLoading(true);
    await apiService.saveSelectedBooks(username, selectedBooks);
    setUserBooks(await apiService.getUserBooks(username));
    setMessage('Enregistré');
    setShowAddBooks(false);
    await handleRecommend();
    setLoading(false);
  };

  useEffect(() => {
    if (username && mode === 'recommend') {
      apiService.getUserBooks(username).then(setUserBooks).catch(() => setUserBooks([]));
    }
  }, [username, mode]);

  return (
    <div className="container mt-5">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          <h1 className="h4 mb-0">Recommandation de Livres</h1>
        </div>
        <div className="card-body">
          <div className="input-group mb-4">
            <input
              type="text"
              className="form-control form-control-lg"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nom d'utilisateur"
              disabled={loading}
            />
            <button className="btn btn-primary btn-lg" onClick={handleRecommend} disabled={loading}>
              {loading ? 'Chargement...' : 'Valider'}
            </button>
          </div>

          {message && (
            <div className={`alert ${message.includes('Erreur') ? 'alert-danger' : 'alert-info'} mb-4`}>
              {message}
            </div>
          )}

          {mode === 'register' && <RegisterForm username={username} onRegister={handleRegister} isLoading={loading} />}

          <BookDisplay
            books={books}
            selectedBooks={selectedBooks}
            onSelect={(id: number) => setSelectedBooks((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id])}
            onSave={handleSave}
            isLoading={loading}
            mode={mode}
            userBooks={userBooks}
            showAddBooks={showAddBooks}
            setShowAddBooks={setShowAddBooks}
          />
        </div>
      </div>
    </div>
  );
}