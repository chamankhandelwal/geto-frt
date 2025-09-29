import CourseCard from "../../components/coursecard/CourseCard";
import { useCourseData } from "../../context/CoursesContext";
import "./Dashboard.css";

const Dashboard = () => {
  const { mycourse } = useCourseData();

  return (
    <section className="dashboard-section">
      <div className="dashboard-header">
        <h2>📚 Your Enrolled Courses</h2>
        <p>Continue learning from where you left off</p>
      </div>

      <div className="dashboard-grid">
        {mycourse && mycourse.length > 0 ? (
          mycourse.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))
        ) : (
          <div className="empty-message">
            <p>You haven’t enrolled in any courses yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;