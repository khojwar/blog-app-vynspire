import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';
import { fetchPosts, addPost, updatePost, deletePost, setSearchTerm } from '../store/postSlice';
import { useEffect } from 'react';

export const usePosts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error, searchTerm } = useSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const createPost = (newPost: { title: string; body: string }) => dispatch(addPost(newPost));
  const editPost = (updatedPost: { id: number; title: string; body: string }) => dispatch(updatePost(updatedPost));
  const removePost = (id: number) => dispatch(deletePost(id));
  const setSearchQuery = (q: string) => dispatch(setSearchTerm(q));

  const normalized = (s: string) => s.trim().toLowerCase();
  const filteredPosts = searchTerm
    ? posts.filter((p: any) => {
        const q = normalized(searchTerm);
        return (
          normalized(p.title).includes(q) ||
          normalized(p.body).includes(q)
        );
      })
    : posts;

  return { posts: filteredPosts, loading, error, createPost, editPost, removePost, setSearchQuery };
};