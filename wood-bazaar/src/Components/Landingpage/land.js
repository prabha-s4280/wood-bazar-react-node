import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './land.css';

const LandingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home');
    }, 5000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, [navigate]);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <h1 className="company-name">WooD BaZaR.</h1>
        <div className="loading-dots">
          <span>.</span><span>.</span><span>.</span>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
