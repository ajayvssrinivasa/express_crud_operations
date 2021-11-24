const express=require('express');//import express
const PORT=8899;//define port
const app=express();
//create object pf express
let myData=(req,res,next)=>{
    req.mytitle="neo soft";
    next();
}
app.use('/myimages',express.static('images'));
app.use(express.json());
app.use(myData);
app.use(express.urlencoded({extended:false}))
const frontRoutes=require('./routes/frontRoutes');
const adminRoutes=require('./routes/adminRoutes');
app.use("/",frontRoutes)
app.use("/admin",adminRoutes);


//define the routes

app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`Work on ${PORT}`);
})