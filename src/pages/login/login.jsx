import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const isFormDataComplete = () => {
    return Object.values(formData).every((value) => value.trim() !== "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormDataComplete()) {
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <p className="login__title">Pharmaceutical Portal</p>
        <p className="login__subtitle">Good to see you again!</p>

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__form-group">
            <input
              type="text"
              id="email"
              name="email"
              placeholder=""
              value={formData.email}
              onChange={handleInputChange}
              required
              className="login__form-input"
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="login__form-group">
            <input
              type="password"
              id="password"
              name="password"
              placeholder=""
              value={formData.password}
              onChange={handleInputChange}
              required
              className="login__form-input"
            />
            <label htmlFor="password">Password</label>
          </div>
          <button className="login__submit-btn">Login</button>
        </form>
        <p className="login__register-link">
          <Link to="/signup">Don't have an account? Register here</Link>
        </p>
      </div>
      <div className="login__image"></div>
    </div>
  );
}

export default Login;