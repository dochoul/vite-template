import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
//import { getPostById } from '../../api/post';
//import { PostProps } from '../../types/defines';
import { PostDetail } from '../../components/posts/PostDetail';
import { usePostStore } from '../../store/post';

// interface Props extends PostProps {
//   editedAt: string;
// }

export function DetailView() {
  //const [post, setPost] = useState<Props>(Object);
  const { id } = useParams();
  const post = usePostStore((state) => state.post);
  const 가져오기_포스트 = usePostStore((state) => state.getPost);

  // const 가져오기_포스트 = async () => {
  //   const response = await getPostById(Number(id));
  //   setPost(response.data);
  // };

  useEffect(() => {
    가져오기_포스트(Number(id));
  }, []);

  return (
    <div className="container">
      <PostDetail {...post} />
    </div>
  );
}
