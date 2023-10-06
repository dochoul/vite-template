import React, { useEffect, useState } from 'react';
import { Button, Divider } from '@mantine/core';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getPostById, deletePost } from '../../api/post';
import classes from './DetailView.module.css';

interface PostProps {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  editedAt: string;
}

export function DetailView() {
  const [post, setPost] = useState<PostProps>(Object);
  const { id } = useParams();
  const navigate = useNavigate();

  const 가져오기_포스트 = async () => {
    const response = await getPostById(Number(id));
    setPost(response.data);
  };

  const 삭제_포스트 = async ($id: number) => {
    try {
      //if (confirm('삭제 하시겠습니까?') === false) return;
      await deletePost($id);
      navigate('/posts');
    } catch (error) {
      //console.log(error.message);
    }
  };

  useEffect(() => {
    가져오기_포스트();
  }, []);

  return (
    <div className="container">
      <h1>상세보기</h1>
      <h2>{post.title}</h2>
      <Divider my="xs" label="아래는 내용이 있습니다" labelPosition="center" />
      <p>{post.content}</p>
      <p style={{ color: 'blue' }}>게시된 날짜: {post.createdAt}</p>
      <p style={{ color: 'red' }}>수정된 날짜: {post.editedAt}</p>
      <Divider my="sm" />

      <div className={classes.bottom}>
        <div className="left">
          <Button variant="filled">이전글</Button>
          <Button variant="filled">다음글</Button>
        </div>
        <div className="right">
          <Link to="/posts">목록</Link>
          <Button
            type="button"
            onClick={() => {
              navigate(`/posts/edit/${post.id}`);
            }}
          >
            수정
          </Button>
          <Button variant="filled" onClick={() => 삭제_포스트(post.id)}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
