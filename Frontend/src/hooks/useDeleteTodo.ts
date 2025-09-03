import { apiFetch } from "../lib/apiFetch";
import { useMutation } from "@tanstack/react-query";

function useDeleteTodo() {
     return useMutation({
          mutationFn: async (id) => {
               const response = await apiFetch('delete', `/api/todos/${id}`)
               return response
          },
          onError:()=> {
               console.error('Failed to delete todo')
          }
          
     })
     
}

export default useDeleteTodo