type ArticleJsonLdProps = {
  title: string;
  description: string;
  path: string;
  published: string;
  modified: string;
};

const BASE_URL = "https://www.dailypicklab.com";

export default function ArticleJsonLd({
  title,
  description,
  path,
  published,
  modified,
}: ArticleJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: published,
    dateModified: modified,
    inLanguage: "ko-KR",
    mainEntityOfPage: `${BASE_URL}${path}`,
    author: {
      "@type": "Organization",
      name: "Daily Pick Lab 편집팀",
      url: `${BASE_URL}/about`,
    },
    publisher: {
      "@type": "Organization",
      name: "Daily Pick Lab",
      url: BASE_URL,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
