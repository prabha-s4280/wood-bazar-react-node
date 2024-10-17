import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import envelopeIcon from './Images/envelope-outline.svg';
import sofaImage from './Images/sofa.png';
import './footer.css';

const Footer = () => {
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [error,setError]=useState('');

    const handleFormSubmit=(error)=>{
        error.preventDefault();
        if(name === '' || email === ''){
            setError('Both name and email fields are required');
        }
        else{
            setError('');
            console.log("form submitted:", {name,email});
            setEmail('');
            setName('');
        }
    };

  return (
    <footer className="footer-section">
      <div className="container relative">
        <div className="sofa-img">
          <img src={sofaImage} alt="Sofa" className="img-fluid mb-4" />
        </div>

        <div className="row">
          <div className="col-lg-8 mt-5">
            <div className="subscription-form mt-5">
              <h3 className="d-flex align-items-center mt-5">
                <span className="me-1">
                  <img src={envelopeIcon} alt="Envelope" className="img-fluid mt-5" />
                </span>
                <span className='mt-5'>Subscribe to Newsletter</span>
              </h3>
              <form action="#" className="row g-3" onSubmit={handleFormSubmit}>
                <div className="col-auto">
                  <input
                  type="text"
                  value={name}
                  className="form-control"
                  placeholder="Enter your name" 
                  onChange={(error)=>setName(error.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <input
                  type="email"
                  value={email}
                  className="form-control"
                  placeholder="Enter your email"
                  onChange={(error)=>setEmail(error.target.value)}
                  />
                </div>
                <div className="col-auto">
                  <button className="btn btn-primary">
                    <span className="fa fa-paper-plane"></span>
                  </button>
                </div>
              </form>
              {error && <div className='error-message'>{error}</div>}
            </div>
          </div>
        </div>

        <div className="row g-5 mb-5">
          <div className="col-lg-4">
            <div className="mb-4 footer-logo-wrap">
              <Link to='/' className="footer-logo">WooD BaZaR<span>.</span></Link>
            </div>
            <p className="mb-4">
              Enhancing your living spaces with elegance and style. Welcome to WoodBazar, your ultimate destination for premium furniture.
            </p>

            <ul className="list-unstyled custom-social">
              <li><Link to=''><span className="fa fa-brands fa-facebook-f"></span></Link></li>
              <li><Link to=''><span className="fa fa-brands fa-twitter"></span></Link></li>
              <li><Link to=''><span className="fa fa-brands fa-instagram"></span></Link></li>
              <li><Link to=''><span className="fa fa-brands fa-linkedin"></span></Link></li>
            </ul>
          </div>

          <div className="col-lg-8">
            <div className="row links-wrap">
              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to='/about'>About us</Link></li>
                  <li><Link to='/services'>Services</Link></li>
                  <li><Link to='/blogs'>Blog</Link></li>
                  <li><Link to='/contact'>Contact us</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to=''>Support</Link></li>
                  <li><Link to=''>Knowledge base</Link></li>
                  <li><Link to=''>Live chat</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to=''>Jobs</Link></li>
                  <li><Link to=''>Our team</Link></li>
                  <li><Link to=''>Leadership</Link></li>
                  <li><Link to=''>Privacy Policy</Link></li>
                </ul>
              </div>

              <div className="col-6 col-sm-6 col-md-3">
                <ul className="list-unstyled">
                  <li><Link to=''>Nordic Chair</Link></li>
                  <li><Link to=''>Kruzo Aero</Link></li>
                  <li><Link to=''>Ergonomic Chair</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-top copyright">
          <div className="row pt-4">
            <div className="col-lg-6">
              <p className="mb-2 text-center text-lg-start">
                &copy;{new Date().getFullYear()}. All Rights Reserved. &mdash; Designed by
                <a href="https://github.com/prabha-s4280"> prabhas-s</a>
              </p>
            </div>

            <div className="col-lg-6 text-center text-lg-end">
              <ul className="list-unstyled d-inline-flex ms-auto">
                <li className="me-4"><Link to=''>Terms &amp; Conditions</Link></li>
                <li><Link to=''>Privacy Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
