import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

const Login = () => {
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;
      const response = await axios.post('http://localhost:5000/api/auth/google-login', {
        token: token
      });
      if (response.status === 200) {
        const userName = response.data.user.name;
        alert(`Login Successful! Welcome to the Library, ${userName}.`);
        const { name, email, picture, id } = response.data.user; 
        console.log("User Name:", name);
        console.log("User Email:", email);
        console.log("Profile Pic:", picture);
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' }}>
      <h2>Library Management System</h2>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log('Login Failed');
          alert("Google Sign-In was unsuccessful.");
        }}
        useOneTap 
      />
    </div>
  );
};

export default Login;