import jwt from "jsonwebtoken";

export const authMiddleware=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1];

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try{
        const decode=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode;
        next();
    }
    catch(err){
         return res.status(401).json({message:"unauthorised"});
    }
}
export const adminMiddelware=(roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.roll)){
           return  res.status(403).json({message:"forbidden"});
        }
        next();
    }
}
export const adminMiddleware = adminMiddelware;