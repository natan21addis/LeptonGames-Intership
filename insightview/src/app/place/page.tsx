"use client"

import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../../components/spinner";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../../components/ui/card";

export default function Places() {
  const [places, setPlaces] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

  useEffect(() => {
    const fetchPlaces = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`https://restcountries.com/v3.1/all`);
        setPlaces(res.data);
      } catch (err) {
        setError("Failed to fetch places. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter(
    (place) =>
      place.name.common.toLowerCase().includes(search.toLowerCase()) &&
      (!region || place.region === region)
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Places</h1>
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <input
          type="text"
          placeholder="Search places..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-lg"
        />
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="">All Regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPlaces.map((place) => (
          <Card key={place.cca3} className="h-full overflow-hidden shadow-lg hover:shadow-xl">
            <CardHeader className="p-0 border-b">
              <img
                src={place.flags.png}
                alt={place.name.common}
                className="w-full h-64 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="mb-2">{place.name.common}</CardTitle>
              <CardDescription>{place.region}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}