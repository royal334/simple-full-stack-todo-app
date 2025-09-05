import { apiFetch } from "../lib/apiFetch";
import { useMutation } from "@tanstack/react-query";



function useDeleteTodos() {
  return useMutation ({
     mutationFn: async() => {
          const response = await apiFetch('delete', `/api/todos`)
          return response
     },
     onError:() => {
          console.error('Failed to delete todos')
     }

     }
  )
}

export default useDeleteTodos