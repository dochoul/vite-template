import { Link, useNavigate } from 'react-router-dom';
import styles from './Header.module.css';
import { usePostStore } from '../../store/post';
import { deleteCookie } from '../../utils/cookies';

export const Header = () => {
  const navigate = useNavigate();
  const token = usePostStore((state) => state.token);
  const clearToken = usePostStore((state) => state.clearToken);

  const setLogout = () => {
    deleteCookie('til_auth');
    clearToken();
    alert('로그아웃 되었습니다.');
  };
  return (
    <div className={styles.Header}>
      <Link to="/">
        <h1>
          <img src="https://static.gabia.com/www/common/img/logo.png" alt="" />
        </h1>
      </Link>
      <p>{token}</p>
      <nav className={styles.nav}>
        {token ? (
          <button type="button" onClick={setLogout}>
            로그아웃
          </button>
        ) : (
          <Link to="/login">로그인</Link>
        )}
        <Link to="/posts">포스트</Link>
        <Link to="/posts/write">글쓰기</Link>
      </nav>
    </div>
  );
};
