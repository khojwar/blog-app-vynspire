'use client';

import PostForm from '@/components/PostForm'
import PrivateRoute from '@/components/PrivateRoute'
import { usePosts } from '@/hooks/usePosts';
import { useParams, useRouter } from 'next/dist/client/components/navigation';
import { useEffect, useState } from 'react';


const EditPost = () => {

    const params = useParams();
    console.log("params: ", params);
    
    const id = Number(params.id);
    const { posts, editPost } = usePosts();
    const router = useRouter();
    const [initialValues, setInitialValues] = useState<{ title: string; body: string } | undefined>();

    useEffect(() => {
        const post = posts.find((p) => p.id === id);
        if (post) setInitialValues({ title: post.title, body: post.body });
    }, [id, posts]);

  const handleSubmit = (data: { title: string; body: string }) => {
    editPost({ id, ...data });
    router.push(`/dashboard?msg=${encodeURIComponent('Post updated successfully!')}`);
  };

  if (!initialValues) return <p>Loading...</p>;


  return (
    <div>
      <PrivateRoute>
        <PostForm initialValues={initialValues} onSubmit={handleSubmit} />
      </PrivateRoute>
    </div>
  )
}

export default EditPost