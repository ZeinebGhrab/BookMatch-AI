import BookList from './BookList';
import { BookListProps } from './interfaces/types'; 

interface BookDisplayProps extends BookListProps {
  showAddBooks: boolean;
  setShowAddBooks: (value: boolean) => void;
}

export default function BookDisplay({
  books,
  selectedBooks,
  onSelect,
  onSave,
  isLoading,
  mode,
  userBooks,
  showAddBooks,
  setShowAddBooks,
}: BookDisplayProps) {
  return (
    <>
      {userBooks.length > 0 && (
        <div className="mb-5">
          <h2 className="h5 mb-3">Vos préférences ({userBooks.length})</h2>
          <button className="btn btn-outline-primary mb-3" onClick={() => setShowAddBooks(!showAddBooks)}>
            {showAddBooks ? 'Annuler' : 'Ajouter livres'}
          </button>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {userBooks.map((book) => (
              <div key={book.id} className="col">
                <div className="card h-100 border-primary">
                  <div className="card-body">
                    <h3 className="card-title h6 text-primary">{book.title}</h3>
                    <p className="card-text small text-muted">{book.author}</p>
                    <span className="badge bg-primary">{book.genre}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddBooks && userBooks.length > 0 && (
        <div className="mb-5">
          <h2 className="h5 mb-3">Ajouter à vos préférences</h2>
          <BookList
            books={books.filter((b) => !userBooks.some((ub) => ub.id === b.id))}
            selectedBooks={selectedBooks}
            onSelect={onSelect}
            onSave={onSave}
            isLoading={isLoading}
            mode="select_books"
            userBooks={userBooks}
          />
        </div>
      )}

      <div className="mt-4">
        <h2 className="h5 mb-3">{mode === 'select_books' ? 'Sélectionnez vos livres' : 'Recommandations'}</h2>
        <BookList
          books={books}
          selectedBooks={selectedBooks}
          onSelect={onSelect}
          onSave={mode === 'select_books' && !showAddBooks ? onSave : undefined}
          isLoading={isLoading}
          mode={mode}
          userBooks={userBooks}
        />
      </div>
    </>
  );
}