// app/page.js

'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
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

  const formatContent = (content) => {
    return content.replace(/\n/g, '<br>'); // Replace newlines with <br> tags for line breaks
  };

  return (
    <div>
      <main>
        {posts.map((post) => (
          <article key={post._id} className={styles.article}>
            <div className={styles.articleImageContainer}>
              <Image
                src={post.image}
                alt={`Post Image ${post._id}`}
                layout="fill" // Use the fill layout to ensure the image covers the container
                className={styles.articleImage}
              />
            </div>
            <div className={styles.articleContent}>
              <h2>{post.title}</h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: formatContent(post.content),
                }}
              />
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
