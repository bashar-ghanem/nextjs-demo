import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{
    genre?: string,
    page?: string,
  }>;
}) {
  const { genre, page } = await searchParams;
  const parsedPage = Number(page ?? '1');
  const selectedPage = Number.isFinite(parsedPage) ? Math.max(1, parsedPage) : 1;
  const books = getAllBooks();
  const authors = getAllAuthors();

  return <BooksClient initialBooks={books} authors={authors} selectedGenre={genre} selectedPage={selectedPage} />;
}
