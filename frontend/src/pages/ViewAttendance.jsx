// ViewAttendance.jsx
import React, { useState , useEffect} from "react";
import axios from 'axios'

export default function ViewAttendance() {
  const [department, setDepartment] = useState(null);
  const [data, setData] = useState(null);

  const getRowStyle = (percent) => {
    if (percent < 65) return { backgroundColor: "#f8d7da" };
    if (percent < 75) return { backgroundColor: "#fff3cd" };
    return {};
  };

  useEffect(() => {
    const fetchDept=async()=>{
      const dept=await axios.get(`${import.meta.env.VITE_base_url}/getDepartment`);
      setDepartment(dept.data);
    }
    fetchDept();
  }, []);

  const handleDept=async(e)=>{
    const dept=e.target.value;
    const res=await axios.get(`${import.meta.env.VITE_base_url}/getAttendance/${dept}`);
    setData(res.data.data);
  }
  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>Attendance Report</h2>

        {/* dropdown */}
        <div style={styles.filterBox}>
          <label style={styles.label}>Department</label>

          <select
            onChange={handleDept}
            style={styles.select}
          >
            <option value="">Select</option>
           { department?.data?.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.dept_name}
              </option>
            ))}
          </select>
        </div>

        {/* table */}{
          data ? <>
                    <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Roll No</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Present</th>
              <th style={styles.th}>Total working days</th>
              <th style={styles.th}>%</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((s, i) => {
              const percent = Math.round(
                (s.present / s.total) * 100
              );

              return (
                <tr key={i} style={getRowStyle(percent)}>
                  <td style={styles.td}>{s.roll_number}</td>
                  <td style={styles.td}>{s.name}</td>
                  <td style={styles.td}>{s.present}</td>
                  <td style={styles.td}>{s.total}</td>
                  <td style={styles.td}>{percent}%</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* legend */}
        <div style={styles.legend}>
          <span style={{ color: "green" }}>✔ ≥ 75%</span>
          <span style={{ color: "orange", marginLeft: 15 }}>
            ⚠ &lt; 75%
          </span>
          <span style={{ color: "red", marginLeft: 15 }}>
            ❌ &lt; 65%
          </span>
        </div>
          </> : <p>Please select a department to view attendance.</p>
        }

      </div>
    </div>
  );
}

const styles = {
  page: {
    background: "#f4f6f8",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    paddingTop: "40px",
    fontFamily: "Arial",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    width: "750px",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
  },

  filterBox: {
    marginBottom: "15px",
  },

  label: {
    marginRight: "10px",
    fontWeight: "bold",
  },

  select: {
    padding: "6px",
    fontSize: "14px",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    border: "1px solid #ccc",
    padding: "8px",
    background: "#e9ecef",
    textAlign: "center",
  },

  td: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "center",
  },

  legend: {
    marginTop: "10px",
    fontSize: "14px",
  },
};