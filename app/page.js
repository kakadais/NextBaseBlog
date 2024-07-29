import Link from 'next/link';
import styles from './page.module.css';

async function fetchPosts() {
  const res = await fetch('http://localhost:3000/api/post', {
    cache: 'no-store', // Ensures the data is fetched on every request
  });
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  return res.json();
}

export default async function Page() {
  const posts = await fetchPosts();

  return (
    <div>
      <main>
        {posts.map((post) => (
          <article key={post._id} className={styles.article}>
            <div className={styles.articleContent}>
              <Link href={`/detail/${post._id}`}>{post.title}</Link>
            </div>
          </article>
        ))}
      </main>
    </div>
  );
}
