import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Posts from './pages/posts/Posts'
import Post from './pages/posts/Post';
import CreatePostPage from './pages/posts/CreatePostPage';
import Auth from './pages/Auth/Auth';
import PageLayout from './Layouts/PageLayout/PageLayout';

function App() {
  return (
    <>
      <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/posts/:id" element={<Posts />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/postnew" element={<CreatePostPage />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      </PageLayout>
    </>
  )
}

export default App
