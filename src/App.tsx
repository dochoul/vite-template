import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// import { Router } from './Router';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { theme } from './theme';
import { Header } from './components/layouts/Header';
import { ListView } from './pages/posts/ListView';
import { DetailView } from './pages/posts/DetailView';
import { CreateView } from './pages/posts/CreateView';
import { EditView } from './pages/posts/EditView';
import { HomePage } from './pages/Home.page';

export default function App() {
  return (
    // <MantineProvider theme={theme}>
    //   <Header />
    //   <Router />
    // </MantineProvider>
    <MantineProvider theme={theme}>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<ListView />} />
            <Route path="/posts/:id" element={<DetailView />} />
            <Route path="/posts/write" element={<CreateView />} />
            <Route path="//posts/edit/:id" element={<EditView />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}
