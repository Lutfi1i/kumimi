"use client";

import Image from "next/image";
import { useEffect } from "react";
import { gsap } from "gsap";

// Dummy data for featured manga
const featuredManga = [
  { id: 1, title: "Attack on Titan", image: "https://picsum.photos/id/200/300/400" },
  { id: 2, title: "Jujutsu Kaisen", image: "https://picsum.photos/id/201/300/400" },
  { id: 3, title: "One Piece", image: "https://picsum.photos/id/202/300/400" },
  { id: 4, title: "Chainsaw Man", image: "https://picsum.photos/id/203/300/400" },
];

export default function Home() {
  useEffect(() => {
    // GSAP animation for the hero section
    gsap.fromTo(
      ".hero-title",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-description",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      ".hero-button",
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
    );
    gsap.fromTo(
      ".featured-manga-card",
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.7)", stagger: 0.2, delay: 1 }
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white font-sans overflow-x-hidden">
      {/* Hero Section */}
      <section
        className="relative h-screen flex items-center justify-center text-center bg-cover bg-center"
        style={{ backgroundImage: "url('https://picsum.photos/id/204/1600/900')" }} // External Placeholder background image
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative z-10 p-8">
          <h1 className="hero-title text-5xl md:text-7xl font-extrabold mb-4 animate-fade-in-up text-red-500 drop-shadow-lg">
            Dive into the World of Manga
          </h1>
          <p className="hero-description text-xl md:text-2xl mb-8 animate-fade-in-up delay-300 text-gray-200">
            Discover your next favorite story.
          </p>
          <button className="hero-button bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 ease-in-out transform hover:scale-105 animate-fade-in-up delay-600">
            Explore Manga
          </button>
        </div>
      </section>

      {/* Featured Manga Section */}
      <section className="py-20 px-4 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12 text-red-400">
          Featured Manga
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {featuredManga.map((manga) => (
            <div
              key={manga.id}
              className="featured-manga-card relative h-96 bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 border-2 border-red-700"
            >
              <Image
                src={manga.image}
                alt={manga.title}
                fill // Use fill for responsive sizing
                style={{ objectFit: "cover" }} // Apply objectFit via style prop
                className="w-full h-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative p-4 z-10 flex flex-col justify-end h-full">
                <h3 className="text-2xl font-bold mb-2 text-white drop-shadow-md">
                  {manga.title}
                </h3>
                <p className="text-gray-300 text-sm">
                  A gripping tale of adventure and survival.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
