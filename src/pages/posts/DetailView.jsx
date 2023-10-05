import React, { useEffect, useState } from 'react';
import { Flex, Button, Divider } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { getPostById, deletePost } from '../../api/posts';
import classes from './DetailView.module.css';

export function DetailView() {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  const 가져오기_포스트 = async () => {
    const response = await getPostById(id);
    setPost(response.data);
  };

  const 삭제_포스트 = async ($id) => {
    try {
      if (confirm('삭제 하시겠습니까?') === false) return;
      await deletePost($id);
      navigate('/posts');
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    가져오기_포스트();
  }, []);

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{dayjs(post.createdAt).format('YYYY:MM:DD hh:mm:ss')}</p>
      <Divider my="sm" />

      <div className={classes.bottom}>
        <div className="left">
          <Button variant="filled">이전글</Button>
          <Button variant="filled">다음글</Button>
        </div>
        <div className="right">
          <Link to="/posts">
            <Button variant="filled">목록</Button>
          </Link>
          <Button variant="filled">수정</Button>
          <Button variant="filled" onClick={() => 삭제_포스트(post.id)}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
