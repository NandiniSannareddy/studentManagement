import {db} from '../db.js'
export const addDepartment=async(req, res)=>{
    try{
        const {name}=req.body;
        const row=await db.query(`insert into department (dept_name) values (?)`, name);
        if(!res){
            return res.status(400).json({"message":"failed to insert"});
        }
        res.status(201).json({"message":`department inserted`,"insertId":row[0].insertId});
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }
}

export const getDepartment=async(req, res)=>{
    try{
        const row=await db.query(`select * from department`);
        if(!row){
            return res.status(400).json({"message":"failed to get department"})
        }
        res.status(200).json({"message":"departments fetched successfully", "data":row[0]});
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }
}

export const addSubject=async(req, res)=>{
    try{
        const {name, deptId}=req.body;
        const row=await db.query(`insert into subjects (sub_name, dept_id) values (?,?)`,[name, deptId]);
        if(!row){
            return res.status(400).json({"message":"failed to insert"});
        }
        res.status(201).json({"message":"subject inserted successfully", insertId:row[0].insertId});
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }
}

export const getSubjectByDept=async(req, res)=>{
    try{
        const deptId=req.params.deptId;
        const row=await db.query(`select * from subjects where dept_id=?`, deptId)
        if(!row){
            return res.status(400).json({"message":"failed to fetch subjects"});
        }
        res.status(200).json({"message":"subjects fetched successfully", data:row[0]})
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }    
}

export const getStudentsByDept=async(req, res)=>{
    try{
        const deptId=req.params.deptId;
        const row=await db.query(`select * from student where dept_id=?`, deptId)
        if(!row){
            return res.status(400).json({"message":"failed to fetch students"});
        }
        res.status(200).json({"message":"students fetched successfully", data:row[0]})
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }    
}

export const assignMarks=async(req, res)=>{
    const conn= await db.getConnection();
    try{
        const subId=req.params.subId;
        const {students}=req.body;
        await conn.query(`SET TRANSACTION ISOLATION LEVEL READ COMMITTED`);
        await conn.beginTransaction();
        await conn.query(`select * from subjects where id=? for update`, subId);

        for(let s of students){
            await conn.query(`insert into marks (std_id, sub_id, marks) values (?, ?, ?) on duplicate key update marks=values(marks)`, [s.id, subId, s.marks]);
        }

        await conn.commit();

        res.json({message:"success"});
    }
    catch(err){
        await conn.rollback();
        console.log("rollback", err);
    }
    finally{
        conn.release();
    }
}

export const viewMarks=async(req, res)=>{
    try{
        const deptId=req.params.deptId;
        const rows= await db.query(`select s.id, s.name, s.roll_number, sub.id, sub.sub_name, m.marks from student s join subjects sub
            on s.dept_id=sub.dept_id
            left join marks m on m.std_id=s.id and m.sub_id=sub.id where s.dept_id=? `, deptId);
        if(!rows){
            return res.status(400).json({message:"failed to fetch marks"});
        }
        res.status(200).json({message:"sucess", data:rows[0]});
    }
    catch(err){
        res.status(500).json({"message":err.message});
    } 
}

export const workStatus=async(req, res)=>{
    try{
        const {date, department, is_working, reason}=req.body;
        if(!date || !department || !reason){
             return res.status(400).json({message:"invalid input"})
        }
        const row= await db.query(`insert into calendar (today, dept_id, is_working, reason) values (?, ?, ?, ?)`, [date, department, is_working, reason]);
        if(!row){
            return res.status(400).json({message:"failed to update work status"});
        }
        res.status(201).json({message:"work status updated"});z 
    }
    catch(err){
        res.status(500).json({"message":err.message});
    } 
}

export const checkcalendar=async(req, res)=>{
    try{
        const deptId=req.params.deptId;
        const date=req.params.date;
        const row=await db.query(`select count(*) as count from calendar where dept_id=? and today=?`, [deptId, date]);
        if(!row){
            return res.status(400).json({message:"failed to fetch count"});
        }
        res.status(200).json({message:"success", data:row[0][0].count});

    }
    catch(err){
        res.status(500).json({"message":err.message});
    } 
}

export const markAttendance=async(req, res)=>{
    const conn=await db.getConnection();
    try{
        const {deptId, date, students, is_working, reason}=req.body;
        if(!deptId || !date || !students || !is_working){
            return res.status(400).json({message:"invalid input"})
        }
        await conn.beginTransaction();

        await conn.query(`insert into calendar (today, dept_id, is_working, reason) values (?, ?, ?, ?)`, [date, deptId, is_working, reason]);

        for(let s of students){
            await conn.query(`insert into attendance (std_id, today, dept_id) values (?, ?, ?)`, [s, date, deptId]);
        }

        await conn.commit();
        res.status(201).json({message:"success"});

    }
    catch(err){
        console.log(err); 
        await conn.rollback();
        res.status(500).json({"message":err.message});
    } 
    finally{
         conn.release();
    }
}

export const getAttendance=async(req, res)=>{
    try{
        const deptId=req.params.deptId;
        const row= await db.query(`select s.roll_number, s.name, count(a.std_id) as present, (select count(*) from calendar where dept_id=? and is_working=1) as total from attendance a 
                                    right join student as s  on s.id=a.std_id where s.dept_id=? group by s.id;`, [deptId, deptId]);
        if(!row){
            return res.status(400).json({message:"failed to fetch attendance"});
        }
        res.status(200).json({message:"sucess", data:row[0]})
    }
    catch(err){
        res.status(500).json({"message":err.message});
    }
}