

import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState, useEffect, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { Eye, EyeOff } from 'lucide-react';
import monkeyLogo from '/ReadMonkey-icon.png';
import initialUsers from '../data/users.json';

const Login = () => {
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  
  // Changed error string to an object for field-specific tracking
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  useEffect(() => {
    const existingData = localStorage.getItem('users');
    // Only initialize if the key is completely missing or is an empty array string
    if (!existingData || existingData === "[]") {
      localStorage.setItem('users', JSON.stringify(initialUsers));
    }
  }, []);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: token
      });
      if (response.status === 200) {
        localStorage.setItem('libraryToken', response.data.token);
        alert(`Login Successful! Welcome, ${response.data.user.name}.`);
        navigate('/');
        alert(`Login Successful! Welcome, ${response.data.user.name}.`);
        navigate('/');
      }
    } catch (error) {
      setErrors({ google: "Google login failed. Is the backend running?" });
      setErrors({ google: "Google login failed. Is the backend running?" });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const loginErrors = {};

    if (!email) loginErrors.email = "Email is required";
    if (!password) loginErrors.password = "Password is required";

    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    const loginErrors = {};

    if (!email) loginErrors.email = "Email is required";
    if (!password) loginErrors.password = "Password is required";

    if (Object.keys(loginErrors).length > 0) {
      setErrors(loginErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userExists = users.find(u => u.email === email);

    if (!userExists) {
      setErrors({ email: 'Account not found. Please register.' });
      return;
    }

    if (userExists.password === password) {
    const userExists = users.find(u => u.email === email);

    if (!userExists) {
      setErrors({ email: 'Account not found. Please register.' });
      return;
    }

    if (userExists.password === password) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(userExists));
      localStorage.setItem('currentUser', JSON.stringify(userExists));
      navigate('/');
    } else {
      setErrors({ password: 'Incorrect password.' });
      setErrors({ password: 'Incorrect password.' });
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const regErrors = {};

    // 1. Required Checks
    if (!firstName.trim()) regErrors.firstName = "Required";
    if (!lastName.trim()) regErrors.lastName = "Required";
    if (!email.trim()) regErrors.email = "Email is required";
    if (!phone.trim()) regErrors.phone = "Phone is required";
    if (!address.trim()) regErrors.address = "Address is required";
    if (!password) regErrors.password = "Password is required";

    // 2. Format Checks
    if (email && !validateEmail(email)) regErrors.email = "Invalid email format";
    
    const phoneDigits = phone.replace(/\D/g, '');
    if (phone && phoneDigits.length !== 10) regErrors.phone = "Must be 10 digits";

    if (password && password.length < 6) regErrors.password = "Minimum 6 characters";

    if (password !== confirmPassword) regErrors.confirmPassword = "Passwords do not match";

    // 3. Duplicate Checks
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      regErrors.email = "Email already taken";
    }
    if (users.some(u => u.phone === phoneDigits)) {
      regErrors.phone = "Phone already linked";
    }

    if (Object.keys(regErrors).length > 0) {
      setErrors(regErrors);
    const regErrors = {};

    // 1. Required Checks
    if (!firstName.trim()) regErrors.firstName = "Required";
    if (!lastName.trim()) regErrors.lastName = "Required";
    if (!email.trim()) regErrors.email = "Email is required";
    if (!phone.trim()) regErrors.phone = "Phone is required";
    if (!address.trim()) regErrors.address = "Address is required";
    if (!password) regErrors.password = "Password is required";

    // 2. Format Checks
    if (email && !validateEmail(email)) regErrors.email = "Invalid email format";
    
    const phoneDigits = phone.replace(/\D/g, '');
    if (phone && phoneDigits.length !== 10) regErrors.phone = "Must be 10 digits";

    if (password && password.length < 6) regErrors.password = "Minimum 6 characters";

    if (password !== confirmPassword) regErrors.confirmPassword = "Passwords do not match";

    // 3. Duplicate Checks
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
      regErrors.email = "Email already taken";
    }
    if (users.some(u => u.phone === phoneDigits)) {
      regErrors.phone = "Phone already linked";
    }

    if (Object.keys(regErrors).length > 0) {
      setErrors(regErrors);
      return;
    }

    // Success
    users.push({ firstName, lastName, email, phone: phoneDigits, address, password });

    // Success
    users.push({ firstName, lastName, email, phone: phoneDigits, address, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please log in.');
    setErrors({});
    alert('Account created! Please log in.');
    setErrors({});
    setIsLoginView(true);
  };

  // Small helper to render error text
  const ErrorMsg = ({ field }) => (
    errors[field] ? <small className="field-error">{errors[field]}</small> : null
  );

  // Small helper to render error text
  const ErrorMsg = ({ field }) => (
    errors[field] ? <small className="field-error">{errors[field]}</small> : null
  );

  return (
    <div className="login-wrapper">
    <div className="login-wrapper">
      <style>{`
        :root {
          --choc-black: #38240D;
          --bg-cream: #fcf9f2;
          --border-color: #eaddca;
          --btn-main: rgb(198, 166, 130);
          --btn-shadow: rgb(166, 138, 106);
          --error-red: #dc3545;
        }
        .login-wrapper { background-color: var(--bg-cream); min-height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center; padding: 40px 20px; font-family: system-ui, sans-serif; }
        .login-content { width: 100%; max-width: 520px; }
        .logo-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 15px; }
        .main-logo-img { width: 60px; height: auto; margin-bottom: 2px; }
        .brand-name { font-size: 1.6rem; font-weight: 800; color: #3b2b1a; margin: 0; }
        .login-card { background: white; border: 8px solid var(--border-color); border-radius: 25px; padding: 30px 40px; box-shadow: 0 0.5rem 1.5rem rgba(59,43,26,0.1); }
        .custom-input { width: 100%; background-color: #fff; border: 1px solid #ced4da; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.2s; }
        .input-error { border-color: var(--error-red) !important; }
        .field-error { color: var(--error-red); font-size: 0.75rem; font-weight: 600; display: block; margin-top: 2px; }
        .wood-btn { width: 100%; padding: 12px; cursor: pointer; background-color: var(--btn-main); color: white; border-radius: 12px; border: none; font-size: 1.2rem; font-weight: bold; box-shadow: var(--btn-shadow) 0px 4px 0px; margin-top: 15px; }
        .wood-btn:active { transform: translateY(4px); box-shadow: none; }
        .form-label { color: var(--choc-black); font-weight: 600; font-size: 0.85rem; margin-bottom: 4px; display: block; }
        .toggle-text { cursor: pointer; font-weight: 700; text-decoration: underline; color: var(--choc-black); }
        .password-wrapper { position: relative; }
        .eye-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #888; }
        :root {
          --choc-black: #38240D;
          --bg-cream: #fcf9f2;
          --border-color: #eaddca;
          --btn-main: rgb(198, 166, 130);
          --btn-shadow: rgb(166, 138, 106);
          --error-red: #dc3545;
        }
        .login-wrapper { background-color: var(--bg-cream); min-height: 100vh; width: 100%; display: flex; justify-content: center; align-items: center; padding: 40px 20px; font-family: system-ui, sans-serif; }
        .login-content { width: 100%; max-width: 520px; }
        .logo-container { display: flex; flex-direction: column; align-items: center; margin-bottom: 15px; }
        .main-logo-img { width: 60px; height: auto; margin-bottom: 2px; }
        .brand-name { font-size: 1.6rem; font-weight: 800; color: #3b2b1a; margin: 0; }
        .login-card { background: white; border: 8px solid var(--border-color); border-radius: 25px; padding: 30px 40px; box-shadow: 0 0.5rem 1.5rem rgba(59,43,26,0.1); }
        .custom-input { width: 100%; background-color: #fff; border: 1px solid #ced4da; padding: 10px 12px; border-radius: 8px; font-size: 0.95rem; transition: border-color 0.2s; }
        .input-error { border-color: var(--error-red) !important; }
        .field-error { color: var(--error-red); font-size: 0.75rem; font-weight: 600; display: block; margin-top: 2px; }
        .wood-btn { width: 100%; padding: 12px; cursor: pointer; background-color: var(--btn-main); color: white; border-radius: 12px; border: none; font-size: 1.2rem; font-weight: bold; box-shadow: var(--btn-shadow) 0px 4px 0px; margin-top: 15px; }
        .wood-btn:active { transform: translateY(4px); box-shadow: none; }
        .form-label { color: var(--choc-black); font-weight: 600; font-size: 0.85rem; margin-bottom: 4px; display: block; }
        .toggle-text { cursor: pointer; font-weight: 700; text-decoration: underline; color: var(--choc-black); }
        .password-wrapper { position: relative; }
        .eye-toggle { position: absolute; right: 12px; top: 50%; transform: translateY(-50%); cursor: pointer; color: #888; }
      `}</style>

      <div className="login-content text-center">
        <div className="logo-container">
          <img src={monkeyLogo} alt="Logo" className="main-logo-img" />
          <h1 className="brand-name">ReadMonkey</h1>
      <div className="login-content text-center">
        <div className="logo-container">
          <img src={monkeyLogo} alt="Logo" className="main-logo-img" />
          <h1 className="brand-name">ReadMonkey</h1>
        </div>

        <div className="login-card text-start">
          {errors.google && <div className="alert alert-danger py-2 small text-center">{errors.google}</div>}
        <div className="login-card text-start">
          {errors.google && <div className="alert alert-danger py-2 small text-center">{errors.google}</div>}

          {isLoginView ? (
            <div>
              <h5 className="text-center mb-4">Log in to your library</h5>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className={`custom-input ${errors.email ? 'input-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorMsg field="email" />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input type={showPass ? "text" : "password"} className={`custom-input ${errors.password ? 'input-error' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
          {isLoginView ? (
            <div>
              <h5 className="text-center mb-4">Log in to your library</h5>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input type="email" className={`custom-input ${errors.email ? 'input-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorMsg field="email" />
              </div>
              <div className="mb-4">
                <label className="form-label">Password</label>
                <div className="password-wrapper">
                  <input type={showPass ? "text" : "password"} className={`custom-input ${errors.password ? 'input-error' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                  <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                </div>
                <ErrorMsg field="password" />
              </div>
              <button className="wood-btn" onClick={handleLogin}>LOG IN</button>
              <div className="text-center my-3"><small className="text-muted">Or log in with</small></div>
              <div className="d-flex justify-content-center mb-3">
                <GoogleLogin onSuccess={handleSuccess} onError={() => setErrors({google: "Google Auth Failed"})} useOneTap />
              </div>
              <p className="text-center small mb-0">New here? <span className="toggle-text" onClick={() => { setIsLoginView(false); setErrors({}); }}>Register Here</span></p>
            </div>
          ) : (
            <div>
              <h5 className="text-center mb-4">Register for your library</h5>
              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label">First Name</label>
                  <input type="text" className={`custom-input ${errors.firstName ? 'input-error' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <ErrorMsg field="firstName" />
                <ErrorMsg field="password" />
              </div>
              <button className="wood-btn" onClick={handleLogin}>LOG IN</button>
              <div className="text-center my-3"><small className="text-muted">Or log in with</small></div>
              <div className="d-flex justify-content-center mb-3">
                <GoogleLogin onSuccess={handleSuccess} onError={() => setErrors({google: "Google Auth Failed"})} useOneTap />
              </div>
              <p className="text-center small mb-0">New here? <span className="toggle-text" onClick={() => { setIsLoginView(false); setErrors({}); }}>Register Here</span></p>
            </div>
          ) : (
            <div>
              <h5 className="text-center mb-4">Register for your library</h5>
              <div className="row mb-2">
                <div className="col-6">
                  <label className="form-label">First Name</label>
                  <input type="text" className={`custom-input ${errors.firstName ? 'input-error' : ''}`} value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  <ErrorMsg field="firstName" />
                </div>
                <div className="col-6">
                  <label className="form-label">Last Name</label>
                  <input type="text" className={`custom-input ${errors.lastName ? 'input-error' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  <ErrorMsg field="lastName" />
                <div className="col-6">
                  <label className="form-label">Last Name</label>
                  <input type="text" className={`custom-input ${errors.lastName ? 'input-error' : ''}`} value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  <ErrorMsg field="lastName" />
                </div>
              </div>
              <div className="mb-2">
                <label className="form-label">Email Address</label>
                <input type="email" className={`custom-input ${errors.email ? 'input-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorMsg field="email" />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone Number</label>
                <input type="text" className={`custom-input ${errors.phone ? 'input-error' : ''}`} placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <ErrorMsg field="phone" />
              </div>
              <div className="mb-2">
                <label className="form-label">Home Address</label>
                <textarea className={`custom-input ${errors.address ? 'input-error' : ''}`} rows="2" value={address} onChange={(e) => setAddress(e.target.value)} />
                <ErrorMsg field="address" />
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label">Password</label>
                  <div className="password-wrapper">
                    <input type={showPass ? "text" : "password"} className={`custom-input ${errors.password ? 'input-error' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                  </div>
                  <ErrorMsg field="password" />
                </div>
                <div className="col-6">
                  <label className="form-label">Confirm</label>
                  <div className="password-wrapper">
                    <input type={showConfirmPass ? "text" : "password"} className={`custom-input ${errors.confirmPassword ? 'input-error' : ''}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span className="eye-toggle" onClick={() => setShowConfirmPass(!showConfirmPass)}>{showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
              </div>
              <div className="mb-2">
                <label className="form-label">Email Address</label>
                <input type="email" className={`custom-input ${errors.email ? 'input-error' : ''}`} value={email} onChange={(e) => setEmail(e.target.value)} />
                <ErrorMsg field="email" />
              </div>
              <div className="mb-2">
                <label className="form-label">Phone Number</label>
                <input type="text" className={`custom-input ${errors.phone ? 'input-error' : ''}`} placeholder="10-digit number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                <ErrorMsg field="phone" />
              </div>
              <div className="mb-2">
                <label className="form-label">Home Address</label>
                <textarea className={`custom-input ${errors.address ? 'input-error' : ''}`} rows="2" value={address} onChange={(e) => setAddress(e.target.value)} />
                <ErrorMsg field="address" />
              </div>
              <div className="row mb-3">
                <div className="col-6">
                  <label className="form-label">Password</label>
                  <div className="password-wrapper">
                    <input type={showPass ? "text" : "password"} className={`custom-input ${errors.password ? 'input-error' : ''}`} value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className="eye-toggle" onClick={() => setShowPass(!showPass)}>{showPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                  </div>
                  <ErrorMsg field="password" />
                </div>
                <div className="col-6">
                  <label className="form-label">Confirm</label>
                  <div className="password-wrapper">
                    <input type={showConfirmPass ? "text" : "password"} className={`custom-input ${errors.confirmPassword ? 'input-error' : ''}`} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <span className="eye-toggle" onClick={() => setShowConfirmPass(!showConfirmPass)}>{showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}</span>
                  </div>
                  <ErrorMsg field="confirmPassword" />
                  <ErrorMsg field="confirmPassword" />
                </div>
              </div>
              <button className="wood-btn" onClick={handleRegister}>NEXT</button>
              <p className="text-center small mb-0 mt-3">Already a member? <span className="toggle-text" onClick={() => { setIsLoginView(true); setErrors({}); }}>Log In Here</span></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;