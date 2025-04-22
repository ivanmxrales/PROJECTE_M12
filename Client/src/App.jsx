import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import PageLayout from './Layouts/PageLayout/PageLayout';

function App() {
  return (
    <>
      <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
      </PageLayout>
    </>
  )
}

export default App
