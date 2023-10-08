import { Link } from 'react-router-dom';

export const Header = () => (
  <div>
    <h1>Header</h1>
    <Link to="/">홈으로 돌아가기</Link>
    <Link to="/posts">포스트</Link>
  </div>
);
