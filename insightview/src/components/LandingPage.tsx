"use client";

import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import Categories from "./Cataegories"

export default function LandingPage() {
  const [filter, setFilter] = useState("all");
  const [currentImage, setCurrentImage] = useState({
    src: "cinima.webp",
    title: "Movie",
    heading: "Explore Your Favorite Movies",
    subheading: "Discover the latest and greatest in cinema.",
    bgImage: "hero.webp", // Background image for Movie
  });

  const [nextImage, setNextImage] = useState({
    src: "book/BookLa.avif",
    title: "Book",
    heading: "Dive Into Captivating Books",
    subheading: "Find your next literary adventure.",
    bgImage: "book/BookLa.avif", // Background image for Book
  });

  const [isTransitioning, setIsTransitioning] = useState(false);

  const posts = [
    {
      id: 1,
      category: "literature",
      title: "Harry Potter",
      description: "A magical journey of a young wizard.",
      image: "harrypotter.avif",
    },
    {
      id: 2,
      category: "movies",
      title: "Spider-Man",
      description: "A hero swinging through the streets of New York.",
      image: "spider-man.avif",
    },
    {
      id: 3,
      category: "places",
      title: "Taj Mahal",
      description: "A stunning white marble mausoleum in India.",
      image: "places.avif",
    },
  ];

  const filteredPosts = filter === "all" ? posts : posts.filter((post) => post.category === filter);

  // Image, text, and background image transition animation
  useEffect(() => {
    const images = [
      {
        src: "cinima.webp",
        title: "Movie",
        heading: "Explore Your Favorite Movies",
        subheading: "Discover the latest and greatest in cinema.",
        bgImage: "hero.webp", // Background image for Movie
      },
      {
        src: "book/BookLa.avif",
        title: "Book",
        heading: "Dive Into Captivating Books",
        subheading: "Find your next literary adventure.",
        bgImage: "book/books.webp", // Background image for Book
      },
      {
        src: "book/places.avif",
        title: "Place",
        heading: "Visit Stunning Destinations",
        subheading: "Explore the world's most beautiful places.",
        bgImage: "places/go.avif", // Background image for Place
      },
    ];

    let index = 0;

    const interval = setInterval(() => {
      setIsTransitioning(true); // Start transition
      setTimeout(() => {
        index = (index + 1) % images.length;
        setCurrentImage(images[index]);
        setNextImage(images[(index + 1) % images.length]);
        setIsTransitioning(false); // End transition
      }, 1000); // Transition duration
    }, 10000); // Change image, text, and background every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <div
        className="hero text-white py-32 px-8 relative overflow-hidden"
        style={{
          backgroundImage: `url('/${currentImage.bgImage}')`, // Current background image
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Next Background Image (for smooth transition) */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url('/${nextImage.bgImage}')`, // Next background image
            opacity: isTransitioning ? 1 : 0, // Fade in/out
          }}
        ></div>

        <div className="container mx-auto flex justify-between items-center relative z-10">
          <div className="text-content max-w-2xl">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              {currentImage.heading}
            </h1>
            <p className="text-xl mb-8 animate-fade-in">
              {currentImage.subheading}
            </p>
            <div className="space-x-4">
              <Button className="bg-red-600 hover:bg-red-700 animate-bounce">
                Sign Up
              </Button>
              <Button variant="outline" className="animate-pulse">
                Contact Us
              </Button>
            </div>
          </div>
          <div
            className="hero-image w-1/3 h-96 border-4 border-white rounded-lg overflow-hidden relative animate-slide-in"
            style={{
              transition: "border 0.5s ease-in-out",
            }}
          >
            <img
              src={currentImage.src}
              alt="Hero"
              className="w-full h-full object-cover"
              style={{
                transition: "opacity 1s ease-in-out",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-center">
              <h2 className="text-2xl font-bold text-white animate-fade-in">
                {currentImage.title}
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <section className="overview bg-gray-100 py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 animate-fade-in">
            Immerse Yourself in the World of Literature, Cinema, and Travel
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto animate-fade-in">
            Explore captivating worlds of literature, cinema, and travel all in one place.{" "}
            <i>InsightRater</i> is your go-to destination for insightful and diverse reviews.
          </p>
        </div>
      </section>

      {/* Categories Section */}
   <Categories/>
    </main>
  );
}