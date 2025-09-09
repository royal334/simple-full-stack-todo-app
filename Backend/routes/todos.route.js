import { Router } from 'express'
import { createTodo, deleteTodo, deleteTodos, getTodos } from '../controllers/todo.controller.js'
import { jwtMiddleware } from '../middlewares/jwt.middleware.js'

const todoRouter = Router()

todoRouter.post('/todos', jwtMiddleware, createTodo)
todoRouter.get('/todos', jwtMiddleware, getTodos)
todoRouter.delete('/todos', jwtMiddleware, deleteTodos)
todoRouter.delete('/todos/:id', jwtMiddleware, deleteTodo)


export default todoRouter
