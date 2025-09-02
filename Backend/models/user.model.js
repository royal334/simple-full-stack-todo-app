import { Schema, model } from "mongoose";

const userSchema = new Schema({
     name:{
          type:String,
          required:true,
          minLength:3,
          maxLength:100,
          trim: true
     },
     email:{
          type:String,
          trim:true,
          required:true,
          minLength:5,
          maxLength:100,
          unique:true,
          lowercase:true,
          match: [/\S+@\S+\.\S+/, 'Please provide a valid email address']
     },
     password:{
          type:String,
          required:true,
          minLength:6,
          maxLength:100
     }
}, {timestamps:true})

const User = model('User', userSchema)

export default User; 