import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "../../components/spinner";

export default function PlaceDetails() {
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const fetchPlace = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/alpha/${id}`);
        setPlace(res.data[0]);
      } catch (err) {
        setError("Failed to fetch place details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlace();
  }, [id]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  if (!place) return null;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-6">{place.name.common}</h1>
      <img
        src={place.flags.png}
        alt={place.name.common}
        className="w-1/3 rounded-lg shadow-md mb-4"
      />
      <p className="text-gray-600 mb-4">Region: {place.region}</p>
      <p className="font-medium">Capital: {place.capital?.[0]}</p>
      <p className="font-medium">Population: {place.population.toLocaleString()}</p>
    </div>
  );
}