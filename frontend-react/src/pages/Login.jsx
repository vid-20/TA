import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/page.css";

const Login = ({ setIsLoggedIn }) => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // SAVE USER SESSION
      localStorage.setItem("user", JSON.stringify(data.user));
      setIsLoggedIn(true); 
      // REDIRECT
      navigate("/");
      window.location.reload();


    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-register">
      <div className="register-card">
        <h2>Login</h2>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button id="loginBtn" type="submit">Login</button>
        </form>

        <div className="auth-switch">
          <p className="auth-text">Don’t have an account?</p>
          <p className="auth-link" onClick={() => navigate("/register")}
          >
           Register
          </p>
        </div>

        
      </div>
    </div>
  );
};

export default Login;
