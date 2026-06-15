'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { Book, Author } from '@/lib/data';

interface BooksClientProps {
  initialBooks: Book[];
  authors: Author[];
  selectedGenre?: string;
  selectedPage?: number;
}

const BOOKS_PER_PAGE = 6;

export default function BooksClient({ initialBooks, authors, selectedGenre, selectedPage }: BooksClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const currentPage = selectedPage ?? 1;

  function createPageUrl(page: number) {
    const params = new URLSearchParams();
    
    if (selectedGenre && selectedGenre !== 'all') {
      params.set('genre', selectedGenre);
    }
    
    if (page && page > 1) {
      params.set('page', String(page));
    }
    
    return `/books?${params.toString()}`;
}

  // Get unique genres
  const genres = useMemo(() => {
    const genreSet = new Set(initialBooks.map(book => book.genre));
    return ['all', ...Array.from(genreSet)];
  }, [initialBooks]);

  // Filter books based on search and genre
  const {pagedFilteredBooks, totalFilteredBooks} = useMemo(() => {
    const filteredBooks = initialBooks.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           authors.find(a => a.id === book.authorId)?.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = !selectedGenre || selectedGenre === 'all' || book.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    });
    const totalFilteredBooks = filteredBooks.length;
    const startIndex = (currentPage - 1) * BOOKS_PER_PAGE;
    const pagedFilteredBooks = filteredBooks.slice(startIndex, startIndex + BOOKS_PER_PAGE);
    return { pagedFilteredBooks, totalFilteredBooks };
  }, [initialBooks, searchQuery, selectedGenre, authors, currentPage]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Books
      </h1>

      <SearchBar 
        onSearch={setSearchQuery}
        placeholder="Search by title or author..."
      />

      {/* Genre Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <Link key={genre} href={genre === 'all' ? '/books' : `/books?genre=${encodeURIComponent(genre)}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  genre === (selectedGenre || 'all')
                  ? 'bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {genre === 'all' ? 'All Genres' : genre}
            </Link>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
        Showing {pagedFilteredBooks.length} {pagedFilteredBooks.length === 1 ? 'book' : 'books'}
      </p>
      
      {totalFilteredBooks === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-zinc-600 dark:text-zinc-400">
            No books found matching your criteria.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pagedFilteredBooks.map((book) => {
            const author = authors.find(a => a.id === book.authorId);
            
            return (
              <Link 
                key={book.id} 
                href={`/books/${book.id}`}
                className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-80 bg-zinc-200 dark:bg-zinc-800">
                  <Image
                    src={book.coverUrl}
                    alt={`Cover of ${book.title}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50 mb-2">
                    {book.title}
                  </h2>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                    by {author?.name}
                  </p>
                  <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-500">
                    <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                      {book.genre}
                    </span>
                    <span>{book.publishedYear}</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
      {/* Pagination */}
      {totalFilteredBooks > 0 && (
        <div className="flex justify-center items-center mt-8 gap-4">
          {currentPage > 1 ? (
            <Link
              href={createPageUrl(currentPage - 1)}
              className="px-4 py-2 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-400 dark:hover:bg-zinc-700"
            >
              Previous
            </Link>
          ) : (
            <span className="px-4 py-2 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
              Previous
            </span>
          )}
          <span className="text-zinc-700 dark:text-zinc-300"> {currentPage}</span>
          {pagedFilteredBooks.length === BOOKS_PER_PAGE ? (
            <Link
              href={createPageUrl(currentPage + 1)}
              className="px-4 py-2 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-400 dark:hover:bg-zinc-700"
            >
              Next
            </Link>
          ) : (
            <span className="px-4 py-2 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-not-allowed">
              Next
            </span>
          )}
        </div>
      )}
    </div>
  );
}
