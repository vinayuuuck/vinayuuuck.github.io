import { ArticleData } from "../../../utils/types";
import {
  getArticleData,
  getSortedArticlesData,
} from "../../../utils/articleUtils";
import ArticleContent from "./ArticleContent";

interface ArticlePageProps {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const articles = getSortedArticlesData();
  return articles.map((article) => ({
    id: article.id,
  }));
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const articleData: ArticleData = await getArticleData(params.id);

  return (
    <div className="article-content mx-auto prose">
      <ArticleContent articleData={articleData} />
    </div>
  );
}
