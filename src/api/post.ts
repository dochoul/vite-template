import axios from 'axios';
import { SetInterceptors } from './common/interceptors';

function createInstance() {
  const instance = axios.create({
    baseURL: 'http://localhost:8001/posts/',
  });

  return SetInterceptors(instance);
}

const instance = createInstance();

type FetchProps = {
  _sort: string;
  _limit: number;
  _order: string;
  _page: number;
  title_like: string;
};

export async function fetchPosts({ _sort, _limit, _order, _page, title_like }: FetchProps) {
  const response = await instance.get(
    `?_sort=${_sort}&_order=${_order}&_limit=${_limit}&title_like=${title_like}&_page=${_page}`
  );
  return response;
}

export async function fetchPostById(id: number) {
  const response = await instance.get(`${id}`);
  return response;
}

export async function deletePost(id: number) {
  const response = await instance.delete(`${id}`);
  return response;
}

export async function login(data) {
  const response = await axios.post('https://reqres.in/api/login', data);
  return response;
}

type CreatedProps = {
  title: string;
  content: string;
  createdAt: string;
};
export async function createPost({ title, content, createdAt }: CreatedProps) {
  const response = await instance.post('', { title, content, createdAt });
  return response;
}

type EditProps = {
  title: string;
  content: string;
  editedAt: string;
};
export async function editPost(id: number, { title, content, editedAt }: EditProps) {
  const response = await instance.patch(`${id}`, { title, content, editedAt });
  return response;
}

// export async function editPost({
//   title,
//   content,
//   createdAt,
// }: {
//   title: string;
//   content: string;
//   createdAt: Date;
// }) {
//   const response = await instance.patch(`${id}`, { title, content, createdAt });
//   return response;
// }
