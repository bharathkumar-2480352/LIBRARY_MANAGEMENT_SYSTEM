import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';

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