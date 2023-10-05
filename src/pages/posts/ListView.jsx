import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SimpleGrid, Select, Divider } from '@mantine/core';
import { getPosts } from '../../api/posts';
import classes from './ListView.module.css';

export function ListView() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(3); //* 몇개씩 보여줄거니?
  const [order, setOrder] = useState('desc'); //* 내림차순, 오름차순

  const params = {
    _limit: Number(limit),
    _sort: 'createdAt',
    _order: order,
  };

  const fetchPosts = async () => {
    try {
      const response = await getPosts(params);
      setPosts(response.data);
      console.log(1);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [limit, order]);

  return (
    <div>
      <h1>ListView</h1>
      <Link to="/">홈으로 돌아가기</Link>
      <Link to="/write">글쓰기</Link>
      <div style={{ padding: '1.5rem' }}>
        {JSON.stringify(params)}
        <select onChange={(e) => setLimit(e.target.value)}>
          <option value="3">3개씩 보기</option>
          <option value="6">6개씩 보기</option>
          <option value="9">9개씩 보기</option>
        </select>
        <select onChange={(e) => setOrder(e.target.value)}>
          <option value="desc">desc</option>
          <option value="asc">asc</option>
        </select>
        <div style={{ margin: '10px 0' }}>
          <Divider />
        </div>
        <SimpleGrid cols={3} spacing="xs" verticalSpacing="xs">
          {posts.map((post) => (
            <Link to={`./${post.id}`} key={post.id}>
              <div className={classes.box}>
                <div className={classes.body}>
                  <h5 className={classes.title}>{post.title}</h5>
                  <p className="card-text">{post.content}</p>
                </div>
              </div>
            </Link>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
}
