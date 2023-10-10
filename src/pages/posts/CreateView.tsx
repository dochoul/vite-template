import React, { useRef, useState } from 'react';
import { Flex, SimpleGrid, Button, Input, Textarea } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { createPost } from '../../api/post';

export function CreateView() {
  const navigate = useNavigate();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const newData = {
    title,
    content,
    createdAt: dayjs(new Date()).format('YYYY:MM:DD HH:mm:ss'),
  };

  const isActiveSaveButton = () => {
    let isDisabled: boolean = false;
    title === '' || content === '' ? (isDisabled = true) : (isDisabled = false);
    return isDisabled;
  };

  const save = async () => {
    if (!title) {
      titleRef.current && titleRef.current.focus();
      return;
    }
    if (!content) {
      contentRef.current && contentRef.current.focus();
      return;
    }
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm('게시물을 등록하시겠습니까?') === false) return;
      await createPost(newData);
      navigate('/posts');
    } catch (error) {
      //console.log(error.message);
    }
  };

  return (
    <div className="container">
      <h1>게시글 등록</h1>
      <hr />
      <SimpleGrid cols={1}>
        <Input
          ref={titleRef}
          placeholder="Input component"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        />
        <Textarea
          ref={contentRef}
          size="md"
          autosize
          multiline
          minRows={10}
          placeholder="Input placeholder"
          onChange={(e) => setContent(e.target.value)}
        />
      </SimpleGrid>
      <Flex gap="md" justify="flex-end">
        <Link to="/posts">목록</Link>
        <Button disabled={isActiveSaveButton()} variant="filled" size="xl" onClick={() => save()}>
          저장
        </Button>
      </Flex>
      <div />
    </div>
  );
}
