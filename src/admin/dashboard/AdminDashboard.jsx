import { useNavigate } from "react-router-dom"
import Layout from "../utils/Layout";
import { useEffect, useState } from "react";
import axios from "axios"
import { server } from "../../main";
import "./Dashboard.css";
const AdminDashboard = ({user}) => {
    const navigate = useNavigate();
    if(user && user.role !== "admin"){
        return navigate("/home");
    }
    const [stats,setStats] = useState([]);
    async function fetchStats(){
        try {
            const {data} = await axios.get(`${server}/api/stats`,{
                headers:{
                    token:localStorage.getItem("token")
                }
            })
            setStats(data.stats);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        fetchStats()
    },[])
  return (
    <Layout>
        <div className="main-content">
            <div className="box">
                <p>Total Courses </p>
                <p>{stats.totalCourses}</p>
            </div>
            <div className="box">
                <p>Total Lectures</p>
                <p>{stats.totalLectures}</p>
            </div>
            <div className="box">
                <p>Total User </p>
                <p>{stats.totalUser}</p>
            </div>
        </div>
    </Layout>
  )
}

export default AdminDashboard