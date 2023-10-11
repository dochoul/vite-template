import { Navigate, Outlet } from 'react-router-dom';
import { usePostStore } from './store/post';

export function ProtectedRoute() {
  const token = usePostStore((state) => state.token);
  return <div>{token ? <Outlet /> : <Navigate to="/login" />}</div>;
}
