import { Todo } from '../models/todo.model.js'

export const createTodo = async (req, res, next) => {
    try{
          const { description } = req.body
          const userId = req.user._id

          const todoItem = await Todo.create({description, userId })

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
          const userId = req.user._id
          const todoItem = await Todo.find({userId})

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
          const userId = req.user._id
          const todoItem = await Todo.findOneAndDelete({_id: req.params.id, userId})
          
          if(!todoItem){
               return res.status(404).json({success:false, message:"Todo not found or not owned by user"})
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
          const userId = req.user._id
               await Todo.deleteMany({userId})

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