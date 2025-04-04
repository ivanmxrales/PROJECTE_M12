import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import axios from 'axios'
import './App.css'
//import Users from './components/users/Users';
import Users from './pages/users/Users';
import Login from './pages/login/Login';

function App() {
  const [users, setUsers] = useState([]);
  const [login, setLogin] = useState([]);
  const [monsters, setMonsters] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/monsters")
      .then((response) => setMonsters(response.data))
      .catch((error) => console.error("Error carregant monstres:", error));
  }, []);


  useEffect(() => {
    axios.get("http://localhost:3001/materials")
      .then((response) => setMaterials(response.data))
      .catch((error) => console.error("Error carregant materials:", error));
  }, []);

  
  const handleAddMonster = (newMonster) => {
    setMonsters((prevMonsters) => [...prevMonsters, newMonster]);
  };

  const handleUpdateMonster = (updatedMonster) => {
    setMonsters((prevMonsters) => 
      prevMonsters.map(m => (m.id_num === updatedMonster.id_num ? updatedMonster : m))
    );
  };

  
  const handleAddMaterial = (newMaterial) => {
    setMaterials((prevMaterials) => [...prevMaterials, newMaterial]); 
  };

  
  const handleUpdateMaterial = (updatedMaterial) => {
    setMaterials((prevMaterials) => 
      prevMaterials.map(m => (m.id === updatedMaterial.id ? updatedMaterial : m))
    );
  };

  return (
    <Router>
      <div>
        <nav>
          <h1>Moderator Page</h1>
          <Link to="/">Inici</Link> &nbsp;&nbsp;| &nbsp;&nbsp;
          <Link to="/users">Llistat d'usuaris</Link>&nbsp;&nbsp;| &nbsp;&nbsp;
          <Link to="/login">Login</Link>&nbsp;&nbsp;| &nbsp;&nbsp;
        </nav>

        <Routes>
          {/* <Route path="/" element={<h2>Benvingut al projecte Final</h2>} />
          <Route path="/materials" element={<Materials materials={materials} />} />
          <Route path="/monsters" element={<Monsters />} />
          <Route path="/add-monster" element={<AddMonster onSave={handleAddMonster} onCancel={() => { }} existingMonsters={monsters} />} />
          <Route path="/edit-monster/:id" element={<EditMonster existingMonsters={monsters} onUpdate={handleUpdateMonster} />} />  
          <Route path="/add-material" element={<AddMaterial onSave={handleAddMaterial} onCancel={() => { }} existingMaterials={materials}/>} />
          <Route path="/edit-material/:id" element={<EditMaterial existingMaterials={materials} onUpdate={handleUpdateMaterial} />} /> */}
          <Route path="/" element={<h2>Funciona</h2>} />
          <Route path='/users' element={< Users users={users}/>}/>
          <Route path='/login' element={< Login login={login}/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App
