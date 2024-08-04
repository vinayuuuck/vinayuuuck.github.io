"use client";

import { useEffect } from "react";
import { ArticleData } from "../../../utils/types";

interface ArticleContentProps {
  articleData: ArticleData;
}

export default function ArticleContent({ articleData }: ArticleContentProps) {
  useEffect(() => {
    if (window.MathJax && typeof window.MathJax.typesetPromise === "function") {
      window.MathJax.typesetPromise();
    }
  }, [articleData.contentHtml]);

  return (
    <div className="mx-auto space-y-4 font-sans">
      <h1 className="text-3xl font-bold mb-6">{articleData.title}</h1>
      <p className="text-black-500 text-sm">{articleData.date}</p>
      <div
        className="markdown-content"
        dangerouslySetInnerHTML={{ __html: articleData.contentHtml }}
      />
    </div>
  );
}
