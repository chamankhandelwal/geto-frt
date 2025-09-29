import React, { useState } from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext";
import { useCourseData } from "../../context/CoursesContext";
const Login = () => {
  const navigate = useNavigate();
  const {btnLoading,loginUser} = useUserData();
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const {fetchMyCourse} = useCourseData();

  const handleFormSubmit =async(evt)=> {
    evt.preventDefault();
    await loginUser(email,password,navigate,fetchMyCourse);
  }
  return (
     <div className="auth-page">
      <div className="auth-form">
        <h2>Login</h2>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="email">Email:</label>
                <input type="email" name="email" id="email" required value={email} onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name="password" id="password"  required value={password} onChange={e=>setPassword(e.target.value)}/>
                <button className="common-btn" type="submit" disabled={btnLoading}>{btnLoading?"Plese wait...":"Login"}</button>
                <p className="mt-3 link-p">
                  Don't have an account! <Link to={"/register"} style={{textDecoration:"none",fontStyle:"italic"}}>Register</Link>
                </p>
            </form>
      </div>
    </div>
  );
};

export default Login;
