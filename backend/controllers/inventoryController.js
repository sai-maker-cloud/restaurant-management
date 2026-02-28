import pool from "../config/db.js";

export const addInventory=async(req,res)=>{
    try{
    const{item_name,quantity,unit}=req.body;

    const result=await pool.query("insert into inventory(item_name,quantity,unit) values($1,$2,$3) returning *",[item_name,quantity,unit]);

    res.status(200).json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
export const getInventory=async(req,res)=>{
    try{
        const result=await pool.query("select * from inventory");
        res.status(200).json(result.rows);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}

export const updateInventory=async(req,res)=>{
    try{
        const{id}=req.params;
        const{quantity}=req.body;
        const result=await pool.query("update inventory set quantity=$1 where id=$2 returning *",[quantity,id]);

        if(result.rows.length==0){
            return res.status(400).json({message:"Inventory item not found"});
        }
        res.status(200).json(result.rows[0]);
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
}
