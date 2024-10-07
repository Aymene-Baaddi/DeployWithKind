import React  from 'react';
import { useNavigate } from "react-router-dom";
import './login.css'; // Optional: for your custom styles

function Login() { 
  
  const navigate = useNavigate(); 

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center">Register New Owner</h2>
        <form>
          <div className="form-group">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Register
          </button>
        </form>
        <div className="text-center mt-3">
          <span>Already have an account?</span>{' '}
          <span
            onClick={() => navigate(`/login`)}
            className="btn btn-link"
            style={{ color: 'black', textDecoration: 'none' }}
          >
            <span style={{ color: "#323e5b" }}>Login</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
