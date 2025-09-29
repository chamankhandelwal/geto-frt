import "./About.css";

const About = () => {
  return (
    <section className="about">
      <h2>About Us</h2>
      <div className="about-container">
        <div className="about-image">
          <img src="/iamwoker2.jpg" alt="Founder" />
          <h3>Chaman Khandelwal</h3>
        </div>
        <div className="about-content">
          <p>
            The idea of <strong>GETO</strong> was born during our own struggles. 
            We were preparing for exams and realized that at the last moment, 
            students often don’t find good lectures or quality notes. 
            Most of us study seriously only right before exams, 
            but the problem is — resources are scattered and not reliable. 
          </p>
          <p>
            That’s when we thought: why not build something that makes 
            <strong> last-minute study smarter, faster, and more effective?</strong>  
            And that’s how GETO came into existence.
          </p>
          <p className="extra-line">
            Today, our mission is simple: <em>help every student study less, score more.</em>
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
