'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './page.module.css';

async function fetchPost(id) {
  const res = await fetch(`/api/blogs/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default function BlogDetail({ params }) {
  const { id } = params;
  const [post, setPost] = useState(null);

  useEffect(() => {
    if (id) {
      fetchPost(id).then(setPost).catch(console.error);
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h1>{post.title}</h1>
      <div className={styles.content}>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
