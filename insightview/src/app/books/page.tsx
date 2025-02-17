"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import { console } from "inspector";

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
        const res = await axios.get(
          "https://www.googleapis.com/books/v1/volumes?q=best+sellers&maxResults=40"
        );
        setBooks(res.data.items);
      } catch (err) {
        setError("Failed to fetch books. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.volumeInfo.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 min-h-[60vh] bg-gradient-to-r from-gray-900 to-red-900">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Discover Literary Treasures
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up delay-100">
            Explore timeless classics and modern masterpieces
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-8">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-6 py-3 border border-gray-200 rounded-full transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBooks.map((book) => (
              <Card 
                key={book.id} 
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="p-0 relative">
                  <img
                    src={book.volumeInfo.imageLinks?.thumbnail.replace('zoom=1', 'zoom=2') || 'https://via.placeholder.com/300x450'}
                    alt={book.volumeInfo.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </CardHeader>
                <CardContent className="p-6 relative">
                  <CardTitle className="text-2xl mb-2">{book.volumeInfo.title}</CardTitle>
                  <CardDescription>
                    {book.volumeInfo.authors?.join(", ") || "Unknown Author"}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}