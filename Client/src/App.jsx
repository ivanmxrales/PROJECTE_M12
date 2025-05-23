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
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import api from './lib/axios.js';
import Messages from './components/Messages/Messages.jsx';
import Chat from './pages/Chat/Chat.jsx';
import getAuthUserId from './utility/getAuthUserId.jsx';
import ChangeEmail from './pages/Auth/ChangeEmail.jsx';

const token = JSON.parse(localStorage.getItem('user-info'))?.token;

window.Echo = new Echo({
  broadcaster: 'reverb',
  key: '381rlxplslmo6mwe5eiy',
  wsHost: '127.0.0.1',
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  encrypted: false,
  enabledTransports: ['ws', 'wss'],
  /* authEndpoint: 'http://127.0.0.1:8000/broadcasting/auth',
  auth: {
    headers: {
      Authorization: `Bearer ${token}`
    },
  }, */
});
console.log('AAAAAAAAAAA', token);



function App() {
  const id = getAuthUserId();
  /* window.Echo.private(`chat.${id}`)
    .listen('MessageSent', (e) => {
      console.log("Missatge rebut via: ", e)
    }); */

    window.Echo.channel('test-channel')
    .listen('MessageSent', (e) => {
      console.log("Missatge rebut via: ", e)
    });

  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path='/change-email' element ={<ChangeEmail/>} />
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

        <Route path="/chat/:username" element={
          <ProtectedRoutes>
            <Chat />
          </ProtectedRoutes>
        } />

        <Route path="/messages" element={
          <ProtectedRoutes>
            <Messages />
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
