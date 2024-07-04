'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch('/api/blogs');
      const blogData = await res.json();
      setBlogs(blogData);
    };

    fetchBlogs();
  }, []);

  return (
    <div>
      <main>
        {blogs.map((blog) => (
          <article key={blog._id} className={styles.article}>
            <Image
              src={blog.image}
              alt={`Blog Image ${blog._id}`}
              width={100}
              height={100}
              className={styles.articleImage}
            />
            <div className={styles.articleContent}>
              <h2>{blog.title}</h2>
              <div dangerouslySetInnerHTML={{ __html: blog.content }} />
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
