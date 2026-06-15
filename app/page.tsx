import Link from "next/link";
import Image from "next/image";
import { getAllBooksSync, getAllAuthorsSync } from "@/lib/data";

export default function Home() {
  const books = getAllBooksSync().slice(0, 6); // Get first 6 books
  const authors = getAllAuthorsSync();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to BookHub
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 mb-8 max-w-3xl mx-auto">
              A Next.js demo application for exploring books and authors.
              Perfect for learning modern web development with React and
              Next.js.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/books"
                className="bg-white text-zinc-900 px-8 py-3 rounded-lg font-semibold hover:bg-zinc-100 transition-colors"
              >
                Browse Books
              </Link>
              <Link
                href="/authors"
                className="bg-zinc-700 text-white px-8 py-3 rounded-lg font-semibold hover:bg-zinc-600 transition-colors"
              >
                Meet Authors
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {getAllBooksSync().length}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Books Available
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                {authors.length}
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Featured Authors
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-2">
                8
              </div>
              <div className="text-zinc-600 dark:text-zinc-400">
                Literary Genres
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Featured Books
            </h2>
            <Link
              href="/books"
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 font-medium"
            >
              View All →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {books.map((book) => (
              <Link key={book.id} href={`/books/${book.id}`} className="group">
                <div className="relative h-64 bg-zinc-200 dark:bg-zinc-800 rounded-lg overflow-hidden shadow-md group-hover:shadow-xl transition-shadow">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-3 text-sm font-semibold text-zinc-900 dark:text-zinc-50 line-clamp-2">
                  {book.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Features Section */}
      <section className="py-16 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 text-center mb-12">
            What You&apos;ll Learn
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">🚀</div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Next.js App Router
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Learn how to use the modern App Router with server and client
                components.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">🎨</div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Dynamic Routing
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                Explore dynamic routes with parameters for books and author
                pages.
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800 p-6 rounded-lg">
              <div className="text-3xl mb-4">💾</div>
              <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-3">
                Data Management
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400">
                See how to structure and manage in-memory data without a
                database.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
