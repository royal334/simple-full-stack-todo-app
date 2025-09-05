import { useMutation,useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "../lib/apiFetch";


function useCreateTodo() {
     const queryClient = useQueryClient()
     return useMutation({
          mutationFn: async (todo:string) => {
               const response = await apiFetch('post', '/api/todos', {description: todo})
               return response
          },
          onSuccess: () => {
               console.log('Todo created')
               queryClient.invalidateQueries({ queryKey: ['todos'] });
          },
          onError:() => {
               console.error('Failed to create Todo')
          }
     })
}

export default useCreateTodo

