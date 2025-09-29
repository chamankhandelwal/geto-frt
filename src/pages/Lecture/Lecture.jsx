import { useEffect, useState } from "react";
import "./Lecture.css";
import { useNavigate, useParams } from "react-router-dom";
import { server } from "../../main";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import toast from "react-hot-toast";

const Lecture = ({ user }) => {
  const [lectures, setLectures] = useState([]);
  const [lecture, setLecture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lecLoading, setLecLoading] = useState(false);
  const [show, setShow] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState("");
  const [videoPrev, setVideoPrev] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  if (user && user.role !== "admin" && !user.subscription.includes(params.id)) {
    return navigate("/");
  }
  async function fetchLectures() {
    setLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lectures/${params.id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLectures(data.lectures);
      if (data.lectures.length > 0) {
        fetchLecture(data.lectures[0]._id);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  async function fetchLecture(id) {
    setLecLoading(true);
    try {
      const { data } = await axios.get(`${server}/api/lecture/${id}`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setLecture(data.lecture);
      setLecLoading(false);
    } catch (error) {
      console.log(error);
      setLecLoading(false);
    }
  }

  function changeVideoHandler(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setVideoPrev(reader.result);
      setVideo(file);
    };
  }

  async function submitHandler(e) {
    setBtnLoading(true);
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("description", description);
    myForm.append("file", video);
    try {
      const { data } = await axios.post(
        `${server}/api/course/${params.id}`,
        myForm,
        {
          headers: {
            token: localStorage.getItem("token")
          },
        }
      );
      toast.success("Added Lecture");
      setBtnLoading(false);
      setShow(false);
      fetchLectures();
      setTitle("");
      setDescription("");
      setVideo("");

    } catch (error) {
      toast.error(error.response.data.message);
      setBtnLoading(false);
    }
  }
  async function deleteHandler(id){
    if(confirm("Are you sure you want to delete lecture")){
      try {
        const {data} = await axios.delete(`${server}/api/lecture/${id}`,{
          headers:{
            token:localStorage.getItem("token")
          }
        })
        toast.success("Deleted Lecture!");
        fetchLectures();
      } catch (error) {
        toast.error(error.response.data.message)
      }
    }
  }
  useEffect(() => {
    fetchLectures();
  }, []);
  
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="lecture-page">
          <div className="left">
            {lecLoading || !lecture ? (
              <Loading />
            ) : (
              <div className="lecture-card">
                <div className="lecture-info">
                  <h2>{lecture.title}</h2>
                  <p>{lecture.description}</p>
                </div>

                <div className="video-wrapper">
                  <video
                    src={`${server}/${lecture.video}`}
                    controls
                    tabIndex={"0"}
                    controlsList="nodownload noremoteplayback"
                    disablePictureInPicture
                    disableRemotePlayback
                  />
                  <div className="watermark">{user.email}</div>
                </div>
              </div>
            )}
          </div>

          <div className="right">
            {user && user.role === "admin" && (
              <button className="common-btn" onClick={() => setShow(!show)}>
                {show ? "Close" : "Add Lecture"}
              </button>
            )}
            {show && (
              <div className="lecture-form">
                <h2>Add Lecture</h2>
                <form onSubmit={submitHandler}>
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    id="title"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />

                  <label htmlFor="description">Description</label>
                  <input
                    type="text"
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />

                  <input
                    type="file"
                    id="lecture"
                    placeholder="Choose a video"
                    onChange={changeVideoHandler}
                  />
                  {videoPrev && (
                    <video src={videoPrev} alt="" width={300} controls></video>
                  )}
                  <button type="submit" className="common-btn" disabled={btnLoading}>
                    {btnLoading ? "Plese wait...":"Add lecture"}
                  </button>
                </form>
              </div>
            )}

            {lectures.length > 0 ? (
              lectures.map((el, idx) => (
                <div key={el._id} className="lecture-item">
                  <div
                    className={`lecture-number ${
                      lecture && lecture._id === el._id ? "active" : ""
                    }`}
                    onClick={() => fetchLecture(el._id)}
                  >
                    {idx + 1}. {el.title}
                  </div>
                  {user && user.role === "admin" && (
                    <button
                      className="delete-btn"
                      style={{ marginBottom: "10px" }}
                      onClick={()=>deleteHandler(el._id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p>Coming Soon...</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Lecture;
