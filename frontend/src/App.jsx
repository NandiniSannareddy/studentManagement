import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import AddDepartment from './pages/AddDepartment'
import AddSubject from './pages/AddSubject'
import CalendarPage from './pages/CalendarPage'
import UpdateMarks from './pages/UpdateMarks'
import ViewAttendance from './pages/ViewAttendance'
import ViewMarks from './pages/ViewMarks'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/addDepartment" element={<AddDepartment/>}/>
          <Route path="/addSubject" element={<AddSubject/>}/>
          <Route path="/markAttendance" element={<CalendarPage/>}/>
          <Route path="/updateMarks" element={<UpdateMarks/>}/>
          <Route path="/viewAttendance" element={<ViewAttendance/>}/>
          <Route path="/viewMarks" element={<ViewMarks/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
