import { Router } from 'express'
import { createTodo, deleteTodo, deleteTodos, getTodos,getTodo, updateTodo } from '../controllers/todo.controller.js'
import { jwtMiddleware } from '../middlewares/jwt.middleware.js'

const todoRouter = Router()

todoRouter.post('/todos', jwtMiddleware, createTodo)
todoRouter.get('/todos', jwtMiddleware, getTodos)
todoRouter.get('/todos/:id', jwtMiddleware, getTodo)
todoRouter.put('/todos/:id', jwtMiddleware, updateTodo )
todoRouter.delete('/todos', jwtMiddleware, deleteTodos)
todoRouter.delete('/todos/:id', jwtMiddleware, deleteTodo)


export default todoRouter
