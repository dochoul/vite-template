import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8001/posts/',
});

export async function getPosts({ _limit, _sort, _order }) {
  const response = await instance.get(`?_sort=${_sort}&_order=${_order}&_limit=${_limit}`);
  return response;
}

export async function getPostById(id) {
  const response = await instance.get(`${id}`);
  return response;
}

export async function deletePost(id) {
  const response = await instance.delete(`${id}`);
  return response;
}

export async function createPost(data) {
  const response = await instance.post('', data);
  return response;
}
