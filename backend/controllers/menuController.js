import pool from "../config/db.js"
export const addmenu=async(req,res)=>{
    const{name,price,category,image}=req.body;
    const imageUrl=image&&String(image).trim()?String(image).trim():null;
    const result=await pool.query(
        "insert into menu_items (name,price,category,image) values($1,$2,$3,$4) returning *",
        [name,price,category,imageUrl]
    );
    res.json(result.rows[0]);
}
export const getmenu=async(req,res)=>{
    const result=await pool.query("select * from menu_items")
    res.json(result.rows);
}

export const deletemenu=async(req,res)=>{
    const{id}=req.params;

    const result=await pool.query("delete from menu_items where id=$1 returning *",[id]);

    if(result.rows.length==0){
        return res.status(400).json({message:"Menu item not found"});
    }
    res.json({message:"menu item deleted successfully"});
}