import { useForm } from "react-hook-form"
import useCreateTodo from "../hooks/useCreateTodo";

type FormPropTypes = {
  todo:string
}

type SearchProps = {
  addTodo: (todo: string) => void;
};

function Search({addTodo}:SearchProps) {

  const { mutate } = useCreateTodo()

  const { register,formState, handleSubmit, reset  } = useForm<FormPropTypes>({
    defaultValues:{
      todo:''
    }
  })

  const { errors } = formState

  const onSubmit = (data:FormPropTypes) => {
      mutate(data.todo)
      addTodo(data.todo)
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