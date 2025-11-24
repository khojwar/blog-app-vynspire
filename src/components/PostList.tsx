"use client";

import { useAuth } from '@/hooks/useAuth';
import { usePosts } from '../hooks/usePosts';
import { Button, CircularProgress, Pagination } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const PostList = () => {
  const { posts, loading, error, removePost } = usePosts();
  const {isAuthenticated} = useAuth();

  const router = useRouter();

  const [page, setPage] = useState<number>(1);
  const PAGE_SIZE = 8;
  const totalPages = Math.max(1, Math.ceil(posts.length / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(1);
  }, [page, totalPages]);

  if (loading) return (<div className='flex justify-center items-center h-screen'><CircularProgress /></div>);
  if (error) return <p className="text-red-500">{error}</p>;

  const start = (page - 1) * PAGE_SIZE;
  const paginatedPosts = posts.slice(start, start + PAGE_SIZE);

  return (
    <div className='flex flex-col justify-center items-center m-4'>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
          {paginatedPosts.map((post) => (
            <li key={post.id} className="p-4 border rounded flex flex-col justify-between h-full">
              <h2 className="text-xl font-bold pb-2">
                {(() => {
                  const words = post.title.trim().split(/\s+/);
                  const preview = words.slice(0, 7).join(' ');
                  return words.length > 7 ? preview + ' …' : preview;
                })()}
              </h2>
              <p>{post.body}</p>

              {isAuthenticated && (
                <div className="mt-4 flex gap-2">
                  <Button onClick={() => router.push(`posts/${post.id}/edit`)} variant="outlined" >Edit</Button>
                  <Button onClick={() => removePost(post.id)} variant="outlined" color="error">Delete</Button>
                </div>
              )}

            </li>
          ))}
        </ul>

        <div className="mt-6">
          <Pagination
            count={totalPages}
            page={page}
            onChange={(_e, value) => setPage(value)}
            color="primary"
          />
        </div>
    </div>
  );
};

export default PostList;