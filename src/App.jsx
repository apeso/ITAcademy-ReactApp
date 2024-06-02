import { useState , useEffect} from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Radionice from "./pages/Radionice";
import Predavaci from "./pages/Predavaci";
import Administracija from './pages/Administracija';
import UserProfile from './pages/UserProfile';
import UserWorkshops from './pages/UserWorkshops';
import Header from './components/Header/Header';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Error from './pages/Error';

function App() {
  return (
    <div className='App'>
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} exact ></Route>
        <Route path="/radionice" element={<Radionice />}></Route>
        <Route path="/predavaci" element={<Predavaci />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path='/userworkshops' element={<UserWorkshops />} />
        <Route path="/administracija" element={<Administracija />}></Route>
        <Route path='/error' element={<Error />} />
      </Routes>
    </Router>       
    </div>
  )
}

export default App


