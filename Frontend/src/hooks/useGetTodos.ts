import { apiFetch } from "../lib/apiFetch";
import { useQuery} from "@tanstack/react-query";



 function useGetTodos() {
  return useQuery({
          queryKey:['todos'],
          queryFn: async () => {
               const response = await apiFetch('get', "/api/todos")
               return response
          },
     }
)
}

export default useGetTodos