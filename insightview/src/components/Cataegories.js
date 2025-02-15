import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";
import Spinner from "./spinner"; // Custom Spinner Component

export default function Categories() {
  const [filter, setFilter] = useState("all");
  const [data, setData] = useState({ movies: [], books: [], places: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const [moviesRes, booksRes, placesRes] = await Promise.all([
          axios.get(
            `https://api.themoviedb.org/3/movie/popular?api_key=12363dab001ab56b7c61ab2dd890eec1&language=en-US&page=1`
          ),
          axios.get(`https://openlibrary.org/subjects/fiction.json?limit=12`),
          axios.get(`https://restcountries.com/v3.1/all`),
        ]);
        setData({
          movies: moviesRes.data.results.slice(0, 12),
          books: booksRes.data.works,
          places: placesRes.data.slice(0, 12),
        });
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const displayedData =
    filter === "all"
      ? [...data.movies, ...data.books, ...data.places]
      : data[filter];

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Filter Buttons */}
      <div className="flex space-x-4 mb-8 overflow-x-auto justify-center">
        {["all", "movies", "books", "places"].map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              filter === category
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Data Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedData.map((item, index) => (
          <Link
            key={index}
            href={
              item.id
                ? `/movies/${item.id}`
                : item.key
                ? `/books/${item.key.replace("/works/", "")}`
                : `/places/${item.cca3}`
            }
            className="hover:scale-102 transition-transform duration-200"
          >
            <Card className="h-full overflow-hidden shadow-lg hover:shadow-xl">
              <CardHeader className="p-0 border-b">
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : item.cover_id
                      ? `https://covers.openlibrary.org/b/id/${item.cover_id}-L.jpg`
                      : item.flags?.png
                  }
                  alt={item.title || item.name?.common || "Image"}
                  className="w-full h-64 object-cover"
                />
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className="mb-2">
                  {item.title || item.name?.common || "Unknown"}
                </CardTitle>
                <CardDescription>
                  {item.release_date
                    ? `${new Date(item.release_date).getFullYear()} | ⭐ ${
                        item.vote_average
                      }`
                    : item.authors?.[0]?.name || item.region || "Details"}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}