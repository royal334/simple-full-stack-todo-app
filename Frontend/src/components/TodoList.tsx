import { Trash2 } from "lucide-react";
import useDeleteTodo from "../hooks/useDeleteTodo";
import useGetTodos from "../hooks/useGetTodos";
import type { TodoType } from "../App";

type TodoListProps = {
  todos: TodoType[];
  removeTodo: (id:string) => void
};
function TodoList({todos, removeTodo}:TodoListProps) {

     const { mutate } = useDeleteTodo()

     const handleDeleteTodo = (id:any) =>{
          if(id) {
               mutate(id)
               removeTodo(id)
          }
     }

  return (
          <>
               { todos.length > 0 ? (
                    <div className="container mx-auto translate-y-32  bg-white rounded">
                              <ul>
                              {todos.map((todo, index) => {
                                   const desc = todo.description || ""
                                   const capitalized = desc.charAt(0).toUpperCase() + desc.slice(1)
                                   return (
                                   <div key={index} className="flex justify-between items-center border-b last:border-b-0 p-4">
                                        <li className=" font-semibold text-lg text-navy-850">{capitalized}</li>
                                        <button onClick={() => handleDeleteTodo(todo._id)} className="cursor-pointer"><Trash2 color="#ff0000" /></button>
                                   </div>
                              )
                                   })}
                              </ul>
                         </div>): null}
          </>
  )
}

export default TodoList