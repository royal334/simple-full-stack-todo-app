import { Schema, model } from "mongoose";

const todoSchema = Schema({
     description:{
          type: String,
          required:true,
          minLength:5,
     },
     completed: Boolean
     // userId:{
     //      type: Schema.Types.ObjectId,
     //      ref:'User', 
     //      required:true,
     //      index:true,
     // }
}, {timestamps:true})

export const Todo = model('todo', todoSchema)