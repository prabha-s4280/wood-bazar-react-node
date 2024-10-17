import { faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import couch from './images/couch.png';
import './navbar.css';


const Navbar = ({isAuthenticated,userName, onLogout}) => {
  const location=useLocation();
  const [heading,setHeading]=useState("Modern Furniture Design Studio");
  

  useEffect(() => {
    switch (location.pathname) {
      case '/':
        setHeading("Modern Furniture Design Studio");
        break;
      case '/shop':
        setHeading("Our Products");
        break;
      case '/about':
        setHeading("About Us");
        break;
      case '/services':
        setHeading("Our Services");
        break;
      case '/blogs':
        setHeading("Our Recent Blogs");
        break;
      case '/contact':
        setHeading("Contact Us");
        break;
      default:
        setHeading("Modern Furniture Design Studio");
    }
  }, [location.pathname]);
  return (
    <div>
      {/* Navbar Section */}
      <nav className="custom-navbar navbar navbar-expand-md navbar-dark bg-dark" aria-label="woodbazar navigation bar">
        <div className="container">
          <NavLink className="navbar-brand" to="/">WooD BaZaR<span>.</span></NavLink>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarswood" aria-controls="navbarswood" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarswood">
            <ul className="navbar-nav ms-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link items" activeClassName="active">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/shop" className="nav-link items" activeClassName="active">Shop</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/about" className="nav-link items" activeClassName="active">About Us</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/services" className="nav-link items" activeClassName="active">Services</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/blogs" className="nav-link items" activeClassName="active">Blog</NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/contact" className="nav-link items" activeClassName="active">Contact Us</NavLink>
              </li>
            </ul>

            <ul className="navbar-nav mb-2 mb-md-0 ms-5">
            {isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link items" activeClassName="active">
                      <FontAwesomeIcon icon={faUser} /> {userName}
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <button className="btn btn-light" onClick={onLogout}>
                      <FontAwesomeIcon icon={faSignOutAlt} /> Logout
                    </button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <NavLink to='/reg' className="nav-link items" activeClassName="active"><FontAwesomeIcon icon={faUser} /></NavLink>
                </li>
              )}
              <li className="nav-item">
                <NavLink to="/cart" className="nav-link items" activeClassName="active">Cart</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* End Navbar Section */}

      {/* Banner Section */}
      <div className="hero">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-lg-5">
              <div className="intro-excerpt">
                <h1>
                  {heading}
                </h1>
                <p className="mb-4">
                  Everything we build is going to last a lifetime-generations. And it's always going to hold its value, too.
                </p>
                <p>
                  <NavLink to="/shop" className="btn btn-secondary me-2">Shop Now</NavLink>
                  <NavLink to="/about" className="btn btn-white-outline">Explore</NavLink>
                </p>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="hero-img-wrap">
                <img src={couch} className="img-fluid" alt="Couch" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Banner Section */}
    </div>
  );
}

export default Navbar;
