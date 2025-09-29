import { useNavigate } from "react-router-dom";
import "./AdminUser.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../utils/Layout";
import { server } from "../../main";
import toast from "react-hot-toast";
const AdminUser = ({ user }) => {
  const navigate = useNavigate();
  if (user && user.role !== "admin") {
    return navigate("/");
  }
  const [users, setUsers] = useState([]);
  async function fetchUser() {
    try {
      const { data } = await axios.get(`${server}/api/user`, {
        headers: {
          token: localStorage.getItem("token"),
        },
      });
      setUsers(data.users);
    } catch (error) {
      console.log(error);
    }
  }
  async function updateRole(id){
    if(confirm("Are you sure!")){
        try {
            const {data} = await axios.put(`${server}/api/user/${id}`,{},{
                headers:{
                    token:localStorage.getItem("token")
                }
            });
            toast.success(data.message);
            fetchUser();
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
  }
  useEffect(() => {
    fetchUser()
  }, []);

  return <Layout>
    <div className="users">
        <h1>GETO MEMBERS</h1>
        <table>
            <thead>
                <tr>
                    <th>Sr No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Update Role</th>

                </tr>
            </thead>
            <tbody>
            {
                users && users.map((el,idx)=>(
                    
                        <tr key={el._id}>
                            <td>{idx+1}</td>
                            <td>{el.name}</td>
                            <td>{el.email}</td>
                            <td>{el.role}</td>
                            <td><button className="btn" onClick={()=>updateRole(el._id)}>
                                Update Role
                            </button>
                            </td>
                        </tr>
                    
                ))
            }
            </tbody>
        </table>
    </div>
  </Layout>;
};

export default AdminUser;
