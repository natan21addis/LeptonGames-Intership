import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../components/spinner";
import DetailLayout from "../../components/DetailLayout";

export default function MovieDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=12363dab001ab56b7c61ab2dd890eec1`
        );
        if (res.status === 200) {
          setMovie(res.data);
        } else {
          setError("Movie not found");
        }
      } catch (error) {
        setError("Failed to fetch movie details");
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchMovie();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;
  if (!movie) return <div className="text-center p-8">Movie not found</div>;

  return (
    <DetailLayout
      title={movie.title}
      imageUrl={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
    >
      {/* ... rest of your detail page content ... */}
    </DetailLayout>
  );
}