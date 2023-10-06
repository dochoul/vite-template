import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleGrid, Divider } from '@mantine/core';
import { PostProps } from '../../types/defines';
import { getPosts } from '../../api/post';
import { PostItem } from '../../components/posts/PostItem';
import { PostFilter } from '../../components/posts/PostFilter';

export function ListView() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>(''); //* 제목으로 검색
  const [limit, setLimit] = useState<number>(3); //* 몇개씩 보여줄거니?
  const [order, setOrder] = useState<string>('desc'); //* 내림차순(default)으로 정렬

  const params = {
    _limit: Number(limit),
    _sort: 'createdAt',
    _order: order,
    title_like: search,
  };

  const fetchPosts = async () => {
    try {
      const response = await getPosts(params);
      setPosts(response.data);
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [limit, order, search]);

  return (
    <div className="container">
      <h1>ListView</h1>
      <Link to="/">홈으로 돌아가기</Link>
      <Link to="/posts/write">글쓰기</Link>
      <div>
        <PostFilter limit={setLimit} />
        {/* <Input
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
        />
        <select
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLimit(Number(e.target.value))}
        >
          <option value="3">3개씩 보기</option>
          <option value="6">6개씩 보기</option>
          <option value="9">9개씩 보기</option>
        </select>
        <select onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select> */}
        <div style={{ margin: '10px 0' }}>
          <Divider />
        </div>
        <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
          {posts.map((post: PostProps) => (
            <PostItem key={post.id} {...post} />
          ))}
        </SimpleGrid>
      </div>

      <div>{JSON.stringify(params)}</div>
    </div>
  );
}
