import { useEffect, useState } from "react";
import { useCourseData } from "../../context/CoursesContext.jsx";
import "./CourseDescription.css";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main.jsx";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserData } from "../../context/UserContext.jsx";
import Loading from "../../components/loading/Loading.jsx";

const CourseDescription = ({ user }) => {
  const [loading,setLoading] = useState(false)
  const params = useParams();
  const navigate = useNavigate();
  const { fetchCourseById, courseById,fetchCourse,fetchMyCourse} = useCourseData();
  const {fetchUser} = useUserData()
  useEffect(() => {
    fetchCourseById(params.id);
  }, [params.id]);

  const checkoutHandler = async()=>{
    const token = localStorage.getItem("token");
    setLoading(true);
    const {data:{order}} = await axios.post(`${server}/api/course/checkout/${params.id}`,{},{
      headers:{
        token,
      }
    });
  
    const options = {
    "key": "rzp_test_RLoPyTFdLYphpO", // Enter the Key ID generated from the Dashboard
    "order_id": order.id,
    "currency": "INR",
    "name": "GETO", //your business name
    "description": "Study Smart Not Hard",
     // This is a sample Order ID. Pass the `id` obtained in the response of Step 1

    handler:async function(response){
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature} = response;
      try {
        const {data} = await axios.post(`${server}/api/verification/${params.id}`,{
          razorpay_order_id,razorpay_payment_id,razorpay_signature
        },{
          headers:{
            token:token
          }
        })
        await fetchUser();
        await fetchCourse();
        await fetchMyCourse();
        toast.success(data.message);
        setLoading(false);
        navigate(`/payment-sucess/${razorpay_payment_id}`)
      } catch (error) {
          toast.error(error.response.data.message);
          setLoading(false);
      }
    },
    theme:{
      color:"#0077b6"
    },
    }
    const razorpay = new window.Razorpay(options);
    razorpay.open()
  }
  return (
    <>
    {
      loading ? <Loading/> : <>
      {courseById && (
        <div className="course-description">
          <div className="course-card">
            <span className="price-badge">₹{courseById.price}</span>

            <div className="course-img-wrapper">
              <img
                src={`${server}/${courseById.image}`}
                alt={courseById.title}
                className="course-img"
              />
            </div>

            <div className="course-content">
              <h3>{courseById.title}</h3>
              <p>Instructor: {courseById.createdBy}</p>
              <p className="duration">Duration: {courseById.duration}/days</p>
              <p className="description">{courseById.description}</p>

              <span>
                Original Price:
                <span className="original-price">₹1199</span>
              </span>

              {user && user.subscription.includes(courseById._id) ? (
                <button
                  className="common-btn"
                  onClick={() => navigate(`/course/study/${courseById._id}`)}
                >
                  Study

                </button>
              ) : (
                <button className="common-btn" onClick={checkoutHandler}>
                  Buy Now
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
    }
    </>
  );
};

export default CourseDescription;
