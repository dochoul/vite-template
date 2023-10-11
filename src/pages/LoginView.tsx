import { useNavigate } from 'react-router-dom';
import { login } from '../api/post';
import { saveAuthToCookie } from '../utils/cookies';
import { usePostStore } from '../store/post';

export const LoginView = () => {
  const navigate = useNavigate();
  const getToken = usePostStore((state) => state.getToken);

  const setLogin = async () => {
    const { data } = await login({
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    });
    alert('로그인 되었습니다.');
    getToken(data.token);
    saveAuthToCookie(data.token);
    navigate('/');
  };

  return (
    <div>
      <h1>ddd</h1>
      <button type="button" onClick={setLogin}>
        로그인
      </button>
    </div>
  );
};
