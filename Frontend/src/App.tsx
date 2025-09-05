import { useState, useEffect } from "react"
import useGetTodos from "./hooks/useGetTodos";
import Search from "./components/Search"
import TodoList from "./components/TodoList"

export type TodoType = {
  _id?: string;
  description:string
} 

function App() {

  const { data } = useGetTodos()

    const [todos, setTodos] = useState<TodoType[]>([]);

    useEffect(() => {
    if (data && data.todoItem) {
      // If todoItem is an array of objects with a 'description' field
      setTodos(data.todoItem);
    }
  }, [data]);

  const addTodo = (todo: string) => {
    if (todo.trim()) setTodos(prev => [...prev,{description: todo}]);
  };

  const removeTodo = (id:string) => {
    setTodos(prev => prev.filter(todo => todo._id !== id))
  }

  const removeAllTodos = () => {
    setTodos([])
  }

  return (
    <>
    <Search/>
    <TodoList todos ={todos} removeTodo={removeTodo} removeAllTodos={removeAllTodos}/>

    </>
  )
}

export default App
