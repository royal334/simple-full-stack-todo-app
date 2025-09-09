import { useState, useEffect } from "react"
import useGetTodos from "./hooks/useGetTodos";
import Search from "./components/Search"
import TodoList from "./components/TodoList"
import Login from "./components/Login"
import Signup from "./components/Signup"
import { useAuth } from "./AuthContext"

export type TodoType = {
  _id?: string;
  description:string
}

function App() {
  const { isAuthenticated, login, logout } = useAuth()
  const { data } = useGetTodos()
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    if (data && data.todoItem) {
      setTodos(data.todoItem);
    }
  }, [data]);

  const removeAllTodos = () => {
    setTodos([])
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        {showSignup ? (
          <Signup
            onSignup={login}
            onSwitchToLogin={() => setShowSignup(false)}
          />
        ) : (
          <Login
            onLogin={login}
            onSwitchToSignup={() => setShowSignup(true)}
          />
        )}
      </div>
    );
  }

  return (
    <>
      <button
        onClick={logout}
        className="absolute cursor-pointer top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    <Search todos={todos} setTodos={setTodos}/>
      <TodoList todos={todos} removeAllTodos={removeAllTodos}/>
    </>
  )
}

export default App
