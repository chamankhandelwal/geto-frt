import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home.jsx";
import Header from "./components/header/Header.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Verify from "./pages/auth/Verify.jsx";
import Footer from "./components/footer/Footer.jsx";
import About from "./pages/about/About.jsx";
import Account from "./pages/account/Account.jsx";
import { useUserData } from "./context/UserContext.jsx";
import Loading from "./components/loading/Loading.jsx";
import Courses from "./pages/Courses/Courses.jsx";
import CourseDescription from "./pages/CourseDescription/CourseDescription.jsx";
import PaymentSucess from "./pages/paymentsucess/PaymentSucess.jsx";
import Dashboard from "./pages/dashboard/Dashboard.jsx";
import CourseStudy from "./pages/CourseStudy/CourseStudy.jsx";
import Lecture from "./pages/Lecture/Lecture.jsx";
import AdminDashboard from "./admin/dashboard/AdminDashboard.jsx";
import AdminCourses from "./admin/courses/AdminCourses.jsx";
import AdminUser from "./admin/users/AdminUser.jsx";

const App = () => {
  const { isAuth, user, loading } = useUserData();

  useEffect(() => {
    const disableRightClick = (e) => e.preventDefault();
    document.addEventListener("contextmenu", disableRightClick);
    return () => {
      document.removeEventListener("contextmenu", disableRightClick);
    };
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <BrowserRouter>
          <div className="page-wrapper">
            <Header isAuth={isAuth} />
            <main className="page-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={isAuth ? <Home /> : <Login />} />
                <Route path="/register" element={isAuth ? <Home /> : <Register />} />
                <Route path="/verify" element={isAuth ? <Home /> : <Verify />} />
                <Route path="/about" element={<About />} />
                <Route path="/courses" element={<Courses />} />
                <Route path="/account" element={isAuth ? <Account user={user} /> : <Login />} />
                <Route path="/course/:id" element={isAuth ? <CourseDescription user={user} /> : <Login />} />
                <Route path="/payment-sucess/:id" element={isAuth ? <PaymentSucess user={user} /> : <Login />} />
                <Route path="/:id/dashboard" element={isAuth ? <Dashboard user={user} /> : <Login />} />
                <Route path="/course/study/:id" element={isAuth ? <CourseStudy user={user} /> : <Login />} />
                <Route path="/lectures/:id" element={isAuth ? <Lecture user={user} /> : <Login />} />
                <Route path="/admin/dashboard" element={isAuth ? <AdminDashboard user={user} /> : <Login />} />
                <Route path="/admin/courses" element={isAuth ? <AdminCourses user={user} /> : <Login />} />
                <Route path="/admin/user" element={isAuth ? <AdminUser user={user} /> : <Login />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      )}
    </>
  );
};

export default App;