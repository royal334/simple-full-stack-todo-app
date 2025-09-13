import { Trash2 } from "lucide-react";
import useDeleteTodo from "../hooks/useDeleteTodo";
import type { TodoType } from "../App";
import DeleteTodo from "./DeleteTodo";

type TodoListProps = {
  todos: TodoType[];
  removeAllTodos: () => void
};
function TodoList({todos, removeAllTodos}:TodoListProps) {

     const { mutate } = useDeleteTodo()

     const handleDeleteTodo = (id:any) =>{
          try{
                    if(id) {
                    mutate(id)
               }
          }
          catch(err){
               console.log('an error happened', err)
          }
     }



  return (
          <>
               { todos.length > 0 ? (
                    <div className="container mx-auto translate-y-12 dark:bg-navy-900 bg-white rounded">
                              <ul>
                              {todos.map((todo, index) => {
                                   const desc = todo.description || ""
                                   const capitalized = desc.charAt(0).toUpperCase() + desc.slice(1)
                                   return (
                                   <div key={index} className="flex justify-between items-center border-b p-4">
                                        <li className=" font-semibold text-lg text-navy-850 dark:text-purple-100">{capitalized}</li>
                                        <button onClick={() => handleDeleteTodo(todo._id)} className="cursor-pointer"><Trash2 color="#ff0000" /></button>
                                   </div>
                              )
                                   })}
                              </ul>

                              <DeleteTodo removeAllTodos={removeAllTodos} />

                         </div>): null}
          </>
  )
}

export default TodoList