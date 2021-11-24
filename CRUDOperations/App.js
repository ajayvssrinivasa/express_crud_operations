const { json } = require('express');
const express = require('express');
const fs = require('fs');
const methodOverride = require('method-override');
const PORT = 8899;
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

app.get("/addEmployee",(req,res)=>{
    res.sendFile('addEmployee.html',{root:'.'});
})
app.get("/",(req,res)=>{
    res.writeHead(200,{"Content-type":"text/html"});
    let Data = fs.readFileSync('Home.html');
    let employees = getEmpdata();
    employees.Employee.map(dt=>
        Data += `<tr>
        <td>${dt.eid}</td>
        <td>${dt.ename}</td>
        <td>${dt.age}</td>
        <td>${dt.city}</td>
        <td>${dt.salary}</td>
        <td><form method="post" action="/${dt.eid}?_method=DELETE"><button type="submit" class="btn btn-danger m-3">Delete</button></form>
        <form method="get" action="/${dt.eid}"><button type="submit" class="btn btn-info m-3">Update</button></form></td>
        </tr>
        `);
    Data += `</tbody>
    </table>
    <button type="submit" class="btn btn-success m-3"><a href="http://localhost:8899/addEmployee" class="text-decoration-none text-white">Add Employee</a></button>
    </div>
    </body>
    </html>`;
    res.write(Data);
})

app.post('/add', (req, res) => {
    const employees = getEmpdata()    
    const Empdata = req.body
    employees.Employee.push(Empdata)
    saveEmpdata(employees);
    res.redirect('/');
})

app.delete('/:eid',(req,res)=>{
    const { eid } = req.params;
    const employees = getEmpdata();
    const index = employees.Employee.findIndex(pt => pt.eid == eid);
    employees.Employee.splice(index, 1);
    saveEmpdata(employees);
    res.redirect('/');
})

app.get('/:eid', (req,res)=>{
    const { eid } = req.params;
    const employees = getEmpdata();
    const index = employees.Employee.findIndex(pt => pt.eid == eid);
    const upd_data = employees.Employee[index];
   let data = `<!DOCTYPE html>
   <html lang="en">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
      
       <title>Add Employee</title>
   </head>
   <body>
       <h2 class="  p-2 m-4 text-center">Update Employee</h2>
       <div class="container">
           <form method="post" action="/${eid}?_method=PUT">
               <div class="form-group row">
                 <label for="eid" class="col-sm-2 col-form-label">Employee ID</label>
                 <div class="col-sm-10">
                   <input type="text" class="form-control" name="eid" value=${upd_data.eid}>
                 </div>
               </div>
               <div class="form-group row">
                 <label for="ename" class="col-sm-2 col-form-label">Employee Name</label>
                 <div class="col-sm-10">
                   <input type="text" class="form-control" name="ename" value=${upd_data.ename}>
                 </div>
               </div>
               <div class="form-group row">
                   <label for="age" class="col-sm-2 col-form-label">Age</label>
                   <div class="col-sm-10">
                     <input type="number" class="form-control" name="age" value=${upd_data.age}>
                   </div>
                 </div>
                 <div class="form-group row">
                   <label for="city" class="col-sm-2 col-form-label">City</label>
                   <div class="col-sm-10">
                     <input type="text" class="form-control" name="city" value=${upd_data.city}>
                   </div>
                 </div>
                 <div class="form-group row">
                   <label for="salary" class="col-sm-2 col-form-label">Salary</label>
                   <div class="col-sm-10">
                     <input type="number" class="form-control" name="salary" value=${upd_data.salary}>
                   </div>
                 </div>
                 <button type="submit" class="btn btn-success">Update</button>
             </form>
           </div>
       <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
       <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
       <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
   </body>
   </html>`;
   res.write(data);
})

app.put("/:eid",(req, res)=>{
    const { eid } = req.params;
    const employees = getEmpdata();
    const index = employees.Employee.findIndex(pt => pt.eid == eid);   
    employees.Employee.splice(index, 1);
    const Empdata = req.body
    employees.Employee.push(Empdata)
    saveEmpdata(employees);
    res.redirect('/');
})

app.listen(PORT, (err)=>{
    if(err) throw err;
    console.log(`work on port ${PORT}`);
})





const saveEmpdata = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('Employee.json', stringifyData)
}

const getEmpdata = () => {
    const jsonData = fs.readFileSync('Employee.json')
    return JSON.parse(jsonData)    
}