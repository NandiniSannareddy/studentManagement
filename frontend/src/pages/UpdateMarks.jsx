// UpdateMarks.jsx
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function UpdateMarks() {
  const [department, setDepartment] = useState(null);
  const [subject, setSubject] = useState(null);
  const [students, setStudents] = useState(null);
  const [subId, setSubId] = useState(null);
  const [marks, setMarks] = useState([]);
  const navigate= useNavigate();

  const container = {
    width: "600px",
    margin: "40px auto",
    padding: "20px",
    background: "#f4f6f8",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
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
    width: "90%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
    marginBottom: "20px"
  };

  const thtd = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  };

  const button = {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
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

  const deptChange=async(e)=>{
    const deptId=e.target.value;
    const sub=await axios.get(`${import.meta.env.VITE_base_url}/getSubjectByDept/${deptId}`);
    setSubject(sub.data);
    const students=await axios.get(`${import.meta.env.VITE_base_url}/getStudentsByDept/${deptId}`);
    setStudents(students.data);
  }

  const handleSub=(e)=>{
    setSubId(e.target.value);
  }

  const handleMarks = (id, value) => {

    setMarks((prev) => {

      const exists = prev.find(s => s.id === id);

      if (exists) {
        return prev.map(s =>
          s.id === id
            ? { ...s, marks: value }
            : s
        );
      }

      return [
        ...prev,
        { id: id, marks: value }
      ];

    });

  };

  const saveMarks = async () => {
    try{
      await axios.post(
        `${import.meta.env.VITE_base_url}/assignMarks/${subId}`,
        {
          students: marks
        }
      );
      toast.success("Marks updated successfully");
      setTimeout(()=>{
        navigate("/");
      }, 2000)
    }
    catch(err){
      toast.error("Failed to update marks", err);
      console.error(err);
    }

  };
  return (
    <div style={container}>

      <h2 style={title}>Update Marks</h2>

      <div style={formGroup}>
        <label>Department</label>
          <select style={input} onChange={deptChange}>
            <option>Select Department</option>
            {
              department?.data?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.dept_name}
                </option>
              ))
            }
          </select>
      </div>

      <div style={formGroup}>
        <label>Subject</label>
        <select style={input} onChange={handleSub}>
          <option>Select Subject</option>
            {
              subject?.data?.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.sub_name}
                </option>
              ))
            }
        </select>
      </div>

      <table style={table}>
        <thead>
            <th style={thtd}>Roll No</th>
            <th style={thtd}>Student</th>
            <th style={thtd}>Marks</th>
        </thead>

        <tbody>
          {
            students?.data?.map((student) => (
              <tr key={student.id}>
                <td style={thtd}>{student.roll_number}</td>
                <td style={thtd}>{student.name}</td>
                <td style={thtd}>
                  <input type="number" style={input} onChange={(e) => handleMarks(student.id, e.target.value)} />
                </td>
              </tr>
            ))        

          }
        </tbody>
      </table>

      <button style={button} onClick={saveMarks}>
        Save Marks
      </button>

    </div>
  );
}