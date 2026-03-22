// ViewMarks.jsx
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
export default function ViewMarks() {
  const [department, setDepartment] = useState(null);
  const [students, setStudents] = useState(null);

  const container = {
    width: "800px",
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
    marginBottom: "20px"
  };

  const table = {
    width: "100%",
    borderCollapse: "collapse"
  };

  const thtd = {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center"
  };

  useEffect(() => {
    const fetchDept=async()=>{
      const dept=await axios.get(`${import.meta.env.VITE_base_url}/getDepartment`);
      setDepartment(dept.data);
    }
    fetchDept();
  }, []);  
  const handleDeptChange=async(e)=>{
      const deptId=e.target.value;
      const marks=await axios.get(`${import.meta.env.VITE_base_url}/viewMarks/${deptId}`);
      setStudents(marks.data);
    }
    let subjects = [];
  let grouped = {};

  if (students?.data) {
    students.data.forEach((row) => {

      if (!subjects.includes(row.sub_name)) {
        subjects.push(row.sub_name);
      }
      if (!grouped[row.roll_number]) {
        grouped[row.roll_number] = {
          name: row.name,
          roll: row.roll_number,
          marks: {}
        };
      }

      grouped[row.roll_number].marks[row.sub_name] =
        row.marks ?? "Not Assigned";

    });

  }
  return (
    <div style={container}>

      <h2 style={title}>View Marks</h2>

      
      <select style={input} onChange={handleDeptChange}>
            <option>Select Department</option>
            {
              department?.data?.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.dept_name}
                </option>
              ))
            }
       </select>

      
        <table style={table}>

          {!students ? (
            <tr>
              <td style={thtd}>
                Please select department
              </td>
            </tr>
          ) : (
            <>
              <thead>
                <tr>
                  <th style={thtd}>Roll</th>
                  <th style={thtd}>Name</th>

                  {subjects.map((sub) => (
                    <th key={sub} style={thtd}>
                      {sub}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {Object.values(grouped).map((stu) => (
                  <tr key={stu.roll}>

                    <td style={thtd}>{stu.roll}</td>
                    <td style={thtd}>{stu.name}</td>

                    {subjects.map((sub) => (
                      <td style={thtd}>
                        {stu.marks[sub] ?? "Not Assigned"}
                      </td>
                    ))}

                  </tr>
                ))}
              </tbody>
            </>
          )}

        </table>

    </div>
  );
}