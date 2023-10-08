import { Button, Divider } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { PostProps } from '../../types/defines';
import { deletePost } from '../../api/post';
import styles from './PostDetail.module.css';

interface Props extends PostProps {
  editedAt: string;
}

export function PostDetail({ id, title, content, createdAt, editedAt }: Props) {
  const navigate = useNavigate();
  const 삭제_포스트 = async ($id: number) => {
    try {
      // eslint-disable-next-line no-restricted-globals, no-alert
      if (confirm('삭제 하시겠습니까?') === false) return;
      await deletePost($id);
      navigate('/posts');
    } catch (error) {
      //console.log(error.message);
    }
  };
  return (
    <div>
      <h2>{title}</h2>
      <Divider my="xs" label="아래는 내용이 있습니다" labelPosition="center" />
      <p>{content}</p>
      <p style={{ color: 'blue' }}>게시된 날짜: {createdAt}</p>
      <p style={{ color: 'red' }}>수정된 날짜: {editedAt}</p>
      <Divider my="sm" />
      <div className={styles.bottom}>
        <div className="left">
          <Button variant="filled">이전글</Button>
          <Button variant="filled">다음글</Button>
        </div>
        <div className="right">
          <Link to="/posts">목록</Link>
          <Button
            type="button"
            onClick={() => {
              navigate(`/posts/edit/${id}`);
            }}
          >
            수정
          </Button>
          <Button variant="filled" onClick={() => 삭제_포스트(id)}>
            삭제
          </Button>
        </div>
      </div>
    </div>
  );
}
