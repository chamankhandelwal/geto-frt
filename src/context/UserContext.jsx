import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main.jsx";
import toast, { Toaster } from "react-hot-toast";
const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  async function loginUser(email, password, navigate,fetchMyCourse) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/login`, {
        email,
        password,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      setBtnLoading(false);
      navigate("/");
      fetchMyCourse();
    } catch (error) {
      setBtnLoading(false);
      setIsAuth(false);
      toast.error(error.response.data.message);
    }
  }

  async function registerUser(name, email, password, navigate) {
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/register`, {
        name,
        email,
        password,
      });
      console.log("REGISTER RESPONSE:", data);
      if (!data.activationToken) {
      throw new Error("No activation token received");
    }
      toast.success(data.message);
      localStorage.setItem("activationToken", data.activationToken);
      navigate("/verify");
      setBtnLoading(false);
      
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }

  async function verifyOtp(otp, navigate) {
    const activationToken = localStorage.getItem("activationToken");
    setBtnLoading(true);
    try {
      const { data } = await axios.post(`${server}/api/user/verify`, {
        otp,
        activationToken,
      });
      toast.success(data.message);
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuth(true);
      navigate("/");
      localStorage.removeItem("activationToken");
      setBtnLoading(false);
    } catch (error) {
      setBtnLoading(false);
      toast.error(error.response.data.message);
    }
  }
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user/myprofile`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setIsAuth(true);
      setUser(data.user);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
  const token = localStorage.getItem("token");
  if (token) {
    fetchUser();  
  } else {
    setLoading(false);
  }
}, []);
  return (
    <UserContext.Provider
      value={{
        user,
        isAuth,
        setIsAuth,
        loginUser,
        btnLoading,
        loading,
        setUser,
        registerUser,
        verifyOtp,
        fetchUser
      }}
    >
      {children}
      <Toaster />
    </UserContext.Provider>
  );
};

export const useUserData = () => {
  return useContext(UserContext);
};
