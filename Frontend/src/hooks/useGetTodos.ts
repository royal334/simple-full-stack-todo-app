import { apiFetch } from "../lib/apiFetch";
import { useQuery} from "@tanstack/react-query";



 function useGetTodos() {
     const token = localStorage.getItem('token');
  return useQuery({
          queryKey:['todos', token],
          queryFn: async () => {
               const response = await apiFetch('get', "/api/todos")
               return response
          },
          enabled:!!token
     }
)
}

export default useGetTodos