import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Posts from './pages/posts/Posts'
import CreatePostPage from './pages/posts/CreatePostPage';
import Auth from './pages/Auth/Auth';
import PageLayout from './Layouts/PageLayout/PageLayout';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <>
      <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/postnew" element={<CreatePostPage />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
      </PageLayout>
    </>
  )
}

export default App
