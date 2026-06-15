import { getPublisherById } from "@/lib/data";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function PublishersPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const publisher = getPublisherById(parseInt(id));

    if (!publisher) {
        notFound();
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link href="/publishers" className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 mb-6 inline-block">
                ← Back to Publishers
            </Link>
            <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-lg p-8 mt-6">   
                <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50 mb-4">
                    {publisher.name}
                </h1>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                    Country: {publisher.country}
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                    Founded: {publisher.foundedYear}
                </p>
                <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-4">
                    Website: <a href={publisher.website} className="text-blue-600 dark:text-blue-400 hover:underline" target="_blank" rel="noopener noreferrer">
                        {publisher.website}
                    </a>
                </p>
            </div>
        </div>
    )
}

