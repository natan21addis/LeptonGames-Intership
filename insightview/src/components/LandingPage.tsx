"use client";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Categories from "../components/Cataegories";
import axios from "axios";
import Spinner from "../components/spinner";

const BOOK_TITLES = ["The Great Gatsby", "To Kill a Mockingbird", "1984"];
const BOOK_AUTHORS = ["F. Scott Fitzgerald", "Harper Lee", "George Orwell"];
const LANDMARK_NAMES = ["Eiffel Tower", "Taj Mahal", "Colosseum"];
const LANDMARK_LOCATIONS = ["Paris, France", "Agra, India", "Rome, Italy"];

export default function LandingPage() {
  const [currentImage, setCurrentImage] = useState({
    bgImage: "",
    src: "",
    heading: "",
    subheading: "",
    title: ""
  });
  const [nextImage, setNextImage] = useState({
    bgImage: "",
    src: "",
    heading: "",
    subheading: "",
    title: ""
  });
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [heroData, setHeroData] = useState({
    movies: [],
    books: [],
    places: []
  });

  // Fetch data from APIs
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, booksRes, placesRes] = await Promise.all([
          axios.get(
            "https://api.themoviedb.org/3/movie/popular?api_key=12363dab001ab56b7c61ab2dd890eec1"
          ),
          axios.get("https://api.unsplash.com/search/photos?query=classic+book+covers&per_page=3&client_id=TQ3RVdVpPRXbH5U-_GTJBWR_DmP4FsWH6ObolrjM0hY"),
          axios.get("https://api.unsplash.com/search/photos?query=famous+landmarks&per_page=3&client_id=TQ3RVdVpPRXbH5U-_GTJBWR_DmP4FsWH6ObolrjM0hY")
        ]);

        // Process movies
        const movies = moviesRes.data.results.slice(0, 3).map(movie => ({
          bgImage: `https://image.tmdb.org/t/p/original${movie.backdrop_path}`,
          src: `https://image.tmdb.org/t/p/w780${movie.poster_path}`,
          heading: movie.title,
          subheading: movie.tagline || "Blockbuster Movie",
          title: "Movie"
        }));

        // Process books using Unsplash
        const books = booksRes.data.results.map((book, index) => ({
          bgImage: `${book.urls.raw}&auto=format&fit=crop&w=1920&h=1080&q=80`,
          src: `${book.urls.raw}&auto=format&fit=crop&w=600&h=900&q=80`,
          heading: BOOK_TITLES[index],
          subheading: BOOK_AUTHORS[index],
          title: "Book"
        }));

        // Process places using Unsplash
        const places = placesRes.data.results.map((place, index) => ({
          bgImage: `${place.urls.raw}&auto=format&fit=crop&w=1920&h=1080&q=80`,
          src: `${place.urls.raw}&auto=format&fit=crop&w=600&h=400&q=80`,
          heading: LANDMARK_NAMES[index],
          subheading: LANDMARK_LOCATIONS[index],
          title: "Landmark"
        }));

        setHeroData({ movies, books, places });
        setCurrentImage(movies[0]);
        setNextImage(movies[1]);
      } catch (err) {
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Smooth rotation logic
  useEffect(() => {
    if (!heroData.movies.length) return;

    let currentIndex = 0;
    const allItems = [
      ...heroData.movies,
      ...heroData.books,
      ...heroData.places
    ];

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        currentIndex = (currentIndex + 1) % allItems.length;
        setCurrentImage(allItems[currentIndex]);
        setNextImage(allItems[(currentIndex + 1) % allItems.length]);
        setIsTransitioning(false);
      }, 1000);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroData]);

  if (loading) return <Spinner />;
  if (error) return <div className="text-center text-red-500 p-8">{error}</div>;

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div
        className="hero text-white py-32 px-8 relative overflow-hidden min-h-screen"
        style={{
          backgroundImage: `url('${currentImage.bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
          transition: 'background-image 1s ease-in-out'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30"></div>

        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('${nextImage.bgImage}')`,
            opacity: isTransitioning ? 1 : 0,
          }}
        ></div>

        <div className="container mx-auto flex flex-col lg:flex-row justify-between items-center relative z-10 gap-8">
          <div className="text-content max-w-2xl lg:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in-up">
              {currentImage.heading}
            </h1>
            <p className="text-lg md:text-xl mb-8 animate-fade-in-up delay-100">
              {currentImage.subheading}
            </p>
            <div className="animate-fade-in-up delay-200">
              <Button className="bg-red-600 hover:bg-red-700 transform hover:scale-105 transition-all px-8 py-6 text-lg">
                Explore {currentImage.title}
              </Button>
            </div>
          </div>

          <div className="hero-image w-full lg:w-1/3 h-96 relative animate-scale-in">
            <div className="absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 border-4 border-white/20">
              <img
                src={currentImage.src}
                alt="Featured"
                className="w-full h-full object-cover"
                style={{
                  transition: 'opacity 1s ease-in-out',
                  opacity: isTransitioning ? 0 : 1
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 p-6 text-center">
                <h2 className="text-2xl font-bold text-white animate-slide-in-up">
                  Featured {currentImage.title}
                </h2>
                <p className="text-gray-200 mt-2">
                  {currentImage.title === 'Landmark' ? 'World Heritage Site' : 
                   currentImage.title === 'Book' ? 'Literary Classic' : 'Box Office Hit'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

 

      {/* Overview Section */}
      <section className="overview bg-gradient-to-b from-gray-100 to-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">
            Explore World Wonders
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Discover iconic films, celebrated literature, and breathtaking landmarks that define our world's cultural heritage.
          </p>
        </div>
      </section>

      <Categories />
    </main>
  );
}