import './App.css';
import './index.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Posts from './pages/posts/Posts'
import CreatePostPage from './pages/posts/CreatePostPage';
import SearchUsers from './pages/search/SearchUsers';
import UserConfig from './pages/userConfig/UserConfig';
import Auth from './pages/Auth/Auth';
import PageLayout from './Layouts/PageLayout/PageLayout';
import Profile from './pages/Profile/Profile';
import ProtectedRoutes from './components/AuthRoutes/ProtectedRoutes';
import Verify from './pages/Auth/Verify';
import ResetPassword from './pages/Auth/ResetPassword';
import NewPassword from './pages/Auth/NewPassword';

function App() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/search" element={
          <ProtectedRoutes>
            <SearchUsers />
          </ProtectedRoutes>
        } />
        <Route path="/config" element={
          <ProtectedRoutes>
            <UserConfig />
          </ProtectedRoutes>
        } />
        <Route path="/postnew" element={
          <ProtectedRoutes>
            <CreatePostPage />
          </ProtectedRoutes>
        } />
        <Route path="/auth" element={<Auth />} />
        {/* <Route path="/:username" element={ */}
        <Route path="/:username" element={
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        } />
      </Routes>
    </PageLayout>
  );
}

export default App;
