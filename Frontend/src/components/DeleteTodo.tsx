import { Trash2 } from "lucide-react"
import useDeleteTodos from "../hooks/useDeleteTodos"

type DeleteTodoType = {
     removeAllTodos: () => void
}


function DeleteTodo({removeAllTodos}:DeleteTodoType) {

     const { mutate } = useDeleteTodos()


     const handelDeleteAllTodo = () => {
          try{
               mutate()
          }
          catch(err){
               console.log("couldn't delete all todos", err)
          }
          finally{
               removeAllTodos()
          }
     }

  return (
     <div className="p-4"> 
          <button onClick= {handelDeleteAllTodo} className="flex items-center md:items-start ml-auto cursor-pointer"><Trash2 size={18} color="#ff0000"/> <span className="text-[#ff0000]">Delete all todo items</span></button>
     </div>
  )
}

export default DeleteTodo