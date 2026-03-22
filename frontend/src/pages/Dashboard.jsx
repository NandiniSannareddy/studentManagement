// Dashboard.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Dashboard() {

  const pageStyle = {
    minHeight: "100vh",
    backgroundImage:
      "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTifJewsBG6wZitx9XOjVRzRrbrmzOO6UyFyQ&s')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "30px",
  };

  const containerStyle = {
    width: "80%",
    margin: "auto",
    textAlign: "center",
    fontFamily: "Arial",
    backgroundColor: "rgba(255,255,255,0.85)",
    padding: "20px",
    borderRadius: "10px",
  };

  const buttonContainer = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    marginTop: "20px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#1976d2",
    color: "white",
    cursor: "pointer",
    borderRadius: "5px",
  };

  const textStyle = {
    marginTop: "40px",
    fontSize: "18px",
    maxWidth: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    lineHeight: "1.5",
  };

  return (
    <div style={pageStyle}>

      <div style={containerStyle}>

        <div style={{ fontSize: 60 }}>
          Student Management System
        </div>

        <h1>Admin Dashboard</h1>

        <div style={buttonContainer}>
          <Link to="/addDepartment" style={buttonStyle}>Add Department</Link>
          <Link to="/addSubject" style={buttonStyle}>Add Subject</Link>
          <Link to="/updateMarks" style={buttonStyle}>Update Marks</Link>
          <Link to="/viewMarks" style={buttonStyle}>View Marks</Link>
          <Link to="/markAttendance" style={buttonStyle}>Mark Attendance</Link>
          <Link to="/viewAttendance" style={buttonStyle}>View Attendance</Link>
        </div>

        {/* center text under buttons */}

        <div style={textStyle}>
          This Student Management System allows administrators to manage
          departments, subjects, marks, and attendance efficiently.
          The system demonstrates database concepts such as transactions,
          concurrency control, locking, normalization, and indexing.
        </div>

      </div>

    </div>
  );
}