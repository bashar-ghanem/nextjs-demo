import { getAllBooks, getAllAuthors } from '@/lib/data';
import BooksClient from '@/components/BooksClient';

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Promise<{genre?: string}>;
}) {
  const { genre } = await searchParams;
  const books = getAllBooks();
  const authors = getAllAuthors();

  return <BooksClient initialBooks={books} authors={authors} selectedGenre={genre} />;
}
