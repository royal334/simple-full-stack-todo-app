import { useState } from "react";
import { Trash2 } from "lucide-react";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useUpdateTodo from "@/hooks/useUpdateTodo";
import type { TodoType } from "../App";
import DeleteTodo from "./DeleteTodo";
import { Input } from "./ui/input";
import { Label } from "./ui/label"
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { apiFetch } from "@/lib/apiFetch";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter, 
  DialogClose
} from "@/components/ui/dialog"


type TodoListProps = {
  todos: TodoType[];
  removeAllTodos: () => void
};
function TodoList({todos, removeAllTodos}:TodoListProps) {

     const { mutate: deleteTodo } = useDeleteTodo()
     const { mutate: updateTodo } = useUpdateTodo()
     const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
     const [isDialogOpen, setIsDialogOpen] = useState(false) 


     const {register, reset, handleSubmit, setValue, formState:{errors}} = useForm({
          defaultValues:{
               todo:''
          }
     })

     const handleOpenEdit = async (todo:TodoType) => {
     try {
          const freshTodo = await apiFetch('get', `/api/todos/${todo._id}`)
          setEditingTodoId(freshTodo.todoItem._id)
          setValue('todo', freshTodo.todoItem.description || '')
          setIsDialogOpen(true)
     } 
     catch (error) {
          console.error('Failed to fetch todo:', error)
          // Fallback to existing data
          setValue('todo', todo.description || '')
          setIsDialogOpen(true)
     }
          
     }

     const handleEditChange = async (data:{todo:string}) => {
          try{

               if(editingTodoId && data.todo.trim()){
                    updateTodo({
                         id:editingTodoId,
                         todo:data.todo
                    })
               }
               reset()
               setEditingTodoId(null)
               setIsDialogOpen(false)
          }
          catch(err){
               console.log('did not submit', err)
          }

     }

     const handleDeleteTodo = (id:any) =>{
          try{
                    if(id) {
                    deleteTodo(id)
               }
          }
          catch(err){
               console.log('an error happened', err)
          }
     }



     return (
          <>
               { todos.length > 0 ? (
                    <>
                         <div className="container mx-auto translate-y-12 dark:bg-navy-900 bg-white rounded">
                                   <ul>
                                   {todos.map((todo) => {
                                        const desc = todo.description || ""
                                        const capitalized = desc.charAt(0).toUpperCase() + desc.slice(1)
                                        return (
                                        <div key={todo._id} className="flex justify-between items-center border-b p-4">
                                             <li className=" font-semibold text-lg text-navy-850 dark:text-purple-100">{capitalized}</li>
                                             <div className="flex gap-8 items-center">
                                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                        <DialogTrigger className="cursor-pointer hover:underline font-semibold " onClick={() => handleOpenEdit(todo)}>Edit</DialogTrigger>
                                                  <DialogContent>
                                                       <form onSubmit={handleSubmit(handleEditChange)}>
                                                       <DialogHeader>
                                                            <DialogTitle>Edit Todo Item</DialogTitle>
                                                            <DialogDescription>Make changes here. Click save when you&apos;re done.</DialogDescription>
                                                       </DialogHeader>
                                   
                                                       <Label htmlFor="todo" className="my-2">Description</Label>
                                                       <Input
                                                            id="todo"
                                                            placeholder="Change todo item"
                                                            className="my-2"
                                                            {...register('todo', {required:"Cannot leave empty"})}
                                                       />
                                                       {errors.todo && <p>{errors.todo.message}</p>}
                                                       <DialogFooter>
                                                            <DialogClose asChild>
                                                            <Button variant="outline" className="cursor-pointer" onClick={() => {reset()}}>Cancel</Button>
                                                            </DialogClose>
                                                            <Button type="submit" className="cursor-pointer">Save changes</Button>
                                                       </DialogFooter>
                                                  </form>
                                        </DialogContent>
                                   
                                   
                                   </Dialog>
                                                  <button onClick={() => handleDeleteTodo(todo._id)} className="cursor-pointer"><Trash2 color="#ff0000" /></button>
                                             </div>
                                        </div>
                                   )
                                        })}
                                   </ul>
                                   <DeleteTodo removeAllTodos={removeAllTodos} />
                                   {/* <p className="text-red-500 translate-y-32 text-2xl">{error}</p> */}
                         </div>
                    </>): null}
          </>
  )
}

export default TodoList