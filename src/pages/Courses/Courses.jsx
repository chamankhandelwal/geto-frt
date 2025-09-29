import CourseCard from "../../components/coursecard/CourseCard.jsx";
import { useCourseData } from "../../context/CoursesContext.jsx"
import { useUserData } from "../../context/UserContext.jsx";
import "./Courses.css"
const Courses = () => {
    const {user,isAuth} = useUserData();
    const {courses} = useCourseData();
    console.log(courses);
  return (
    <div className="courses">
        <h2>Availabel Courses</h2>
        <div className="course-container">
            {
                courses && courses.length > 0 ?
                courses.map(el => (<CourseCard key={el._id} course={el}/>))

                : <p>No availabel courses</p>
            }
        </div>
    </div>
  )
}

export default Courses