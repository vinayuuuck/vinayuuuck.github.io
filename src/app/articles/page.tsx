import Link from "next/link";
import { getSortedArticlesData } from "../../utils/articleUtils";

export default function Page() {
  const allArticlesData = getSortedArticlesData();
  const latestFourPosts = allArticlesData.slice(0, 4);

  return (
    <div className="mx-auto space-y-4 font-sans">
      <h1 className="text-3xl font-bold mb-6">Latest Articles</h1>
      {latestFourPosts.map(({ id, date, description, title }) => (
        <div key={id} className="border-b pb-4">
          <Link
            href={`/articles/${id}`}
            className="text-xl font-semibold hover:text-pink-500"
          >
            {title}
          </Link>
          <p className="text-black-500 text-sm">{description}</p>
          <p className="text-black-500 text-sm">{date}</p>
        </div>
      ))}
    </div>
  );
}
