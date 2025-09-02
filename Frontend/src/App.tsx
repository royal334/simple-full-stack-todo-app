import { useState } from "react"
import Search from "./components/Search"
import TodoList from "./components/TodoList"

function App() {

    const [todos, setTodos] = useState<string[]>([]);

  const addTodo = (todo: string) => {
    if (todo.trim()) setTodos(prev => [...prev, todo]);
  };

  return (
    <>
    <Search addTodo={addTodo} />
    <TodoList todos ={todos}/>

    </>
  )
}

export default App
