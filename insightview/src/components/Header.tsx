// components/Header.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
// import { Button } from "./ui/button";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 flex flex-col md:flex-row justify-between items-center p-4 backdrop-blur-md bg-opacity-90 bg-black z-50">
      <div className="w-full md:w-auto flex justify-between items-center">
        <div className="text-3xl font-bold bg-gray-800 rounded-lg px-4 py-2">
          <span className="text-red-600">Insight</span>
          <span className="text-white">ter</span>
        </div>
        
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {(isMenuOpen || window.innerWidth >= 768) && (
        <div className="w-full md:w-auto mt-4 md:mt-0">
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <li>
              <Link
                href="/"
                className="block text-white hover:bg-gray-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="relative group">
              <Link
                href="#"
                className="block text-white hover:bg-gray-700 px-4 py-2 rounded"
              >
                Reviews
              </Link>
              <ul className="md:absolute md:hidden group-hover:md:block bg-gray-800 mt-2 rounded-lg ml-4 md:ml-0">
                <li>
                  <Link
                    href="/movies"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Movie Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/books"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Literature Reviews
                  </Link>
                </li>
                <li>
                  <Link
                    href="/place"
                    className="block px-4 py-2 text-white hover:bg-gray-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Place Reviews
                  </Link>
                </li>
              </ul>
            </li>
            <li>
             
            </li>
            <li>
             
            </li>
            <li>
              <Link
                href="/profile"
                className="block text-white hover:bg-gray-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}