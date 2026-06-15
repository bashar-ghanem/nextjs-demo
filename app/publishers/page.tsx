import Link from "next/link";
import { getAllPublishers, getBooksByPublisherId, Publisher } from "@/lib/data";

type SortKey = "name" | "country" | "foundedYear" | "bookCount";
type SortDirection = "asc" | "desc";

const sortLabels: Record<SortKey, string> = {
  name: "Name",
  country: "Country",
  foundedYear: "Founded",
  bookCount: "Books Published",
};

function isSortKey(value: string | undefined): value is SortKey {
  return (
    value === "name" ||
    value === "country" ||
    value === "foundedYear" ||
    value === "bookCount"
  );
}

function isSortDirection(value: string | undefined): value is SortDirection {
  return value === "asc" || value === "desc";
}

function getBookCount(publisher: Publisher) {
  return getBooksByPublisherId(publisher.id).length;
}

export default async function PublishersPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    sort?: string;
    direction?: string;
  }>;
}) {
  const params = await searchParams;
  const selectedName = params.search?.trim() ?? "";
  const sortKey = isSortKey(params.sort) ? params.sort : "name";
  const sortDirection = isSortDirection(params.direction)
    ? params.direction
    : "asc";
  const directionMultiplier = sortDirection === "asc" ? 1 : -1;

  function createSortUrl(nextSortKey: SortKey) {
    const nextDirection: SortDirection =
      sortKey === nextSortKey && sortDirection === "asc" ? "desc" : "asc";
    const nextParams = new URLSearchParams();

    if (selectedName) {
      nextParams.set("search", selectedName);
    }

    nextParams.set("sort", nextSortKey);
    nextParams.set("direction", nextDirection);

    return `/publishers?${nextParams.toString()}`;
  }

  function getSortLabel(nextSortKey: SortKey) {
    if (sortKey !== nextSortKey) {
      return sortLabels[nextSortKey];
    }

    return `${sortLabels[nextSortKey]} ${ sortDirection === 'asc' ? '↑' : '↓'}`;
  }

  const selectedNameLower = selectedName.toLowerCase();
  const publishers = getAllPublishers()
    .filter((publisher) =>
      publisher.name.toLowerCase().includes(selectedNameLower)
    )
    .sort((a, b) => {
      let comparison = 0;

      if (sortKey === "name") {
        comparison = a.name.localeCompare(b.name);
      } else if (sortKey === "country") {
        comparison = a.country.localeCompare(b.country);
      } else if (sortKey === "foundedYear") {
        comparison = a.foundedYear - b.foundedYear;
      } else {
        comparison = getBookCount(a) - getBookCount(b);
      }

      return comparison * directionMultiplier;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-8">
        All Publishers
      </h1>

      <form action="/publishers" className="mb-8">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            name="search"
            defaultValue={selectedName}
            placeholder="Filter publishers by name..."
            className="w-full px-4 py-3 rounded-lg border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:focus:ring-zinc-400"
          />
          <input type="hidden" name="sort" value={sortKey} />
          <input type="hidden" name="direction" value={sortDirection} />
          <button
            type="submit"
            className="px-6 py-3 rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors"
          >
            Filter
          </button>
          {selectedName && (
            <Link
              href={`/publishers?sort=${sortKey}&direction=${sortDirection}`}
              className="px-6 py-3 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors text-center"
            >
              Clear
            </Link>
          )}
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-700">
              {(Object.keys(sortLabels) as SortKey[]).map((key) => (
                <th key={key} className="py-3 px-4 font-semibold">
                  <Link
                    href={createSortUrl(key)}
                    className="hover:text-zinc-600 dark:hover:text-zinc-300"
                  >
                    {getSortLabel(key)}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {publishers.map((publisher) => {
              const bookCount = getBookCount(publisher);

              return (
                <tr
                  key={publisher.id}
                  className="border-b border-zinc-100 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900"
                >
                  <td className="py-3 px-4">
                    <Link
                      href={`/publishers/${publisher.id}`}
                      className="font-medium text-zinc-900 dark:text-zinc-50 hover:underline"
                    >
                      {publisher.name}
                    </Link>
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.country}
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                    {publisher.foundedYear}
                  </td>
                  <td className="py-3 px-4 text-zinc-600 dark:text-zinc-400">
                    {bookCount} {bookCount === 1 ? "book" : "books"}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {publishers.length === 0 && (
        <p className="text-center text-zinc-600 dark:text-zinc-400 py-12">
          No publishers found matching your filter.
        </p>
      )}
    </div>
  );
}
