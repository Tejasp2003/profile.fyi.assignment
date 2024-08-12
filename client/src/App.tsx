import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import { CartProvider } from './context/CartContext';

import Login from './components/Login';
import Register from './components/Register';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';



const App: React.FC = () => {
  return (
    <AuthProvider>
    <CartProvider>
    <Router>
      <div className='min-h-screen bg-[#27374D] mt-0 '>
        <Toaster />
        <Navbar />
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
          <Route path="/" element={<ProductList />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
    </CartProvider>
    </AuthProvider>
  );
}

export default App;
