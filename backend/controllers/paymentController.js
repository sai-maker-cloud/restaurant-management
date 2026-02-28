import pool from "../config/db.js";

export const fakepayment=async(req,res)=>{
    const{order_id}=req.body;

    const result=await pool.query("update orders set payment_status='paid' where id=$1 returning *",[order_id]);

    if(result.rows.length==0){
        return res.send(400).json({message:"order is not found"});
    }
    res.json({message:"payment succesful"})

    
}