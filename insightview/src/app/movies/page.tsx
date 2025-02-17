"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Spinner from "../../components/spinner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";
import ErrorBoundary from "../../components/ErrorBoundary";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const genres = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 18, name: "Drama" },
    { id: 878, name: "Sci-Fi" },
    { id: 10749, name: "Romance" }
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=12363dab001ab56b7c61ab2dd890eec1&language=en-US&page=1`
        );
        setMovies(res.data.results);
      } catch (err) {
        setError("Failed to fetch movies. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "all" || !genre || movie.genre_ids.includes(Number(genre)))
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 min-h-[60vh] bg-gradient-to-r from-gray-900 to-red-900">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Explore Blockbuster Movies
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up delay-100">
            Discover the latest and greatest in cinematic entertainment
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
            {/* Search Input */}
            <div className="w-full md:w-1/2">
              <Input
                type="text"
                placeholder="Search movies..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-red-500"
              />
            </div>

            {/* Genre Filter */}
            <div className="w-full md:w-1/3">
              <Select value={genre} onValueChange={(value) => setGenre(value)}>
                <SelectTrigger className="p-4 rounded-lg border border-gray-200">
                  <SelectValue placeholder="Filter by Genre" />
                </SelectTrigger>
                <SelectContent>
                <SelectItem value="all">All Genres</SelectItem>
                  {genres.map((genre) => (
                    <SelectItem key={genre.id} value={genre.id.toString()}>
                      {genre.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Movie Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMovies.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-xl">No movies found matching your criteria</p>
              </div>
            ) : (
              filteredMovies.map((movie) => (
                <ErrorBoundary key={movie.id}>
                  <Link 
                    href={`/movies/${movie.id}`}
                    className="group transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <Card className="overflow-hidden shadow-lg hover:shadow-2xl">
                      <CardHeader className="p-0 relative">
                        <img
                          src={`https://image.tmdb.org/t/p/w780${movie.poster_path}`}
                          alt={movie.title}
                          className="w-full h-80 object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      </CardHeader>
                      <CardContent className="p-6 relative">
                        <CardTitle className="text-2xl mb-2">{movie.title}</CardTitle>
                        <CardDescription className="flex justify-between items-center">
                          <span>{new Date(movie.release_date).getFullYear()}</span>
                          <span className="flex items-center">
                            ⭐ {movie.vote_average}
                          </span>
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </Link>
                </ErrorBoundary>
              ))
            )}
          </div>
        </div>
      </div>
    </main>
  );
}