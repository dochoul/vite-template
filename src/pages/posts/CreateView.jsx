import React, { useState } from 'react';
import { Button, Input, Textarea } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { createPost } from '../../api/posts';

export function CreateView() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const save = async () => {
    try {
      if (confirm('게시물을 등록하시겠습니까?') === false) return;
      await createPost({
        title,
        content,
        createdAt: new Date(),
      });
      navigate('/posts');
    } catch (error) {
      //console.log(error.message);
    }
  };

  return (
    <div>
      <h1>게시글 등록</h1>
      <hr />
      <div>
        <Input size="md" placeholder="Input component" onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Textarea
          size="md"
          radius="xs"
          placeholder="Input placeholder"
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div>
        <Link to="/posts">
          <Button variant="filled">목록</Button>
        </Link>
        <Button variant="filled" onClick={() => save()}>
          저장
        </Button>
      </div>
    </div>
  );
}
