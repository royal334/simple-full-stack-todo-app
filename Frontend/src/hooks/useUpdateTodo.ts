import { apiFetch } from "../lib/apiFetch";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type UpdateTodoTypes ={
     id:string
     todo:string
}

function useUpdateTodo() {
     const queryClient = useQueryClient()
     return useMutation({
          mutationFn: async ({id, todo}: UpdateTodoTypes) => {
               const response = await apiFetch('put', `/api/todos/${id}`, { description:todo })
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

export default useUpdateTodo