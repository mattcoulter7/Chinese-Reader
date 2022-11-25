import './App.css';

import React from 'react';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home'
import Dictionary from './pages/Dictionary';
import Reader from './pages/Reader';
import QCards from './pages/QCards';
import FileServer from './pages/FileServer';
import Converter from './pages/Converter';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dictionary' element={<Dictionary />} />
        <Route path='/converter' element={<Converter />} />
        <Route path='/reader' element={<Reader />} />
        <Route path='/pleco' >
          <Route path='/pleco/qcards' element={<QCards />} />
          <Route path='/pleco/fileserver' element={<FileServer />} />
        </Route>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}


export default App;
