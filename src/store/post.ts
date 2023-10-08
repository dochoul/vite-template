import { create } from 'zustand';
//import axios from 'axios';
import { fetchPosts, fetchPostById } from '../api/post';

type Props = {
  _limit: number;
  _sort: string;
  _order: string;
  _page: number;
  title_like: string;
};
type PostProps = {
  posts: [];
  post: {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    editedAt: string;
  };
  totalCount: number;
  isLoading: boolean;
  getPosts: (params: Props) => void;
  getPost: (id: number) => void;
};

export const usePostStore = create<PostProps>((set) => ({
  posts: [],
  post: {
    id: 0,
    title: '',
    content: '',
    createdAt: '',
    editedAt: '',
  },
  totalCount: 0,
  isLoading: false,
  getPosts: async (params) => {
    try {
      set({ isLoading: true });
      const response = await fetchPosts(params);
      set({
        isLoading: false,
        posts: response.data,
        totalCount: response.headers['x-total-count'],
      });
    } catch (err: any) {
      set({ err: err.message, isLoading: false });
    }
  },
  getPost: async (id) => {
    try {
      set({ isLoading: true });
      const response = await fetchPostById(id);
      set({ isLoading: false, post: response.data });
    } catch (err: any) {
      set({ err: err.message, isLoading: false });
    }
  },
}));
