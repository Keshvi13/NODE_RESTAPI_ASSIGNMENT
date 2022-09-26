const express = require('express');
const mongoose = require('mongoose');
const Faculty  =require('./model/Faculty');
const bodyParser = require('body-parser');
const cors = require('cors')

mongoose.connect('mongodb+srv://keshvi:keshvi1311@cluster0.jniexrx.mongodb.net/colleges?retryWrites=true&w=majority')
.then(()=>{
    const app= express();
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(cors());    

        //get all:
        app.get('/faculties', async (req,res)=>
        {
           const data = await Faculty.find();
           res.send(data);
        })
        

        //get by id:
        app.get('/faculty/:id', async (req,res)=>
        {
           const data = await Faculty.findOne({FacultyId:req.params.id});
           res.send(data);
        })
        

        //insert:
        app.post('/faculty',async(req,res)=>{
            const fac =new Faculty();
            fac.FacultyId=req.body.FacultyId;
            fac.FacultyName=req.body.FacultyName;
            fac.FacultyAge=req.body.FacultyAge;
            const data= await fac.save();
            res.send(data);
        })
        

        //update:
        app.put('/faculty/:id',async(req,res)=>{
            const data = await Faculty.findOne({FacultyId:req.params.id});
            data.FacultyAge=req.body.FacultyAge;
            data.FacultyName=req.body.FacultyName;
            await data.save();
            res.send(data);
        })

        //delete:
        app.delete('/faculty/:id', async (req,res)=>
        {
           const data = await Faculty.deleteOne({FacultyId:req.params.id});
           res.send(data);
        })
                                         
    app.listen(3003,(req,res)=>{console.log("server start @localhost:3003")})                                     
    
})


//colleges