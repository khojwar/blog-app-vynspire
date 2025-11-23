"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";


interface Post {
  id: number;
  title: string;
  body: string;
}

interface PostState {
  posts: Post[];
  loading: boolean;
  error: string | null;
}

const initialState: PostState = {
  posts: [],
  loading: false,
  error: null,
};


// Fetch all posts
export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (_, thunkAPI) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await response.json();
        return data.posts;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to fetch posts");
    }
    }
);

// Add new post
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (post: Post, thunkAPI) => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to add post");
    }
});

// update post
export const updatePost = createAsyncThunk(
  "posts/updatePost",
    async (post: Post, thunkAPI) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();
      return data.post;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to update post");
    }
});

// delete post
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId: number, thunkAPI) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: "DELETE",
      });
      return postId;
    } catch (error) {
      return thunkAPI.rejectWithValue("Failed to delete post");
    }
});


const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchPosts.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPosts.fulfilled, (state, action: PayloadAction<Post[]>) => {
            state.loading = false;
            state.posts = action.payload;
        })
        .addCase(fetchPosts.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Add Post
        .addCase(addPost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(addPost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.loading = false;
            state.posts.push(action.payload);
        })
        .addCase(addPost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Update Post
        .addCase(updatePost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(updatePost.fulfilled, (state, action: PayloadAction<Post>) => {
            state.loading = false;
            const index = state.posts.findIndex(post => post.id === action.payload.id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        })
        .addCase(updatePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })

        // Delete Post
        .addCase(deletePost.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(deletePost.fulfilled, (state, action: PayloadAction<number>) => {
            state.loading = false;
            state.posts = state.posts.filter(post => post.id !== action.payload);
        })
        .addCase(deletePost.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        });
    },
});

export default postSlice.reducer;


