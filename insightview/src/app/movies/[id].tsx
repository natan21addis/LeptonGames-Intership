import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "../../components/spinner";

export default function MovieDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=12363dab001ab56b7c61ab2dd890eec1&language=en-US`
        );
        setMovie(res.data);
      } catch (err) {
        setError("Failed to fetch movie details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!movie) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex flex-col md:flex-row items-center space-x-4">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-4">{movie.overview}</p>
          <p className="font-medium">
            Release Date: {new Date(movie.release_date).toDateString()}
          </p>
          <p className="font-medium">⭐ Rating: {movie.vote_average}</p>
          <p className="font-medium">Runtime: {movie.runtime} minutes</p>
        </div>
      </div>
    </div>
  );
}