import React, { useState } from "react";
import "../styles/page.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [error, setError] = useState("");
  //const [success, setSuccess] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword)
      return "All fields are required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email))
      return "Invalid email format";

    if (password.length < 6)
      return "Password must be at least 6 characters";

    if (password !== confirmPassword)
      return "Passwords do not match";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    //setSuccess("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:5001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error);

     setIsRegistered(true);

     setTimeout(() => {
       navigate("/login");
       }, 2000);



    } catch (err) {
      setError(err.message);
    }
  };

return (
  <div className="page-register">
    <div className="register-card">
      <h2>Register</h2>

      {isRegistered ? (
        <p className="success-message success-big">
          ✅ Registration completed successfully!
          <span>Please login to continue.</span>
        </p>

      ) : (
        <>
          {error && <p className="error-message">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <button id="registerBtn" type="submit">
              Register
            </button>
          </form>
        </>
      )}
    </div>
  </div>
);


};

export default Register;

