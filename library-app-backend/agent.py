import csv
import os

BOOKS_CSV = 'books.csv'
USERS_CSV = 'users.csv'

# Créer books.csv s'il n'existe pas
if not os.path.exists(BOOKS_CSV):
    with open(BOOKS_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['id', 'title', 'author', 'genre'])
        writer.writerow([1, 'Harry Potter', 'J.K. Rowling', 'Fantasy'])
        writer.writerow([2, 'Le Seigneur des Anneaux', 'J.R.R. Tolkien', 'Fantasy'])
        writer.writerow([3, 'Le Petit Prince', 'A. de Saint-Exupéry', 'Classique'])
        writer.writerow([4, '1984', 'G. Orwell', 'Science-Fiction'])
        writer.writerow([5, 'Dune', 'F. Herbert', 'Science-Fiction'])

# Créer users.csv s'il n'existe pas
if not os.path.exists(USERS_CSV):
    with open(USERS_CSV, 'w', newline='') as f:
        writer = csv.writer(f)
        writer.writerow(['username', 'book_ids'])

# Classe Agent pour percevoir et réagir
class Agent:
    def __init__(self):
        self.books = self.get_books()
        self.users = self.get_users()

    # Lire les livres
    def get_books(self):
        books = []
        with open(BOOKS_CSV, 'r') as f:
            reader = csv.reader(f)
            next(reader)  
            for row in reader:
                books.append({'id': row[0], 'title': row[1], 'author': row[2], 'genre': row[3]})
        return books

    # Lire les utilisateurs
    def get_users(self):
        users = {}
        with open(USERS_CSV, 'r') as f:
            reader = csv.reader(f)
            next(reader)  
            for row in reader:
                username = row[0]
                book_ids = row[1]
                if book_ids:
                    users[username] = [int(id) for id in book_ids.split(',')]
                else:
                    users[username] = []
        return users

    # Sauvegarder les utilisateurs
    def save_users(self):
        with open(USERS_CSV, 'w', newline='') as f:
            writer = csv.writer(f)
            writer.writerow(['username', 'book_ids'])
            for username in self.users:
                book_ids = self.users[username]
                ids_string = ','.join(str(id) for id in book_ids)
                writer.writerow([username, ids_string])

    # Percevoir : regarder les données envoyées
    def perceive(self, data):
        username = data.get('username', '').strip()
        book_ids = data.get('book_ids', [])
        if book_ids:
            book_ids = [int(id) for id in book_ids]
        return username, book_ids

    # Réagir : répondre à l'action demandée
    def react(self, action, username, book_ids):
        if not username and action != 'available_books':
            return {'error': 'Il faut un nom'}

        if action == 'recommend':
            if username not in self.users:
                return {'action': 'register', 'books': self.books, 'message': 'Inscris-toi'}
            if not self.users[username]:
                return {'action': 'select_books', 'books': self.books, 'message': 'Choisis des livres'}
            user_books = [b for b in self.books if int(b['id']) in self.users[username]]
            genres = []
            for book in user_books:
                if book['genre'] not in genres:
                    genres.append(book['genre'])
            recommendations = []
            for book in self.books:
                book_id = int(book['id'])
                if book_id not in self.users[username] and book['genre'] in genres:
                    score = sum(1 for ub in user_books if ub['genre'] == book['genre']) * 100 // len(user_books)
                    new_book = {'id': book['id'], 'title': book['title'], 'author': book['author'], 'genre': book['genre'], 'match_score': score}
                    recommendations.append(new_book)
            recommendations.sort(key=lambda x: x['match_score'], reverse=True)
            return {'action': 'recommend', 'books': recommendations, 'message': f"Pour tes genres: {', '.join(genres)}"}

        if action == 'register':
            if username in self.users:
                return {'error': 'Nom déjà pris'}
            self.users[username] = []
            self.save_users()
            return {'message': 'Inscription OK'}

        if action == 'select_books':
            if username not in self.users:
                return {'error': 'Utilisateur inconnu'}
            valid_ids = [int(b['id']) for b in self.books]
            for id in book_ids:
                if id not in valid_ids:
                    return {'error': 'Livre invalide'}
            current_ids = self.users[username]
            for id in book_ids:
                if id not in current_ids:
                    current_ids.append(id)
            self.users[username] = current_ids
            self.save_users()
            return {'message': 'Livres ajoutés'}

        if action == 'user_books':
            user_books = [b for b in self.books if int(b['id']) in self.users.get(username, [])]
            return {'books': user_books}

        if action == 'available_books':
            return self.books

        return {'error': 'Action inconnue'}


agent = Agent()