import pool from "../config/db.js";

export const placeOrder=async(req,res)=>{
    try {
        const{items}=req.body;
        if(!items||!Array.isArray(items)||items.length===0){
            return res.status(400).json({message:"Items array is required"});
        }
        const userId=req.user?.id ?? req.user?.user_id;
        if(!userId){
            console.error("Place order: no user id in token", req.user);
            return res.status(401).json({message:"User not found. Please log in again."});
        }
        let total=0;
        const result=await pool.query("insert into orders (user_id,total) values($1,$2) returning *",[userId,0]);
        const orderId=result.rows[0].id;
        for(const item of items){
            const menuId=item.menu_id;
            const qty=Number(item.quantity)||0;
            if(!menuId||qty<1) continue;
            const menu=await pool.query("select * from menu_items where id=$1",[menuId]);
            if(menu.rows.length===0){
                return res.status(400).json({message:"Menu item not found: "+menuId});
            }
            const menuItem=menu.rows[0];
            const price=Number(menuItem.price)||0;
            total+=price*qty;
            await pool.query("insert into order_items (order_id,menu_id,quantity,price) values($1,$2,$3,$4)",[orderId,menuId,qty,price]);
        }
        await pool.query("update orders set total=$1 where id=$2",[total,orderId]);
        res.json({message:"Order placed successfully",order_id:orderId});
    } catch(err) {
        console.error("Place order error:",err.message);
        res.status(500).json({message:err.message||"Failed to place order"});
    }
}

export const generateBill=async(req,res)=>{
    const{id}=req.params;
    const result=await pool.query("select m.name,oi.quantity,oi.price,o.total from orders o join order_items oi on o.id=oi.order_id join menu_items m on oi.menu_id=m.id where o.id=$1",[id]);

    if(result.rows.length==0){
        return res.status(400).json({message:"Order not found"});
    }
    res.json(result.rows);
}

export const dailySales=async(req,res)=>{
    const result=await pool.query("select sum(total) as total_sales from orders where DATE(created_at)=CURRENT_DATE");
    const totalSales=result.rows[0]?.total_sales ?? 0;
    res.json({total_sales:totalSales});
};