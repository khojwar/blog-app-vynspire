"use client";

import PostForm from '@/components/PostForm';
import PrivateRoute from '@/components/PrivateRoute'
import { usePosts } from '@/hooks/usePosts';
import { useRouter } from 'next/navigation';

const CreatePost = () => {
  const { createPost } = usePosts();
  const router = useRouter();

const handleSubmit = async (data: { title: string; body: string }) => {
    // console.log("create post", data);
    
    await createPost(data);
    router.push(`/dashboard?msg=${encodeURIComponent("Post created successfully")}`);
  };

  return (
    <div className="flex flex-col justify-center items-center m-4 sha">
      <PrivateRoute>
        <PostForm onSubmit={handleSubmit} />
      </PrivateRoute>
    </div>
  )
}

export default CreatePost