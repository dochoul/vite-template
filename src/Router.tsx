import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ListView } from './pages/posts/ListView';
import { DetailView } from './pages/posts/DetailView';
import { CreateView } from './pages/posts/CreateView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/write',
    element: <CreateView />,
  },
  {
    path: '/posts',
    element: <ListView />,
  },
  {
    path: '/posts/:id',
    element: <DetailView />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
