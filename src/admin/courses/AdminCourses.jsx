import { useNavigate } from "react-router-dom";
import Layout from "../utils/Layout";
import { useCourseData } from "../../context/CoursesContext";
import CourseCard from "../../components/coursecard/CourseCard";
import "./Courses.css";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { server } from "../../main";
const categories = [
  "1st semster",
  "2nd semster",
  "3rd semster",
  "4th semster",
  "5th semster",
  "6th semster",
  "7th semster",
  "8th semster",
];
const AdminCourses = ({ user }) => {
  const navigate = useNavigate();
  const { courses, fetchCourse } = useCourseData("");
  if (user && user.role !== "admin") {
    return navigate("/home");
  }
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [image, setImage] = useState("");
  const [imagePvr, setImagePvr] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  function changeImageHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImagePvr(reader.result);
      setImage(file);
    };
  }
  async function formSubmitHandler(evt) {
    evt.preventDefault();
    setBtnLoading(true);
    const myForm= new FormData()
    myForm.append("title",title);
    myForm.append("description",description);
    myForm.append("price",price);
    myForm.append("category",category);
    myForm.append("duration",duration);
    myForm.append("createdBy",createdBy);
    myForm.append("file",image);
    try {
        const {data} = await axios.post(`${server}/api/course/new`,myForm,{
            headers:{
                token:localStorage.getItem("token"),
            }
        })
        toast.success(data.message);
        setBtnLoading(false);
        await fetchCourse();
        setImage("");
        setTitle("");
        setDescription("");
        setCategory("");
        setDuration("");
        setCreatedBy("");
        setImagePvr("");
        setPrice("")
    } catch (error) {
        toast.error(error.response.data.message);
        setBtnLoading(false);
    }

  }
  return (
    <Layout>
      <div className="admin-courses">
        <div className="left">
          <h1>All Courses</h1>
          <div className="dashboard-content">
            {courses && courses.length > 0 ? (
              courses.map((el) => {
                return <CourseCard key={el._id} course={el}></CourseCard>;
              })
            ) : (
              <p>No Avilabel Courses</p>
            )}
          </div>
        </div>
        <div className="right">
          <div className="add-course">
            <div className="course-form">
              <h2>Add Course</h2>
              <form onSubmit={formSubmitHandler}>
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={title}
                  onChange={(evt) => setTitle(evt.target.value)}
                />

                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  name="description"
                  id="description"
                  value={description}
                  onChange={(evt) => setDescription(evt.target.value)}
                />

                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={price}
                  onChange={(evt) => setPrice(evt.target.value)}
                />

                <label htmlFor="createdBy">Created By</label>
                <input
                  type="text"
                  name="createdBy"
                  id="createdBy"
                  value={createdBy}
                  onChange={(evt) => setCreatedBy(evt.target.value)}
                />

                <select
                  name="category"
                  id="category"
                  value={category}
                  onChange={(evt) => setCategory(evt.target.value)}
                >
                  <option value={""}>Select Semster</option>
                  {categories.map((el) => (
                    <option value={el} key={el}>
                      {el}
                    </option>
                  ))}
                </select>
                <label htmlFor="duration">Duration/days</label>
                <input
                  type="number"
                  name="duration"
                  id="duration"
                  value={duration}
                  onChange={(evt) => setDuration(evt.target.value)}
                />
                <input
                  type="file"
                  placeholder="Choose a thumbnail"
                  onChange={changeImageHandler}
                />
                {imagePvr && <img src={imagePvr} alt="" width={300} />}
                <button
                  type="submit"
                  className="common-btn"
                  disabled={btnLoading}
                >
                  {btnLoading ? "Please wait..." : "Add Course"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminCourses;
