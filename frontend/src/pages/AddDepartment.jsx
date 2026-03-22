// AddDepartment.jsx
import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddDepartment() {
  const [departmentName, setDepartmentName] = useState("");
  const navigate = useNavigate();
  const containerStyle = {
    width: "400px",
    margin: "auto",
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial",
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "5px",
    marginBottom: "15px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  };

  const handleAdd =async (e) => {
    e.preventDefault();
    await axios.post(`${import.meta.env.VITE_base_url}/addDepartment`, { name: departmentName });
    setDepartmentName("");
    toast.success("Department added successfully!");
    setTimeout(()=>{
      navigate("/");
    }, 2000)

  };


  return (
    <div>

      <div style={containerStyle}>

        <h2>Add Department</h2>

        <form>

          <div>
            <label>Department Name</label>
            <br />
            <input
              type="text"
              style={inputStyle}
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
            />
          </div>

          <button onClick={handleAdd} style={buttonStyle}>
            Add Department
          </button>

        </form>

      </div>

    </div>
  );
}