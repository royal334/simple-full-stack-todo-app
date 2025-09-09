import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from '../models/user.model.js'
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/env.js'


export const signUp = async (req, res, next) => {

     const session = await mongoose.startSession()
     session.startTransaction()

     try{
          const { name, email, password } = req.body

          const exisitingUser = await User.findOne({email})

          if(exisitingUser){
               const error = new Error('User already exist with this email')
               error.status = 409
               throw error
          }

          //Hash password
          const salt = await bcrypt.genSalt(10)
          const hashPassword = await bcrypt.hash(password, salt)

          const newUser = await User.create([{name, email, password:hashPassword}], {session})

          const token = jwt.sign({ userId: newUser[0]._id}, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})
          
          await session.commitTransaction()
          session.endSession()
          res.status(201).json({
               success: true,
               message: 'User created successfully',
               data:{
                    token,
                    user: newUser[0]
               }
          })

     }

     catch(err){
          session.abortTransaction()
          session.endSession()
          next(err)
          console.log('an error occured', err)
     }

}

export const signIn = async (req, res, next) => {
     try{
          const { email, password } = req.body

          const user = await User.findOne({email})

          if(!user){
               const error = new Error('Invalid credentials')
               error.status = 404
               throw error
          }

          const isPasswordValid = await bcrypt.compare(password, user.password)

          if(!isPasswordValid){
               const error = new Error('Invalid password')
               error.statusCode = 401
               throw error
          }

          const token = jwt.sign({userId: user._id}, JWT_SECRET,{expiresIn: JWT_EXPIRES_IN})

          res.status(200).json({
               success: true,
               message: 'User signed in successfully',
               data:{
                    token,
                    user,
               }
          })

     }
     catch(err){
          
          next(err)
     }
     
}

export const signOut = () => {
     
}