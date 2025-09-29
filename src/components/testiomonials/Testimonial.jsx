import "./Testimonial.css"
const Testimonial = () => {
 const testimonialsData = [
    {
      id: 1,
      name: "Anshu",
      position: "Student",
      message:
        "GETO pe padhai karna itna easy hai! Courses bilkul mast aur teachers top-class hain.",
      image:"/anshu.jpg"
    },
    {
      id: 2,
      name: "Ishant",
      position: "Student",
      message:
        "Interactive lessons aur smart tips se learning enjoyable ho gayi. Full recommend!",
      image:"/ishant.jpg"
        },
    {
      id: 3,
      name: "Gaurav",
      position: "Student",
      message:
        "Yahan se maine zyada seekha than kisi bhi aur platform se. Quizzes aur lessons super fun hain!",
      image:"gaurav.jpg"
        },
    {
      id: 4,
      name: "Harry",
      position: "Student",
      message:
        "GETO ki study style full smart hai. Time waste nahi, bas padhai aur scores improve.",
      image:
        "harry.jpg",
    },
  ];
  return (
    <section className="testimonials">
        <h2>What Do Our Students Say?</h2>
        <div className="testimonials-card">
            {
                testimonialsData.map((el)=>(
                    <div className="testimonial-card" key={el.id}>
                        <div className="student-image">
                            <img src={el.image} alt="" />
                        </div>
                        <p className="message">
                            {el.message}
                        </p>
                        <div className="info">
                            <p className="name">{el.name}</p>
                            <p className="position">{el.position}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    </section>
  )
}

export default Testimonial