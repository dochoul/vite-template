import { useEffect, useState } from 'react';
import { Loader, SimpleGrid, Divider, Pagination, Space, Flex } from '@mantine/core';
import { useLocalStorage } from '@mantine/hooks';
import { PostProps } from '../../types/defines';
//import { getPosts } from '../../api/post';
import { PostItem } from '../../components/posts/PostItem';
import { PostFilter } from '../../components/posts/PostFilter';
import { usePostStore } from '../../store/post';

export function ListView() {
  const [search, setSearch] = useState<string>(''); //* 제목으로 검색

  //const [limit, setLimit] = useState<number>(3); //* 몇개씩 보여줄거니?
  const [limit = 3, setLimit] = useLocalStorage({ key: 'LIMIT-POST', defaultValue: 3 });

  const [order, setOrder] = useState<string>('desc'); //* 내림차순(default)으로 정렬
  const [page, setPage] = useState<number>(1); //* 현재 페이지 번호

  const posts = usePostStore((state) => state.posts);
  const totalCount = usePostStore((state) => state.totalCount);
  const getPosts = usePostStore((state) => state.getPosts);
  const isLoading = usePostStore((state) => state.isLoading);

  const params = {
    _sort: 'createdAt',
    _limit: Number(limit),
    _order: order,
    _page: page,
    title_like: search,
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
    getPosts(params);
  }, [limit, order, search, page]);

  return (
    <div className="container">
      <h1>ListView</h1>
      <div>
        <PostFilter
          searchKeyword={검색_제목으로}
          setLimitPost={보여주기_몇개씩}
          setOrderPost={정렬}
        />
        <Divider />
        {isLoading ? (
          <Flex justify="center">
            <Loader color="blue" />
          </Flex>
        ) : (
          <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
            {posts.map((post: PostProps) => (
              <PostItem key={post.id} {...post} />
            ))}
          </SimpleGrid>
        )}
      </div>
      <Space h="lg" />
      <Flex justify={{ sm: 'center' }}>
        <Pagination value={page} total={Math.ceil(totalCount / limit)} onChange={페이징처리} />
      </Flex>
      <div>{JSON.stringify(params)}</div>
    </div>
  );
}
