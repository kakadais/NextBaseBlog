import Link from 'next/link';
import styles from './page.module.css';

async function fetchPost(id) {
  const res = await fetch(`http://localhost:3000/api/post/${id}`, {
    cache: 'no-store', // Ensures the data is fetched on every request
  });
  if (!res.ok) {
    throw new Error('Failed to fetch post');
  }
  return res.json();
}

export default async function BlogDetail({ params }) {
  const { id } = params;
  const post = await fetchPost(id);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{post.title}</h1>
      <div>
        <p>{post.content}</p>
      </div>
      <Link href={`/post/${id}/edit`}>Edit</Link>
    </div>
  );
}
