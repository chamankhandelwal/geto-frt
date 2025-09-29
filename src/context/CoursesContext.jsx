import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { server } from "../main";

const CourseContext = createContext();
export const CourseContextProvider= ({children}) =>{
    const [courses,setCourses] = useState([]);
    const [courseById,setCourseById] = useState([]);
    const [mycourse,setMyCourse] = useState([]);
    async function fetchCourse(){
        try {
            const {data} = await axios.get(`${server}/api/course/all`);
            setCourses(data.courses);


        } catch (error) {
            console.log(error)
        }
    }
    async function fetchCourseById (id){
        try {
        const {data} = await axios.get(`${server}/api/course/${id}`); 
        setCourseById(data.course);
        } catch (err) {
            console.log(err);
        }
  }
    async function fetchMyCourse(){
        try {
            const {data} = await axios.get(`${server}/api/mycourse`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setMyCourse(data.courses);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{

        fetchCourse(),
        fetchMyCourse()

    },[])
    return <CourseContext.Provider value={{courses,fetchCourse,fetchCourseById,courseById,mycourse,fetchCourse,fetchMyCourse}}>
        {children}
    </CourseContext.Provider>
}

export const useCourseData = () => {
    return useContext(CourseContext);
}