import { useNavigate, useParams, Link } from 'react-router-dom';
import { Button, Input, Textarea } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { editPost, getPostById } from '../../api/post';

interface PostProps {
  id: number;
  title: string;
  content: string;
  editedAt: string;
}
export function EditView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<PostProps>(Object);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const 가져오기_포스트 = async () => {
    const response = await getPostById(Number(id));
    setPost(response.data);
    setTitle(response.data.title);
    setContent(post.content);
  };

  const 수정하기_포스트 = async () => {
    try {
      await editPost(Number(id), {
        title,
        content,
        editedAt: dayjs(new Date()).format('YYYY:MM:DD hh:mm:ss'),
      });
      navigate('/posts');
    } catch (error) {
      //console.log(error);
    }
  };

  useEffect(() => {
    가져오기_포스트();
  }, []);

  return (
    <div className="container">
      <h1>게시글 수정 {id}</h1>
      <hr />
      <div>
        <Input
          defaultValue={title}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <Textarea
          defaultValue={post.content}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Link to="/posts">목록</Link>
        <Button variant="filled" onClick={() => 수정하기_포스트()}>
          수정하기
        </Button>
      </div>
    </div>
  );
}
