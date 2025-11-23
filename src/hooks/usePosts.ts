import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPosts, addPost, updatePost, deletePost } from '../store/postSlice';
import { useEffect } from 'react';

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const createPost = (newPost: { title: string; body: string }) => dispatch(addPost(newPost));
  const editPost = (updatedPost: { id: number; title: string; body: string }) => dispatch(updatePost(updatedPost));
  const removePost = (id: number) => dispatch(deletePost(id));

  return { posts, loading, error, createPost, editPost, removePost };
};