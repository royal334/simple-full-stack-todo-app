import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form"
import useCreateTodo from "../hooks/useCreateTodo";
import type { TodoType } from "../App";

type FormPropTypes = {
  todo:string
}

type TodoTypeProps = {
  todos?:TodoType[]
  setTodos:Dispatch<SetStateAction<TodoType[]>>
}

function Search({setTodos}:TodoTypeProps) {

  const { mutate } = useCreateTodo()

  const { register,formState, handleSubmit, reset  } = useForm<FormPropTypes>({
    defaultValues:{
      todo:''
    }
  })

  const { errors } = formState

  const onSubmit = (data:FormPropTypes) => {
    setTodos((prev:TodoType[]) => [...prev,{ description: data.todo }])
      mutate(data.todo)
      reset()
  }

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto translate-y-20 h-16 flex justify-center">
          <input type="text"
            placeholder="Create a new todo..."
            className="rounded text-gray-600 font-semibold px-4 bg-white w-3/4  md:w-full h-full"
            {...register('todo')}
          />
          {errors && <span className="text-red-500 text-sm">{errors.todo?.message}</span>}
        </div>
      </form>
    </section>
  )
}

export default Search