"use client";

import { usePosts } from '../hooks/usePosts';
import { Button, CircularProgress } from '@mui/material';
import { useRouter } from 'next/navigation';

const PostList = () => {
  const { posts, loading, error, removePost } = usePosts();
  const router = useRouter();

  if (loading) return <CircularProgress />;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <ul className="space-y-4">
      {posts.map((post) => (
        <li key={post.id} className="p-4 border rounded">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.body}</p>
          <Button onClick={() => router.push(`/edit/${post.id}`)}>Edit</Button>
          <Button onClick={() => removePost(post.id)} color="error">Delete</Button>
        </li>
      ))}
    </ul>
  );
};

export default PostList;