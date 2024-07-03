import {
  getArticleData,
  getSortedArticlesData,
} from "../../../utils/articleUtils";
import ReactMarkdown from "react-markdown";

export default function Article({ params }: { params: { id: string } }) {
  const articleData = getArticleData(params.id);
  return (
    <div className="article-content mx-auto prose lg:prose-xl">
      <h1 className="text-3xl font-bold mb-4">{articleData.title}</h1>
      <p className="text-gray-500 mb-4">{articleData.date}</p>
      <ReactMarkdown>{articleData.content}</ReactMarkdown>
    </div>
  );
}

export function generateStaticParams() {
  const posts = getSortedArticlesData();
  return posts.map((post) => ({
    id: post.id,
  }));
}
