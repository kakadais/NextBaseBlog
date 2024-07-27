'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './page.module.css';

async function fetchPost(id) {
  const res = await fetch(`/api/post/${id}`);
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
    <div>
      <h1>{post.title}</h1>
      <div>
        <p>{post.content}</p>
      </div>
      <Link href={`/post/${id}`}>Edit</Link>
    </div>
  );
}
