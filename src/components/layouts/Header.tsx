import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { usePostStore } from '../../store/post';

export const Header = () => {
  const token = usePostStore((state) => state.token);
  return (
    <div className={styles.Header}>
      <Link to="/">
        <h1>
          <img src="https://static.gabia.com/www/common/img/logo.png" alt="" />
        </h1>
      </Link>
      <p>{token}</p>
      <nav className={styles.nav}>
        <Link to="/posts">포스트</Link>
        <Link to="/posts/write">글쓰기</Link>
      </nav>
    </div>
  );
};
