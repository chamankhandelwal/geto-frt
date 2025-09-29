import { useEffect } from "react";
import { useCourseData } from "../../context/CoursesContext";
import "./CourseStudy.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";

const CourseStudy = ({ user }) => {
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourseById, courseById } = useCourseData();

  useEffect(() => {
    if (!user) return;
    if (user.role !== "admin" && !user.subscription.includes(params.id)) {
      navigate("/");
    } else {
      fetchCourseById(params.id);
    }
  }, [user, params.id, navigate]);

  return (
    <section className="study-wrapper">
  {courseById ? (
    <div className="study-card">
      <div className="study-image">
        <img src={`${server}/${courseById.image}`} alt={courseById.title} />
      </div>
      <div className="study-details">
        <h2>{courseById.title}</h2>
        <p className="study-description">{courseById.description}</p>
        <p><strong>Instructor:</strong> {courseById.createdBy}</p>
        <p><strong>Duration:</strong> {courseById.duration} days</p>
        <Link to={`/lectures/${courseById._id}`} className="study-lecture-link">
          Go to Lectures →
        </Link>
      </div>
    </div>
  ) : (
    <p className="study-loading-message">Loading course details...</p>
  )}
</section>
  );
};

export default CourseStudy;