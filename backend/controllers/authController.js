import pool from "../config/db.js";
import bcrypt from "bcrypt";
import js from "jsonwebtoken";


export const register=async(req,res)=>{
    try {
        const{name,email,password,roll}=req.body;
        if(!name||!email||!password){
            return res.status(400).json({message:"Name, email and password are required"});
        }
        const hashPassword=await bcrypt.hash(password,10);
        const result=await pool.query("insert into users (name,email,password,roll) values($1,$2,$3,$4) returning *",[name,email,hashPassword,roll||"staff"]);
        res.json(result.rows[0]);
    } catch(err) {
        console.error("Register error:", err.message);
        if(err.code==="23505") return res.status(400).json({message:"Email already registered"});
        if(err.code==="42P01") return res.status(500).json({message:"Database table 'users' not found. Create the table first."});
        if(err.message && err.message.includes("password authentication failed")) {
            return res.status(500).json({
                message: "Database password wrong. In pgAdmin run: ALTER USER postgres WITH PASSWORD 'root'; Then in backend/.env set DB_PASSWORD=root and restart backend."
            });
        }
        res.status(500).json({message: err.message || "Registration failed"});
    }
};

export const login=async(req,res)=>{
    try {
        const{email,password}=req.body;
        if(!email||!password) return res.status(400).json({message:"Email and password required"});
        const result=await pool.query("select * from users where email=$1",[email]);
        if(result.rows.length==0) return res.status(400).json({message:"User not found"});
        const user=result.rows[0];
        const valid=await bcrypt.compare(password,user.password);
        if(!valid) return res.status(400).json({message:"Invalid credentials"});
        if(!process.env.JWT_SECRET) return res.status(500).json({message:"Server config error: JWT_SECRET missing"});
        const token=js.sign({ id:user.id, roll:user.roll }, process.env.JWT_SECRET, { expiresIn:"1d" });
        res.json({token});
    } catch(err) {
        console.error("Login error:", err.message);
        if(err.code==="42P01") return res.status(500).json({message:"Database table 'users' not found. Create the table first."});
        res.status(500).json({message: err.message || "Login failed"});
    }
}