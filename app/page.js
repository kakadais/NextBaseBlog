'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function News() {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      const res = await fetch('/api/news');
      const newsData = await res.json();
      setNews(newsData);
    };

    fetchNews();
  }, []);

  return (
    <div>
      <main>
        {news.map((article) => (
          <article key={article.id} className={styles.article}>
            <Image
              src={article.image}
              alt={`News Image ${article.id}`}
              width={100}
              height={100}
              className={styles.articleImage}
            />
            <div className={styles.articleContent}>
              <h2>{article.title}</h2>
              <p>{article.content}</p>
              <p>
                <a href="#">Read more...</a>
              </p>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
