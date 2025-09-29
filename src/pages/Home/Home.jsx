import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import Typed from "typed.js";
import "./Home.css";
import Testimonial from "../../components/testiomonials/Testimonial.jsx";

const Home = () => {
  const navigate = useNavigate();
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["GETO", "Smart Study", "Fast Learning", "Top Scores"],
      typeSpeed: 120,
      backSpeed: 80,
      backDelay:2000,
      startDelay:500,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    });

    return () => {
      typed.destroy(); // cleanup on unmount
    };
  }, []);

  return (
    <div>
    <div className="home">
      <div className="home-content">
        <h1>
          Welcome to <span ref={typedRef}></span>
        </h1>
        <p>Study less, score more with GETO.</p>
        <button className="common-btn" onClick={() => navigate("/courses")} style={{backgroundColor:"#023e8a"}}>
          Get Started
        </button>
      </div>
    </div>
    <Testimonial/>
    </div>
  );
};

export default Home;
