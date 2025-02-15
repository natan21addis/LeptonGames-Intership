"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://openlibrary.org/subjects/fiction.json?limit=50`);
        setBooks(res.data.works);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Books</h1>
      <div className="flex items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search books..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.key} className="h-full overflow-hidden shadow-lg hover:shadow-xl">
            <CardHeader className="p-0 border-b">
              <img
                src={`https://covers.openlibrary.org/b/id/${book.cover_id}-L.jpg`}
                alt={book.title}
                className="w-full h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{book.title}</CardTitle>
              <CardDescription>
                {book.authors?.[0]?.name || "Unknown Author"}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}