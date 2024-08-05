'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { usePathname } from 'next/naviation'; 
import { useEffect, useState } from 'react';

async function fetchPsts() { 
  const res = await fetch('http://localhost:3000/api/post', {
    cache: 'no-store',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default function Page() {
  const [posts, setPosts] = useState([]);
  const pathname = usePathname();

  const loadPosts = async () => {
    const posts = await fetchPsts(); 
    setPosts(posts);
  };

  useEffect(() => {
    loadPosts();
  }, [pathname]);

  return (
    <div>
      <main>
        {posts.map((post) => (
          <article key={post._id} className={styles.atricle}> 
            <div className={styles.articleContent}>
              <Link href={`/detail/${post._id}`}>{post.title}</Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
