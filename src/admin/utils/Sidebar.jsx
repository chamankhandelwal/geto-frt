import { Link } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { FaBook, FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import "./Common.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={"/admin/dashboard"} className="sidebar-link">
            <AiFillHome className="icon" />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin/courses"} className="sidebar-link">
            <FaBook className="icon" />
            <span>Course</span>
          </Link>
        </li>
        <li>
          <Link to={"/admin/user"} className="sidebar-link">
            <FaUser className="icon" />
            <span>Users</span>
          </Link>
        </li>
        <li>
          <Link to={"/account"} className="sidebar-link">
            <IoMdLogOut className="icon" />
            <span>Logout</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
