import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Login from './forms/Login';
import Signup from './forms/Signup';
import EditUser from './forms/EditUser';
import { Home } from './pages/Home';
//import Users from './components/users/Users';
import Users from './pages2/users/Users';
import Register from './pages2/login/Register';
import Profile from './pages2/login/Profile';

function App() {
  const [users, setUsers] = useState([]);
  const [login, setLogin] = useState([]);
  const [register, setRegister] = useState([]);
  const [profile, setProfile] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [materials, setMaterials] = useState([]);

  

  
  

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <Routes>
        <Route index element={<Home/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='sign-up' element={<Signup/>}/>
        <Route path='/users' element={<Users users={users}/>}/>
        <Route path='profile/:id' element={<Profile/>}/>
        <Route path='edit/:id' element={<EditUser/>}/>
      </Routes>
    </div>

   /*  <Router>
      <div>
        <nav>
          <h1>Moderator Page</h1>
          <Link to="/">Inici</Link> &nbsp;&nbsp;| &nbsp;&nbsp;
          <Link to="/users">Llistat d'usuaris</Link>&nbsp;&nbsp;| &nbsp;&nbsp;
          <Link to="/login">Login</Link>&nbsp;&nbsp;| &nbsp;&nbsp;
        </nav>

        <Routes>
          <Route path="/" element={<h2>Funciona</h2>} />
          <Route path='/users' element={< Users users={users}/>}/>
          <Route path='/login' element={< Login login={login}/>}/>
          <Route path='/register' element={< Register register={register}/>}/>
          <Route path="/profile/:id" element={<Profile profile={profile}/>} />

        </Routes>
      </div>
    </Router> */
  );
}

export default App
