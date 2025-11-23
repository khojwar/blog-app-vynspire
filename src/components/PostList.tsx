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
    <div className='flex justify-center items-center m-4'>
        <ul className="space-y-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded">
              <h2 className="text-xl font-bold pb-2">
                {(() => {
                  const words = post.title.trim().split(/\s+/);
                  const preview = words.slice(0, 7).join(' ');
                  return words.length > 7 ? preview + ' …' : preview;
                })()}
              </h2>
              <p>{post.body}</p>

              <div className="mt-4 flex gap-2">
                  <Button onClick={() => router.push(`/edit/${post.id}`)} variant="outlined" >Edit</Button>
                  <Button onClick={() => removePost(post.id)} variant="outlined" color="error">Delete</Button>
              </div>

            </li>
          ))}
        </ul>
    </div>
  );
};

export default PostList;