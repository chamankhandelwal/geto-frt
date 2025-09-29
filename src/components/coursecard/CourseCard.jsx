import { useNavigate } from "react-router-dom";
import { useUserData } from "../../context/UserContext.jsx";
import { server } from "../../main.jsx";
import "./CourseCard.css";
import toast from "react-hot-toast";
import axios from "axios";
import { useCourseData } from "../../context/CoursesContext.jsx";
const CourseCard = ({ course }) => {
  const { user, isAuth } = useUserData();
  const navigate = useNavigate();
  const {fetchCourse} = useCourseData
  async function deleteHandler(id){
   if(confirm("Are you sure to delete this course")){
     try {
      const {data} = await axios.delete(`${server}/api/course/${id}`,{
        headers:{
          token:localStorage.getItem("token")
        }
      });

      toast.success(data.message);
      fetchCourse();
    } catch (error) {
      toast.error(error.response.data.message)
    }
   }
  }
  
  return (
    <div className="course-card">
      <div className="course-img-wrapper">
        <img
          src={`${server}/${course.image}`}
          alt={course.title}
          className="course-img"
        />
      </div>
      <div className="course-content">
        <h3>{course.title}</h3>
        <div className="price-badge">₹{course.price}/<span style={{fontSize:"10px"}}>only</span></div>
        <p className="instructor">Instructor: {course.createdBy}</p>
        <p className="duration">Duration: {course.duration} days</p>
      </div>
      <p className="original-price">₹1999</p>
      {isAuth ? (
        <>
          {user && user.role !== "admin" ? (
            <>
              {user.subscription.includes(course._id) ? (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/study/${course._id}`)}
                >
                  Let's learn
                </button>
              ) : (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/${course._id}`)}
                >
                  Get Started
                </button>
              )}
            </>
          ) : (
            <button
              className="common-btn"
              onClick={() => navigate(`/course/study/${course._id}`)}
            >
              Let's learn
            </button>
          )}
        </>
      ) : (
        <button className="common-btn" onClick={() => navigate("/login")}>
          Get Started
        </button>
      )}
      {
        user && user.role === "admin" && <button className="common-btn delete-btn" onClick={()=>deleteHandler(course._id)}>
          Delete
        </button>
      }
    </div>
  );
};

export default CourseCard;
