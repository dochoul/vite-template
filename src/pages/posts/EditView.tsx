import { useNavigate, useParams, Link } from 'react-router-dom';
import { SimpleGrid, Flex, Button, Input, Textarea } from '@mantine/core';
import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { editPost, fetchPostById } from '../../api/post';
import { usePostStore } from '../../store/post';

// interface PostProps {
//   id: number;
//   title: string;
//   content: string;
//   editedAt: string;
// }
export function EditView() {
  const { id } = useParams();
  const navigate = useNavigate();
  //const [post, setPost] = useState<PostProps>(Object);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  // const post = usePostStore((state) => state.post);
  // const 포스트가져오기 = usePostStore((state) => state.getPost);

  const { post, getPost } = usePostStore();

  // const 가져오기_포스트 = async () => {
  //   const response = await fetchPostById(Number(id));
  //   setPost(response.data);
  //   setTitle(response.data.title);
  //   setContent(response.data.content);
  // };

  const newData = {
    title,
    content,
    editedAt: dayjs(new Date()).format('YYYY:MM:DD HH:mm:ss'),
  };

  const 수정하기_포스트 = async () => {
    try {
      // eslint-disable-next-line no-alert
      if (window.confirm('게시물을 수정하시겠습니까?') === false) return;
      await editPost(Number(id), newData);
      navigate('/posts');
    } catch (err) {
      //console.log(err.message);
    }
  };

  useEffect(() => {
    getPost(Number(id));
    setTitle(post.title);
    setContent(post.content);
    //가져오기_포스트();
  }, []);

  return (
    <div className="container">
      <h1>게시글 수정</h1>
      <hr />
      <SimpleGrid cols={1}>
        <Input defaultValue={post.title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea
          size="md"
          autosize
          minRows={10}
          defaultValue={post.content}
          onChange={(e) => setContent(e.target.value)}
        />
      </SimpleGrid>
      <Flex gap="md" justify="flex-end">
        <Link to="/posts">목록</Link>
        <Button variant="filled" onClick={() => 수정하기_포스트()}>
          수정하기
        </Button>
      </Flex>
    </div>
  );
}
