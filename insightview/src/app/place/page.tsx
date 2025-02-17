"use client";

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
        const res = await axios.get(
          "https://api.unsplash.com/search/photos?query=famous+landmarks&per_page=30&client_id=TQ3RVdVpPRXbH5U-_GTJBWR_DmP4FsWH6ObolrjM0hY"
        );
        setPlaces(res.data.results);
      } catch (err) {
        setError("Failed to fetch places. Please try again later.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaces();
  }, []);

  const filteredPlaces = places.filter((place) =>
    place.description?.toLowerCase().includes(search.toLowerCase()) &&
    (!region || place.location?.region?.includes(region))
  );

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div className="relative text-white py-32 px-8 min-h-[60vh] bg-gradient-to-r from-gray-900 to-red-900">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
            Explore World Wonders
          </h1>
          <p className="text-xl mb-8 animate-fade-in-up delay-100">
            Discover breathtaking destinations around the globe
          </p>
        </div>
      </div>

      <div className="container mx-auto py-10 px-4 -mt-32 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-1/2 px-6 py-3 border border-gray-200 rounded-full transition-all focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="w-full md:w-1/4 px-6 py-3 border border-gray-200 rounded-full appearance-none bg-white"
            >
              <option value="">All Regions</option>
              {regions.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlaces.map((place) => (
              <Card 
                key={place.id} 
                className="group overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <CardHeader className="p-0 relative">
                  <img
                    src={`${place.urls.regular}&auto=format&fit=crop&w=800&q=80`}
                    alt={place.description}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </CardHeader>
                <CardContent className="p-6 relative">
                  <CardTitle className="text-2xl mb-2">
                    {place.description?.split(" ").slice(0, 5).join(" ")}
                  </CardTitle>
                  <CardDescription>
                    {place.location?.country || "World Heritage Site"}
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