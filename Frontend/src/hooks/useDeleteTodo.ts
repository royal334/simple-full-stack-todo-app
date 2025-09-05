import { apiFetch } from "../lib/apiFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function useDeleteTodo() {
     const queryClient = useQueryClient()
     return useMutation({
          mutationFn: async (id) => {
               const response = await apiFetch('delete', `/api/todos/${id}`)
               return response
          },
          onSuccess: () =>{
               queryClient.invalidateQueries({ queryKey: ['todos'] });
          },
          onError:()=> {
               console.error('Failed to delete todo')
          }
          
     })
     
}

export default useDeleteTodo