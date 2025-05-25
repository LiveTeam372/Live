// import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { getRequest } from "./api/api.js";
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Home from './pages/Home.js';
import Product from './pages/Product.js';
import Like from './pages/Like.js';
import Reservation from './pages/Reservation.js';
import Login from './pages/Login.js';

import "./styles/MainStyles.css";

function App () {
//   useEffect(()=>{
//     getRequest('/env');
//   },[]);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/product' element={<Product />} />
          <Route path='/like' element={<Like />} />
          <Route path='/reservation' element={<Reservation />} />
          <Route path='/login' element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
