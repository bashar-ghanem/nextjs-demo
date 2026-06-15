import Link from 'next/link';
import Image from 'next/image';
import { getAllAuthors, getBooksByAuthorId } from '@/lib/data';

const AUTHORS_PER_PAGE = 3;

export default async function AuthorsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
  }>;
}) {
  const { page } = await searchParams;
  const authors = getAllAuthors();
  const totalPages = Math.max(1, Math.ceil(authors.length / AUTHORS_PER_PAGE));
  const parsedPage = Number(page ?? '1');
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0
      ? Math.min(parsedPage, totalPages)
      : 1;
  const startIndex = (currentPage - 1) * AUTHORS_PER_PAGE;
  const pagedAuthors = authors.slice(startIndex, startIndex + AUTHORS_PER_PAGE);

  function createPageUrl(page: number) {
    return page > 1 ? `/authors?page=${page}` : '/authors';
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Authors
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pagedAuthors.map((author) => {
          const bookCount = getBooksByAuthorId(author.id).length;
          
          return (
            <Link 
              key={author.id} 
              href={`/authors/${author.id}`}
              className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 flex-shrink-0">
                    <Image
                      src={author.imageUrl}
                      alt={author.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-1">
                      {author.name}
                    </h2>
                    <p className="text-sm text-zinc-500 dark:text-zinc-500">
                      {author.nationality}
                    </p>
                  </div>
                </div>
                
                <p className="text-zinc-700 dark:text-zinc-300 mb-4 line-clamp-3">
                  {author.bio}
                </p>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-zinc-600 dark:text-zinc-400">
                    Born: {author.birthYear}
                  </span>
                  <span className="bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full text-zinc-700 dark:text-zinc-300">
                    {bookCount} {bookCount === 1 ? 'book' : 'books'}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {totalPages > 1 && (
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

          <span className="text-zinc-700 dark:text-zinc-300">
            {currentPage} / {totalPages}
          </span>

          {currentPage < totalPages ? (
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
