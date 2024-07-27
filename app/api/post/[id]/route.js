import clientPromise from '../../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  const client = await clientPromise;
  const db = client.db('blog');
  const collection = db.collection('posts');

  const { id } = params;

  if (!ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ error: 'Invalid post ID' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (!post) {
    return new Response(JSON.stringify({ error: 'Post not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify(post), {
    headers: { 'Content-Type': 'application/json' },
  });
}
