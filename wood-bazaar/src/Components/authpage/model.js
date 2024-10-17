import React, { useState } from 'react';
import './models.css';

const LoginRegisterModal = ({ onClose, onLogin, onRegister }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });
  const [error, setError] = useState('');

  const handleModeSwitch = () => {
    setIsLoginMode(!isLoginMode);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let success;
      if (isLoginMode) {
        success = await onLogin(formData.email, formData.password);
      } else {
        success = await onRegister(formData.username, formData.email, formData.password, formData.firstName, formData.lastName);
      }

      if (success) {
        onClose(); // Close the modal on successful login or registration
      } else {
        setError(isLoginMode ? 'Invalid email or password' : 'Registration failed');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-description">
        <button className="close-button" onClick={onClose} aria-label="Close modal">X</button>
        <h2 id="modal-title">{isLoginMode ? 'Log In' : 'Register'}</h2>
        <p id="modal-description">Please {isLoginMode ? 'log in' : 'register'} to continue.</p>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleFormSubmit}>
          {!isLoginMode && (
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                className="form-control"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
          )}
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  className="form-control"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  className="form-control"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="modal-buttons">
            <button type="submit" className="btn btn-primary">
              {isLoginMode ? 'Log In' : 'Register'}
            </button>
          </div>
        </form>
        <button className="switch-button" onClick={handleModeSwitch}>
          {isLoginMode ? 'New user? Register here' : 'Already registered? Log in here'}
        </button>
      </div>
    </div>
  );
};


export default LoginRegisterModal;
