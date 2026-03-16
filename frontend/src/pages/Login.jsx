
import React, { useState, useEffect } from 'react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  
  // Form States
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    identifier: '' // For login (Email or Username)
  });

  // Initialize "Database" in localStorage
  useEffect(() => {
    if (!localStorage.getItem('userDatabase')) {
      localStorage.setItem('userDatabase', JSON.stringify([]));
    }
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error when typing
  };

  const validateEmail = (email) => {
    return String(email).toLowerCase().match(/\S+@\S+\.\S+/);
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { fullName, email, username, password, confirmPassword } = formData;
    const db = JSON.parse(localStorage.getItem('userDatabase'));

    // Validation
    if (!fullName || !email || !username || !password) {
      setError('Please fill all fields');
      return;
    }
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (db.find(u => u.email === email.toLowerCase())) {
      setError('Email already exists');
      return;
    }
    if (db.find(u => u.username === username)) {
      setError('Username already taken');
      return;
    }

    // Success - Save User
    const newUser = { fullName, email: email.toLowerCase(), username, password };
    db.push(newUser);
    localStorage.setItem('userDatabase', JSON.stringify(db));
    alert('Account created successfully!');
    setIsLogin(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { identifier, password } = formData;
    const db = JSON.parse(localStorage.getItem('userDatabase'));

    if (!identifier || !password) {
      setError('Please enter both credentials');
      return;
    }

    const user = db.find(u => 
      u.email === identifier.toLowerCase() || u.username === identifier
    );

    if (!user) {
      setError('Account not found. Please Sign Up.');
      return;
    }

    if (user.password === password) {
      alert(`Welcome back, ${user.fullName}!`);
      window.location.href = '/home'; // Or use useNavigate() from react-router-dom
    } else {
      setError('Incorrect password');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* Left Side - Image */}
        <div style={styles.imageSide}></div>

        {/* Right Side - Form */}
        <div style={styles.formSide}>
          <div style={styles.logo}>LOGO</div>
          
          <h2>{isLogin ? 'LOGIN / SIGNUP' : 'CREATE ACCOUNT'}</h2>
          
          {error && <div style={styles.errorMsg}>{error}</div>}

          <form style={styles.form} onSubmit={isLogin ? handleLogin : handleSignup}>
            {!isLogin && (
              <>
                <input 
                  type="text" name="fullName" placeholder="Full Name" 
                  style={styles.input} onChange={handleInputChange} 
                />
                <input 
                  type="email" name="email" placeholder="Email" 
                  style={styles.input} onChange={handleInputChange} 
                />
              </>
            )}

            <input 
              type="text" 
              name={isLogin ? "identifier" : "username"} 
              placeholder={isLogin ? "Username/Email" : "Username"} 
              style={styles.input} 
              onChange={handleInputChange} 
            />

            <input 
              type="password" name="password" placeholder="Password" 
              style={styles.input} onChange={handleInputChange} 
            />

            {!isLogin && (
              <input 
                type="password" name="confirmPassword" placeholder="Confirm Password" 
                style={styles.input} onChange={handleInputChange} 
              />
            )}

            <div style={styles.btnGroup}>
              {isLogin ? (
                <>
                  <button type="submit" style={styles.btn}>LOGIN</button>
                  <button type="button" style={styles.btn} onClick={() => setIsLogin(false)}>SIGNUP</button>
                </>
              ) : (
                <div style={{width: '100%', textAlign: 'center'}}>
                  <button type="submit" style={{...styles.btn, width: '100%'}}>SIGNUP</button>
                  <p style={styles.toggleText} onClick={() => setIsLogin(true)}>
                    Already have an account? Login
                  </p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// CSS-in-JS Styles
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f5ece0',
    padding: '20px'
  },
  card: {
    display: 'flex',
    width: '100%',
    maxWidth: '850px',
    backgroundColor: '#fff',
    borderRadius: '30px',
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
    flexWrap: 'wrap' // For responsiveness
  },
  imageSide: {
    flex: '1 1 400px',
    minHeight: '300px',
    background: "url('https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=1000&auto=format&fit=crop') center/cover no-repeat",
  },
  formSide: {
    flex: '1 1 400px',
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: '100px',
    height: '60px',
    backgroundColor: '#8b5a2b',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontWeight: 'bold',
    marginBottom: '20px'
  },
  form: { width: '100%', display: 'flex', flexDirection: 'column', gap: '15px' },
  input: {
    padding: '15px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#feffea',
    fontSize: '16px',
    outline: 'none'
  },
  btnGroup: { display: 'flex', gap: '15px', marginTop: '10px' },
  btn: {
    padding: '12px 30px',
    borderRadius: '12px',
    border: 'none',
    background: 'linear-gradient(to bottom, #5d3a1a, #2b1a0a)',
    color: '#d4a373',
    fontWeight: 'bold',
    cursor: 'pointer'
  },
  errorMsg: { color: 'red', fontSize: '14px', marginBottom: '10px' },
  toggleText: { marginTop: '15px', cursor: 'pointer', fontSize: '14px', color: '#5d3a1a' }
};

export default Login;