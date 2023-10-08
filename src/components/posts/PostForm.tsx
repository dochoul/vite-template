import { Flex, Button, SimpleGrid, Input, Textarea } from '@mantine/core';
import { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { createPost, editPost } from '../../api/post';

type Props = {
  isEdit?: boolean;
  defaultTitle?: string;
  defaultContent?: string;
};

export function PostForm({ isEdit = false, defaultTitle, defaultContent }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const 작성하기_포스트 = async () => {
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm('게시물을 등록하시겠습니까?') === false) return;
      await createPost({
        title,
        content,
        createdAt: dayjs(new Date()).format('YYYY:MM:DD HH:mm:ss'),
      });
      navigate('/posts');
    } catch (err) {
      //console.log(error.message);
    }
  };
  const 수정하기_포스트 = async () => {
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm('게시물을 수정하시겠습니까?') === false) return;
      await editPost(Number(id), {
        title,
        content,
        editedAt: dayjs(new Date()).format('YYYY:MM:DD HH:mm:ss'),
      });
      navigate('/posts');
    } catch (err) {
      //console.log(err.message);
    }
  };
  return (
    <>
      <SimpleGrid cols={1}>
        <Input
          defaultValue={defaultTitle}
          placeholder="Input component"
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          defaultValue={defaultContent}
          placeholder="Input placeholder"
          onChange={(e) => setContent(e.target.value)}
        />
      </SimpleGrid>
      {!isEdit ? (
        <Flex gap="md" justify="flex-end">
          <Link to="/posts">목록</Link>
          <Button variant="filled" onClick={작성하기_포스트}>
            저장
          </Button>
        </Flex>
      ) : (
        <Flex gap="md" justify="flex-end">
          <Link to="/posts">목록</Link>
          <Button variant="filled" onClick={수정하기_포스트}>
            수정하기
          </Button>
        </Flex>
      )}
    </>
  );
}
