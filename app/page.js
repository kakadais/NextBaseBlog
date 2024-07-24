'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

export default function BlogList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch('/api/blogs');
      const postData = await res.json();
      setPosts(postData);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <main>
        {posts.map((post) => (
          <article key={post._id} className={styles.article}>
            <div className={styles.articleContent}>
              <h2>{post.title}</h2>
              <Link href={`/detail/${post._id}`}>Read more...</Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
