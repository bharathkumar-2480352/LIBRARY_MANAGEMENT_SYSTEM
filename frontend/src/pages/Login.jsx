import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import monkeyLogo from '/ReadMonkey-icon.png';

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      // 1. Get the JWT from Google
      const token = credentialResponse.credential;

      // 2. Send it to your Node.js backend
      const response = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: token
      });

      // 3. Check for success and show the alert
      if (response.status === 200) {
        const userName = response.data.user.name;

        // Show the alert box
        alert(`Login Successful! Welcome to the Library, ${userName}.`);

        // 4. Store the backend-generated token for later use
        localStorage.setItem('libraryToken', response.data.token);

        console.log('Backend response:', response.data);
      }

    } catch (error) {
      console.error('Login Failed during backend sync:', error);
      alert("Login failed. Please check if the backend server is running.");
    }
  };
  const navigate = useNavigate();
  const [isLoginView, setIsLoginView] = useState(true);
  const [error, setError] = useState('');

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Account not found. Please register.');
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError('');
    if (!fullName || !email || !password || !confirmPassword) {
      setError('Please fill all fields.');
      return;
    }
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const newUser = { fullName, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Account created! Please login.');
    setIsLoginView(true);
  };

  return (
    <div className="login-wrapper d-flex justify-content-center align-items-center">
      <style>{`
        .login-wrapper {
          background-color: #fcf9f2;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden; 
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        }
        .login-content {
          width: 100%;
          max-width: 520px; 
          margin-top: -60px; 
        }
        .login-header-logo {
          width: 55px; 
          height: 55px;
          object-fit: contain;
        }
        .brand-logo {
          color: #3b2b1a;
          font-weight: 800;
          font-size: 1.6rem;
          margin-top: -10px; 
          letter-spacing: -0.5px;
        }
        .login-card {
          background: white;
          border: 8px solid #eaddca; 
          border-radius: 25px; 
          padding: 30px 40px;
          box-shadow: 0 4px 15px rgba(59, 43, 26, 0.05); 
        }
        .form-title {
          color: #3b2b1a;
          font-weight: 400; /* Removed bold (changed from 700 to 400) */
          letter-spacing: -0.5px;
        }
        .custom-input {
          background-color: #fff;
          border: 1px solid #ced4da;
          padding: 10px;
          border-radius: 8px;
          font-size: 0.95rem;
        }
        .wood-btn {
          background: linear-gradient(to bottom, #dcb78c 0%, #c49c71 100%);
          border: 1px solid #b3895d;
          color: #3b2b1a;
          font-weight: 700;
          padding: 12px;
          border-radius: 10px;
          letter-spacing: 0.5px;
        }
        .toggle-text {
          cursor: pointer;
          font-weight: 700;
          text-decoration: underline;
          color: #3b2b1a;
        }
        .form-label {
          color: #3b2b1a;
          font-weight: 600;
          font-size: 0.85rem;
        }
      `}</style>

      <div className="login-content">
        <div className="text-center mb-2">
          <div className="d-flex flex-column align-items-center">
            <img src={monkeyLogo} alt="Logo" className="login-header-logo" />
            <h2 className="brand-logo">ReadMonkey</h2>
          </div>
        </div>

        <div className="login-card shadow-sm">
          <div className="card-body-custom">

            {error && <div className="alert alert-danger py-1 small text-center mb-3 fw-bold">{error}</div>}

            {isLoginView ? (
              <div className="form-fade">
                <h5 className="text-center mb-4 form-title">Log in to your library</h5>
                <div className="row">
                  <div className="col-12 mb-3">
                    <label className="form-label">Email Address</label>
                    <input type="email" className="form-control custom-input" placeholder="reader@readowl.co" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>
                  <div className="col-12 mb-4">
                    <div className="d-flex justify-content-between">
                      <label className="form-label">Password</label>
                      <a href="#" className="small text-muted text-decoration-none fw-medium">Forgot?</a>
                    </div>
                    <input type="password" className="form-control custom-input" placeholder="•••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                </div>

                <button className="btn wood-btn w-100 mb-3" onClick={handleLogin}>LOG IN</button>
                <div className="text-center mb-3"><small className="text-muted fw-medium">Or log in with</small></div>
                <GoogleLogin
                  className="mb-4 d-flex align-items-center justify-content-center py-2 fw-bold" style={{ fontSize: '0.85rem', borderRadius: '10px' }}
                  onSuccess={handleSuccess}
                  onError={() => {
                    console.log('Login Failed');
                    alert("Google Sign-In was unsuccessful.");
                  }}
                  useOneTap
                />

                <div className="text-center">
                  <p className="small mb-0 fw-medium">New to ReadMonkey? <span className="toggle-text" onClick={() => setIsLoginView(false)}>Register Here</span></p>
                </div>
              </div>
            ) : (
              <div className="form-fade">
                <h5 className="text-center mb-4 form-title">Register for your library</h5>
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input type="text" className="form-control custom-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email Address</label>
                  <input type="email" className="form-control custom-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="row mb-4">
                  <div className="col-6">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control custom-input" placeholder="••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                  </div>
                  <div className="col-6">
                    <label className="form-label">Confirm</label>
                    <input type="password" className="form-control custom-input" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                  </div>
                </div>
                <button className="btn wood-btn w-100 mb-3" onClick={handleRegister}>NEXT</button>
                <p className="text-center small mb-0 fw-medium">Already a member? <span className="toggle-text" onClick={() => setIsLoginView(true)}>Log In Here</span></p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;



//
