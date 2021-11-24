const express=require('express');
const router=express.Router();
const requireJson=()=>{
    return (req,res,next)=>{
        if(req.headers['content-type'] === 'application/json'){
            next();
        }
        else{
            res.status(201).send('Application/json format supported');
        }
    }
}
router.get("/",(req,res)=>{
    res.send("Admin front");
})
router.get("/dashboard",(req,res)=>{
    res.send("Admin dashbord");
})
router.post("/register",requireJson(),(req,res)=>{
    res.send("working");
})
module.exports=router;