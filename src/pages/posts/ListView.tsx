import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleGrid, Divider, Pagination, Space, Flex } from '@mantine/core';
import { PostProps } from '../../types/defines';
import { getPosts } from '../../api/post';
import { PostItem } from '../../components/posts/PostItem';
import { PostFilter } from '../../components/posts/PostFilter';

export function ListView() {
  const [posts, setPosts] = useState<PostProps[]>([]);
  const [search, setSearch] = useState<string>(''); //* 제목으로 검색
  const [limit, setLimit] = useState<number>(3); //* 몇개씩 보여줄거니?
  const [order, setOrder] = useState<string>('desc'); //* 내림차순(default)으로 정렬
  const [total, setTotal] = useState<number>(0); //* 전체 포스트 갯수
  const [page, setPage] = useState<number>(1); //* 현재 페이지 번호

  const params = {
    _limit: Number(limit),
    _sort: 'createdAt',
    _order: order,
    _page: page,
    title_like: search,
  };

  const fetchPosts = async () => {
    try {
      const response = await getPosts(params);
      setTotal(Math.ceil(response.headers['x-total-count'] / limit));
      setPosts(response.data);
    } catch (error) {
      //console.log(error);
    }
  };
  const 검색_제목으로 = ($keyword: string) => {
    setPage(1);
    setSearch($keyword);
  };
  const 보여주기_몇개씩 = ($limit: number) => {
    setPage(1);
    setLimit($limit);
  };
  const 정렬 = ($order: string) => {
    setPage(1);
    setOrder($order);
  };
  const 페이징처리 = ($page: number) => {
    setPage($page);
  };

  useEffect(() => {
    fetchPosts();
  }, [limit, order, search, page]);

  return (
    <div className="container">
      <h1>ListView</h1>
      <Link to="/">홈으로 돌아가기</Link>
      <Link to="/posts/write">글쓰기</Link>
      <div>
        <PostFilter
          searchKeyword={검색_제목으로}
          setLimitPost={보여주기_몇개씩}
          setOrderPost={정렬}
        />
        <div style={{ margin: '10px 0' }}>
          <Divider />
        </div>
        <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
          {posts.map((post: PostProps) => (
            <PostItem key={post.id} {...post} />
          ))}
        </SimpleGrid>
      </div>
      <Space h="lg" />
      <Flex justify={{ sm: 'center' }}>
        <Pagination value={page} total={Number(total)} onChange={페이징처리} />
      </Flex>
      <div>{JSON.stringify(params)}</div>
    </div>
  );
}
