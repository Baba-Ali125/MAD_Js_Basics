import mongoose from 'mongoose';

const {Schema, model} = mongoose;

//Destructuring
//Use schema to strucure the data in the DB
const todoSchema = Schema({
    todoTitle:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
});


const todoModel = model('mad-todos',todoSchema);

export default todoModel;