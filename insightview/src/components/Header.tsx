import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <nav className="fixed top-0 left-0 right-0 flex justify-between items-center p-4 backdrop-blur-md bg-opacity-90 transition-colors hover:bg-gray-900 bg-black z-50">
      <div className="text-3xl font-bold bg-gray-800 rounded-lg px-4 py-2">
        <span className="text-red-600">Insight</span>
        <span className="text-white">ter</span>
      </div>
      <ul className="flex space-x-6">
        <li>
          <Link
            href="/"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            Home
          </Link>
        </li>
        <li className="relative group">
          <Link
            href="#"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            Reviews
          </Link>
          <ul className="absolute hidden group-hover:block bg-gray-800 mt-2 rounded-lg">
            <li>
              <Link
                href="/movies"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Movie Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Literature Reviews
              </Link>
            </li>
            <li>
              <Link
                href="/place"
                className="block px-4 py-2 text-white hover:bg-gray-700"
              >
                Place Reviews
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link
            href="/about"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            About
          </Link>
        </li>
        <li>
          <Link
            href="/contact"
            className="text-white hover:bg-gray-700 px-4 py-2 rounded"
          >
            Contact Us
          </Link>
        </li>
        <li>
          <Button variant="outline" className="text-white">
            Log Out
          </Button>
        </li>
      </ul>
    </nav>
  );
}
