import React, { useState } from 'react'

type Props = {
  onAdd: (data: { title: string; author: string; year?: number }) => void
}

export default function BookForm({ onAdd }: Props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [year, setYear] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim() || !author.trim()) return
    onAdd({ title: title.trim(), author: author.trim(), year: year ? Number(year) : undefined })
    setTitle('')
    setAuthor('')
    setYear('')
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <input
        aria-label="Title"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        aria-label="Author"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        aria-label="Year"
        placeholder="Year (optional)"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">Add Book</button>
    </form>
  )
}
