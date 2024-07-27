import clientPromise from '../../../lib/mongodb';

export async function GET(request) {
  const client = await clientPromise;
  const db = client.db('blog');
  const collection = db.collection('posts');

  // Fetch data from the collection, sorted by createdAt in descending order
  const blogs = await collection.find({}).sort({ createdAt: -1 }).toArray();

  return new Response(JSON.stringify(blogs), {
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request) {
  try {
    const client = await clientPromise;
    const db = client.db('blog');
    const collection = db.collection('posts');

    const postData = await request.json();

    // Validate the incoming data
    if (!postData.title || !postData.content) {
      return new Response(
        JSON.stringify({ error: 'Title and content are required' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    // Add createdAt timestamp
    postData.createdAt = new Date();

    // Insert the new post
    const result = await collection.insertOne(postData);

    if (result.acknowledged) {
      return new Response(
        JSON.stringify({
          message: 'Post created successfully',
          postId: result.insertedId,
        }),
        {
          status: 201,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    } else {
      throw new Error('Failed to insert post');
    }
  } catch (error) {
    console.error('Error creating post:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
