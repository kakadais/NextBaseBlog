import clientPromise from '../lib/mongodb';
const client = await clientPromise;
const db = client.db('blog');
const collection = db.collection('posts');

// Check if the collection has data
const count = await collection.countDocuments();
if (count === 0) {
  // Insert dummy data if the collection is empty
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    createdAt: new Date(),
    title: `Blog Post ${index + 1}`,
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`,
    image: 'https://picsum.photos/100',
  }));

  await collection.insertMany(dummyData);
}
