import React, { useState, useEffect } from "react";
import  Link  from "next/link";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

export default function Categories() {
  const [filter, setFilter] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [books, setBooks] = useState([]);
  const [places, setPlaces] = useState([]);

  // Fetch Movies from TMDb API
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=12363dab001ab56b7c61ab2dd890eec1&language=en-US&page=1`
      )
      .then((response) => setMovies(response.data.results.slice(0, 12)))
      .catch((error) => console.error("Error fetching movies:", error));
  }, []);

  // Fetch Books from Open Library API
  useEffect(() => {
    axios
      .get(`https://openlibrary.org/subjects/fiction.json?limit=12`)
      .then((response) => setBooks(response.data.works))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  // Fetch Places from Rest Countries API
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/all`)
      .then((response) => setPlaces(response.data.slice(0, 12)))
      .catch((error) => console.error("Error fetching places:", error));
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-8 overflow-x-auto justify-center">
        <button
          onClick={() => setFilter("movies")}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            filter === "movies" 
              ? "bg-red-600 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Movies
        </button>
        <button
          onClick={() => setFilter("places")}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            filter === "places" 
              ? "bg-red-600 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Places
        </button>
        <button
          onClick={() => setFilter("books")}
          className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
            filter === "books" 
              ? "bg-red-600 text-white" 
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          Books
        </button>
      </div>

      {/* Movies Grid */}
      {filter === "movies" && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Movies</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {movies.map((movie) => (
              <Link 
                key={movie.id}
                href={`/movies/${movie.id}`}
                className="hover:scale-102 transition-transform duration-200"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl">
                  <CardHeader className="p-0 border-b">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="mb-2">{movie.title}</CardTitle>
                    <CardDescription>
                      {new Date(movie.release_date).getFullYear()} | ⭐ {movie.vote_average}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/movies">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-colors">
                Show More Movies
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Places Grid */}
      {filter === "places" && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Places</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {places.map((place) => (
              <Link 
                key={place.cca3}
                href={`/places/${place.cca3}`}
                className="hover:scale-102 transition-transform duration-200"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl">
                  <CardHeader className="p-0 border-b">
                    <img
                      src={place.flags.png}
                      alt={place.name.common}
                      className="w-full h-64 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <CardTitle className="mb-2">{place.name.common}</CardTitle>
                    <CardDescription>
                      {place.region} | {place.capital?.[0]}
                    </CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/places">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-colors">
                Show More Places
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Books Grid */}
      {filter === "books" && (
        <div className="animate-fade-in">
          <h2 className="text-3xl font-bold mb-6 text-center">Popular Books</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
              <Link 
                key={book.key}
                href={`/books/${book.key.replace("/works/", "")}`}
                className="hover:scale-102 transition-transform duration-200"
              >
                <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl">
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
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href="/books">
              <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-colors">
                Show More Books
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}