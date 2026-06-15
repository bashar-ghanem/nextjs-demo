export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="h-10 w-56 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-md overflow-hidden"
          >
            <div className="p-6 animate-pulse">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 rounded-full bg-zinc-200 dark:bg-zinc-800 flex-shrink-0" />
                <div className="flex-1">
                  <div className="h-7 w-3/4 bg-zinc-200 dark:bg-zinc-800 rounded mb-3" />
                  <div className="h-4 w-1/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-11/12 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-800 rounded" />
              </div>

              <div className="flex items-center justify-between">
                <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-800 rounded" />
                <div className="h-7 w-20 bg-zinc-200 dark:bg-zinc-800 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
