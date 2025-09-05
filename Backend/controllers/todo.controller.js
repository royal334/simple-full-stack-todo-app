import { Todo } from '../models/todo.model.js'

export const createTodo = async (req, res, next) => {
    try{
          const { description } = req.body

          const todoItem = await Todo.create({description })

          res.status(200).json({
               success:'added successfully',
               data:{
                    todoItem
               }
          })
     }
     catch(err){
          console.log('this is the error', err)
          next(err)
     }
}

export const getTodos = async (req, res, next) => {
     try{
          const todoItem = await Todo.find()

          res.status(200).json({
               success:'all todos gotten',
               todoItem
          })

     }
     catch(err){
          console.log('this is an error', err)
          next(err)
     }
}

export const deleteTodo = async (req, res, next) => {
     try{
          const todoItem = await Todo.findByIdAndDelete(req.params.id)
          
          if(!todoItem){
               return res.status(404).json({success:false, message:"Todo not found"})
          }

           res.status(200).json({
               success: true,
               message: 'Todo deleted successfully' 
          });
     }
     catch(err){
          console.log('this is an error', err)
          next(err)
     }
}

export const deleteTodos = async (req, res, next) => {
     try{
               await Todo.deleteMany({})

           res.status(200).json({
               success: true,
               message: 'All todos deleted successfully' 
          });
     }
     catch(err){
          console.log('this is an error', err)
          next(err)
     }
}