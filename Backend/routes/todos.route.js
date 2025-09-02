import { Router } from 'express'
import { createTodo, deleteTodo, deleteTodos, getTodos } from '../controllers/todo.controller.js'

const todoRouter = Router()

todoRouter.post('/todos', createTodo)
todoRouter.get('/todos', getTodos)
todoRouter.delete('/todos', deleteTodos)
todoRouter.delete('/todos/:id', deleteTodo)


export default todoRouter
