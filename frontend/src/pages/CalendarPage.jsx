// CalendarPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function CalendarPage() {
  const [department, setDepartment] = useState(null);
  const [status, setStatus] = useState("Working Day");
  const [reason, setReason] = useState("");
  const [selected, setSelected] = useState([]); 
  const [date, setDate] = useState("");
  const [deptId, setDeptId] = useState(null);
  const [show, setShow] = useState(false);
  const [students, setStudents] = useState(null);

  const navigate= useNavigate();


  const container = {
    width: "700px",
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

  const input = {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px"
  };

  const grid = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginTop: "10px"
  };

  const box = (active) => ({
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    cursor: "pointer",
    textAlign: "center",
    background: active ? "#4caf50" : "white",
    color: active ? "white" : "black"
  });

  const button = {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    marginTop: "15px"
  };
  useEffect(() => {
    const fetchDept=async()=>{
      const dept=await axios.get(`${import.meta.env.VITE_base_url}/getDepartment`);
      setDepartment(dept.data);
    }
    fetchDept();
  }, []);

  const handleStatus=(e)=>{
    setStatus(e.target.value);
  };

  const hansubmit=async()=>{
    const res=await axios.get(`${import.meta.env.VITE_base_url}/checkcalendar/${deptId}/${date}`);
    const flag=res.data.data;
    if(flag>0){
      toast.warn("Status already marked for this date");
      navigate("/");
      return;
    }
    else{
      const is_working=status==="Working Day"?1:0;
      if(is_working){
        const students=await axios.get(`${import.meta.env.VITE_base_url}/getStudentsByDept/${deptId}`);
        setStudents(students.data.data);
        setShow(true);
        toast.success("Mark attendance");
      }
      else{
      await axios.post(`${import.meta.env.VITE_base_url}/workStatus`,{
        date,
        department: deptId,
        is_working,
        reason
      });
        toast.success("status marked");
        navigate("/");
      }      

    }
  }

  const toggleStudent=(id)=>{
    setSelected((prev) => {
      if (prev.includes(id)) {
        return prev.filter(s => s !== id);
      }
      return [...prev, id];
    });
  };

  const handleSaveAttendance=async()=>{
    try{
        await axios.post(`${import.meta.env.VITE_base_url}/markAttendance`, {
        deptId,
        date,
        students: selected,
        is_working: 1,
        reason
      });
      toast.success("Attendance marked successfully");
    }
    catch(err){
      toast.error("Failed to mark attendance, try again later", err);
      console.error(err);
    }
    navigate("/");
  }

  return (
    <div style={container}>

      <h2 style={title}>Attendance</h2>
      {
        !show ?
        <>
        <select style={input} onChange={(e) => setDeptId(e.target.value)}>
        <option>Select Department</option>
            {
              department?.data?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.dept_name}
                </option>
              ))
            }

      </select>
      <input type="date" style={input} onChange={(e) => setDate(e.target.value)} />

      <select style={input} onChange={handleStatus}>
        <option>Working Day</option>
        <option>Holiday</option>
      </select>

      <input
        type="text"
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Reason"
        style={input}
      />
      <button style={button} onClick={hansubmit}>
        Submit
      </button>
      </>
      :
      <>
      <h4>Click students = Present</h4>

      <div style={grid}>
        {students.map((s) => (
          <div
            key={s.id}
            style={box(selected.includes(s.id))}
            onClick={() => toggleStudent(s.id)}
          >
            {s.name}<br />{s.roll_number}
          </div>
        ))}
      </div>

      <button style={button} onClick={handleSaveAttendance}>
        Save Attendance
      </button>
      </>
      }
      


    </div>
  );
}

