//const express = require('express');
import express from 'express';
import todoModel from './Schema/schema.js';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const db = process.env.DB_URL;

mongoose.connect(db, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(() => console.log('connected to DB'))
.catch(err => console.log(err));

// app.get('/home', (req, res) => {
//     res.send('Yoo man, whats up!');
// })

// app.post('/todo', (req, res) => {
//     res.send('Use this route to create a new Todo');
// })

// app.patch('/todo', (req, res) => {
//     res.send('Use patch to update some data in the database');
// })

// app.put('/todo', (req, res) => {
//     res.send('Use put to update entire data in the database');
// })

// app.delete('/todo', (req, res) => {
//     res.send('Use delete to remove data in the database');
// })

app.get('/', (req, res)=>{
res.json({
    message: 'Welcome to M.A.D todo backend API'
})
})

//Get all todos
app.get('/todos',async (req, res)=>{
const allTodos = await todoModel.find({});
if(allTodos){
    return res.status(200).json({
        message: 'Todos fetched succefully',
        data: allTodos
    });
}else{
    return res.status(500).json({
        message: 'Ooops! unable to fetch todos'
    });
}
})

app.get('/todo/:category',async (req, res)=>{
    const {category} = req.params;
    const allCategoryTodos = await todoModel.find({})
    .where("category").equals(category);
    if(allCategoryTodos){
        return res.status(200).json({
            message: `${category} todos fetched successfully`,
            data: allCategoryTodos
        });
    }else{
        return res.status(500).json({
            message: `Ooops! unable to fetch ${category} todos`
        });
    }
})

app.post('/todo', async (req, res)=> {
    const {todoTitle, category} = req.body;
    const newTodo = await todoModel.create(
        {
            todoTitle,
            category
        });
        if(newTodo){
            return res.status(200).json({
                message: 'Todo created successfully',
            })
        }else{
            return res.status(500).json({
                message: 'Error creating todo'
            })
        }
})

app.delete('/todo/:id', async (req, res)=> {
    const {id} = req.params;
    const deletedTodo = await todoModel.findByIdAndDelete(id);
    if(deletedTodo){
        return res.status(200).json({
            message: 'Todo deleted succcessfully' 
        })
    }else{
        return res.status(500).json({
            message: 'Error deleting todo'
        })
    }
})

app.listen((PORT), () => {
    console.log(`Your app is listening on port ${PORT}`);
});