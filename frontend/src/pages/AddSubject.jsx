// AddSubject.jsx
import React, { use } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AddSubject() {
  const [department, setDepartment] = useState(null);
  const [subjectName, setSubjectName] = useState("");
  const [deptId, setDeptId] = useState(null);
  const navigate = useNavigate();
  const container = {
    width: "400px",
    margin: "50px auto",
    padding: "25px",
    borderRadius: "10px",
    background: "#f4f6f8",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    fontFamily: "Arial"
  };

  const title = {
    textAlign: "center",
    marginBottom: "20px"
  };

  const formGroup = {
    marginBottom: "15px"
  };

  const input = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const button = {
    width: "100%",
    padding: "10px",
    border: "none",
    background: "#007bff",
    color: "white",
    borderRadius: "5px",
    cursor: "pointer"
  };
  useEffect(() => {
    const fetchDept=async()=>{
      const dept=await axios.get(`${import.meta.env.VITE_base_url}/getDepartment`);
      setDepartment(dept.data);
    }
    fetchDept();
  }, []);

  const handleAdd=async(e)=>{
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_base_url}/addSubject`, { name: subjectName, deptId });
    setSubjectName("");
    toast.success("Subject added successfully!");
    setTimeout(()=>{
      navigate("/");
    }, 2000)
  }

  return (
    <div style={container}>
      <h2 style={title}>Add Subject</h2>

      <form>
        <div style={formGroup}>
          <label>Department</label>
          <select style={input} onChange={(e) => setDeptId(e.target.value)}>
            <option>Select Department</option>
            {
              department?.data?.map((dept) => (
                <option value={dept.id}>{dept.dept_name}</option>
              ))
            }
          </select>
        </div>

        <div style={formGroup}>
          <label>Subject Name</label>
          <input type="text" value={subjectName} onChange={(e)=>setSubjectName(e.target.value)} style={input} />
        </div>

        <button onClick={handleAdd} style={button}>
          Add Subject
        </button>
      </form>
    </div>
  );
}