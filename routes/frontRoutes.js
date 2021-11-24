const express=require('express');
const router=express.Router();
router.get('/',(req,res)=>{
    res.sendFile('form.html',{root:'.'});
    // res.send("Default")//we have put, post, delete
    // res.send('<html> <body><h1>home</h1></body></html>')
})
router.post("/submit-data",(req,res)=>{
    res.send(`name:${req.body.fname} and age is ${req.body.age}`);
})
    
router.get('/category/:cname([a-z]+)/:scat([a-z]+)?',(req,res)=>{
    //read param value
    let cn=req.params.cname;
    let sc=req.params.scat;
    if(sc!=undefined){
    res.send(`the category is ${cn} and  ${sc}`)
    }
    else{
        res.send(`the category is ${cn} and ${req.mytitle}`);
    }
})
module.exports=router;