import { MdDashboard } from "react-icons/md";
import { IoMdLogOut } from "react-icons/io";
import "./Account.css";
import { useUserData } from "../../context/UserContext.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { server } from "../../main.jsx";

const Account = ({ user }) => {
  const { setIsAuth, setUser } = useUserData();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("You’re out! Come back soon.");
    navigate("/login");
  };

  return (
    <div className="account-container">
      {user && (
        <div className="profile-card">
          <div className="profile-header">
            <h2>My Profile</h2>
            <p>Manage your account settings</p>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span>Name:</span>
              <strong>{user.name}</strong>
            </div>
            <div className="info-item">
              <span>Email:</span>
              <strong>{user.email}</strong>
            </div>
            {user && user.role === "admin" && (
              <div className="info-item">
                <span>Role</span>
                You are {user.role}
              </div>
            )}
          </div>
          <div className="profile-actions">
            <button
              className="action-btn dashboard-btn"
              onClick={() => navigate(`/${user._id}/dashboard`)}
            >
              <MdDashboard className="icon" />
              Dashboard
            </button>
            {user && user.role === "admin" && (
              <button
                className="action-btn dashboard-btn"
                onClick={() => navigate(`/admin/dashboard`)}
              >
                <MdDashboard className="icon" />
                Admin Dashboard
              </button>
            )}
            <button className="action-btn logout-btn" onClick={handleLogout}>
              <IoMdLogOut className="icon" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
