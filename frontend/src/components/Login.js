import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // In a real app, this would be an API call to your backend
      // For demonstration, we'll simulate a successful login
      const mockUser = {
        id: 'user123',
        email: email,
        name: email.split('@')[0], // Use part of email as name
        avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
      };

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Store user in localStorage
      localStorage.setItem('user', JSON.stringify(mockUser));

      // Navigate to dashboard
      navigate('/dashboard');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // In a real app, this would trigger OAuth flow
    alert('Google login would be implemented here in a real app');
  };

  const handleGitHubLogin = () => {
    // In a real app, this would trigger OAuth flow
    alert('GitHub login would be implemented here in a real app');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>CollabCode</h1>
          <p>Collaborative coding platform</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary">
            {loading ? 'Logging in...' : 'Sign In'}
          </button>

          {error && <div className="form-error">{error}</div>}

          <div className="login-options">
            <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            <p>
              <Link to="/forgot-password">Forgot password?</Link>
            </p>
          </div>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-login">
            <button onClick={handleGoogleLogin} className="btn-social btn-google">
              Sign in with Google
            </button>
            <button onClick={handleGitHubLogin} className="btn-social btn-github">
              Sign in with GitHub
            </button>
          </div>
        </form>
      </div>

      <div className="login-footer">
        <p>&copy; {new Date().getFullYear()} CollabCode. All rights reserved.</p>
      </div>
    </div>
  );
};

export default Login;