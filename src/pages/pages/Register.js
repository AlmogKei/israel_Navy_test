import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const API_URL = 'https://israel-navy-test.onrender.com';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPass) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, password, confirmPass }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'שגיאה בהרשמה');
        return;
      }

      console.log('User registered successfully');
      navigate('/login');
    } catch (err) {
      console.error('Error:', err);
      setError('שגיאת רשת, אנא נסה שוב מאוחר יותר');
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">הרשמה</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label htmlFor="fullName">שם מלא:</label>
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="הקלד/י את שמך המלא"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">אימייל:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@domain.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">מספר טלפון:</label>
            <input
              type="text"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="הקלד/י מספר טלפון"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">סיסמה:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="הקלד/י סיסמה"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPass">אישור סיסמה:</label>
            <input
              type="password"
              id="confirmPass"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="הקלד/י שוב את הסיסמה"
              required
            />
          </div>

          <button type="submit" className="btn register-btn">הרשמה</button>
        </form>
        <p className="login-link">
          כבר רשום/ה? <Link to="/login">התחבר/י כאן</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;