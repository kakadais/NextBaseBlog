'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import styles from './page.module.css';
import '../quill.css'; // Import the global Quill styles

const QuillNoSSR = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link', 'image'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'link',
  'image',
];

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      title,
      content,
      image: 'https://picsum.photos/100', // You can replace this with actual image upload later
    };

    try {
      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        alert('Post created successfully!');
        setTitle('');
        setContent('');
      } else {
        alert('Failed to create post');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the post');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="content">Content:</label>
          <QuillNoSSR
            value={content}
            onChange={setContent}
            modules={modules}
            formats={formats}
            theme="snow"
          />
        </div>
        <button type="submit" className={styles.submitButton}>
          Create Post
        </button>
      </form>
    </div>
  );
}
