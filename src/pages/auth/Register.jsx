import { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = useUserData();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = async (evt) => {
    evt.preventDefault();
    await registerUser(name, email, password, navigate);
  };
  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
          />
          <button className="common-btn" type="submit" disabled={btnLoading}>{btnLoading?"Plese wait...":"Register"}</button>
          <p className="mt-3 link-p">
            Already have account?&nbsp;
            <Link
              to={"/login"}
              style={{ textDecoration: "none", fontStyle: "italic" }}
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
