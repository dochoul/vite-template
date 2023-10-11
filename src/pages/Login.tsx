import { useNavigate } from 'react-router-dom';
import { usePostStore } from '../store/post';
import { login } from '../api/post';
import { saveAuthToCookie } from '../utils/cookies';

export function Login() {
  const navigate = useNavigate();
  const getToken = usePostStore((state) => state.getToken);
  const setLogin = async () => {
    const { data } = await login({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    await getToken(data.token);
    await saveAuthToCookie(data.token);
    alert('로그인 되었습니다.');
    navigate('/');
  };
  return (
    <div>
      <button type="button" onClick={setLogin}>
        로그인
      </button>
    </div>
  );
}
