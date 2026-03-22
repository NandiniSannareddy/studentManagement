import { Router } from "express";
import { addDepartment, addSubject, getDepartment, getStudentsByDept, getSubjectByDept, 
    assignMarks, viewMarks,workStatus, checkcalendar,markAttendance, getAttendance }from "../controller/deptController.js";

const router=Router();

router.post("/addDepartment", addDepartment);
router.get("/getDepartment", getDepartment);
router.post("/addSubject", addSubject)
router.get("/getSubjectByDept/:deptId", getSubjectByDept)
router.get("/getStudentsByDept/:deptId", getStudentsByDept)
router.post("/assignMarks/:subId", assignMarks)
router.get("/viewMarks/:deptId", viewMarks)
router.post("/workStatus", workStatus)
router.get("/checkcalendar/:deptId/:date", checkcalendar)
router.post("/markAttendance", markAttendance)
router.get("/getAttendance/:deptId", getAttendance)

export default router;