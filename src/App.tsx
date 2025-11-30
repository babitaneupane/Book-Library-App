import React, { useEffect, useState } from 'react'
import './App.css'
import BookForm from './components/BookForm'
import BookList from './components/BookList'

type Book = {
  id: string
  title: string
  author: string
  year?: number
  read: boolean
}

function App(): JSX.Element {
  const [books, setBooks] = useState<Book[]>(() => {
    try {
      const raw = localStorage.getItem('books')
      return raw ? (JSON.parse(raw) as Book[]) : []
    } catch (e) {
      return []
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem('books', JSON.stringify(books))
    } catch (e) {
      // ignore
    }
  }, [books])

  const addBook = (data: Omit<Book, 'id'>) => {
    const id = Math.random().toString(36).slice(2, 9)
    setBooks((prev) => [{ ...data, id }, ...prev])
  }

  const removeBook = (id: string) => setBooks((prev) => prev.filter((b) => b.id !== id))

  const toggleRead = (id: string) =>
    setBooks((prev) => prev.map((b) => (b.id === id ? { ...b, read: !b.read } : b)))

  return (
    <div id="root">
      <header className="app-header">
        <h1>Book Library</h1>
        <p className="subtitle">Add, mark read/unread, and remove books (saved in localStorage)</p>
      </header>

      <main className="container">
        <BookForm
          onAdd={(data) =>
            addBook({ title: data.title, author: data.author, year: data.year, read: false })
          }
        />

        <BookList books={books} onRemove={removeBook} onToggleRead={toggleRead} />
      </main>
    </div>
  )
}

export default App
