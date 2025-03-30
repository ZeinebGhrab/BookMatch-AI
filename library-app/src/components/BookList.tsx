import { BookListProps } from './interfaces/types';

export default function BookList({ books, selectedBooks, onSelect, onSave, isLoading, mode }: BookListProps) {
  const getScoreColor = (score: number) => {
    if (score > 75) return 'bg-success';
    if (score > 50) return 'bg-info';
    if (score > 25) return 'bg-warning';
    return 'bg-secondary';
  };

  return (
    <div>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {books.map(book => (
          <div key={book.id} className="col">
            <div className={`card h-100 ${selectedBooks.includes(book.id) ? 'border-primary' : ''}`}>
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text text-muted">{book.author}</p>
                
                <div className="mb-2">
                  {mode === 'recommend' && book.match_score !== undefined ? (
                    <div className="d-flex justify-content-between">
                      <small>Match: {book.match_score}%</small>
                      <span className={`badge ${getScoreColor(book.match_score)}`}>
                        {book.genre}
                      </span>
                    </div>
                  ) : (
                    <span className="badge bg-primary">{book.genre}</span>
                  )}
                  {mode === 'recommend' && book.match_score !== undefined && (
                    <div className="progress" style={{height: "5px"}}>
                      <div 
                        className={`progress-bar ${getScoreColor(book.match_score)}`}
                        style={{width: `${book.match_score}%`}} 
                      />
                    </div>
                  )}
                </div>
                {(mode === 'select_books') && (
                  <button
                    className={`btn btn-sm ${selectedBooks.includes(book.id) ? 'btn-danger' : 'btn-outline-primary'}`}
                    onClick={() => onSelect(book.id)}
                    disabled={isLoading}
                  >
                    {selectedBooks.includes(book.id) ? 'Retirer' : 'Sélectionner'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {onSave && (
        <button
          className="btn btn-success mt-3"
          onClick={onSave}
          disabled={isLoading || selectedBooks.length === 0}
        >
          {isLoading ? 'Enregistrement...' : 'Enregistrer la sélection'}
        </button>
      )}
    </div>
  );
}