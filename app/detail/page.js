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

  return <div></div>;
}
