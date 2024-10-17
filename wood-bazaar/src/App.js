import React, { useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import About from './Components/About/about';
import EditAddress from './Components/Authentication/address';
import LoginRegisterModal from './Components/authpage/model';
import ProfilePage from './Components/authpage/profile';
import Blog from './Components/blog/blog';
import Cart from './Components/cart/cart';
import Checkout from './Components/Checkout/checkout';
import Contact from './Components/Contact/contact';
import Navbar from './Components/Header/navbar';
import Homepage from './Components/Home/home';
import LandingPage from './Components/Landingpage/land';
import Products from './Components/Products/shop';
import Services from './Components/Services/services';
import ThankYou from './Components/thanks/thanks';
import ProductDetails from './Components/viewdetails/productDetails';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [userName, setUserName] = useState('');

  const api="http://localhost:8081";

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName');
    if (token) {
      setIsAuthenticated(true);
      setUserName(storedUserName);
    }
  }, []);

  useEffect(() => {
    if (showLandingPage) {
      const timer = setTimeout(() => {
        setShowLandingPage(false);
      }, 3000); // 3 seconds

      return () => clearTimeout(timer);
    }
  }, [showLandingPage]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500 && !isAuthenticated && !showModal) {
        setShowModal(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAuthenticated, showModal]);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        // Store token or user info if needed
        setIsAuthenticated(true);
        setUserName(result.user_name);
        localStorage.setItem('token', result.token);
        localStorage.setItem('userId', result.user_id);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName', result.user_name);
        
        return true; // Return true if login was successful
      } else {
        console.log('Login failed:', result.error);
        return false; // Return false if login failed
      }
    } catch (error) {
      console.error('Login error', error);
      return false;
    }
  };

  const handleRegister = async (username, email, password, firstName, lastName) => {
    try {
      const response = await fetch(`${api}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name: username, email, password, first_name: firstName, last_name: lastName }),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Registration successful');
        setIsAuthenticated(true);
        setUserName(username);
        localStorage.setItem('userEmail', email);
        localStorage.setItem('userName',username);
        return true; // Return true if registration was successful
      } else {
        console.log('Registration failed:', result.error);
        return false; // Return false if registration failed
      }
    } catch (error) {
      console.error('Registration error', error);
      return false;
    }
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    // Close the modal if the user is authenticated
    if (isAuthenticated) {
      setShowModal(false);
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName('');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    window.location.href = '/'; // Redirect to home page using window.location.href
  };

  return (
    <BrowserRouter>
    <Navbar isAuthenticated={isAuthenticated} userName={userName} onLogout={handleLogout} />
      <Routes>
        {showLandingPage ? (
          <Route path='*' element={<LandingPage />} />
        ) : (
          <>
            <Route path='/' element={<Homepage />} />
            <Route path='/shop' element={<Products />} />
            <Route path='/product/:id' element={<ProductDetails />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/edit-address' element={<EditAddress /> } />
            <Route path='/about' element={<About />} />
            <Route path='/services' element={<Services />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/cart' element={isAuthenticated ? <Cart /> : <Navigate to="/" />} />
            <Route path='/checkout' element={isAuthenticated ? <Checkout /> : <Navigate to="/" />} />
            <Route path='/blogs' element={<Blog />} />
            <Route path='/order-success' element={<ThankYou />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
      {showModal && !isAuthenticated && (
        <LoginRegisterModal 
          onClose={handleModalClose} 
          onLogin={handleLogin} 
          onRegister={handleRegister} 
        />
      )}
    </BrowserRouter>
  );
};

export default App;
