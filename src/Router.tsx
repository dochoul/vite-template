import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import { ListView } from './pages/posts/ListView';
import { DetailView } from './pages/posts/DetailView';
import { CreateView } from './pages/posts/CreateView';
import { EditView } from './pages/posts/EditView';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/posts/write',
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
  {
    path: '/posts/edit/:id',
    element: <EditView />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
