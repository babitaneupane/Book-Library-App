import React from 'react'

type Book = { id: string; title: string; author: string; year?: number; read: boolean }

type Props = {
  books: Book[]
  onRemove: (id: string) => void
  onToggleRead: (id: string) => void
}

export default function BookList({ books, onRemove, onToggleRead }: Props) {
  if (books.length === 0) return <p className="empty">No books yet — add one above.</p>

  return (
    <ul className="book-list">
      {books.map((book) => (
        <li key={book.id} className="book">
          <div className="book-info">
            <div className="book-title">{book.title}</div>
            <div className="book-meta">
              {book.author}
              {book.year ? ` — ${book.year}` : ''}
            </div>
          </div>
          <div className="book-actions">
            <button onClick={() => onToggleRead(book.id)} className={`pill ${book.read ? 'read' : 'unread'}`}>
              {book.read ? 'Read' : 'Unread'}
            </button>
            <button onClick={() => onRemove(book.id)} className="pill remove">
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  )
}
