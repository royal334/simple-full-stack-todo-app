import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../lib/apiFetch";

type SignupForm = {
  name: string;
  email: string;
  password: string;
};

type SignupProps = {
  onSignup: (token: string, user: any) => void;
  onSwitchToLogin: () => void;
};

function Signup({ onSignup, onSwitchToLogin }: SignupProps) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<SignupForm>();

  const onSubmit = async (data: SignupForm) => {
    try {
      const response = await apiFetch("post", "/api/auth/sign-up", data);
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        onSignup(response.data.token, response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="container mx-auto translate-y-20 bg-white rounded p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded"
            {...register("name", { required: "Name is required" })}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            {...register("email", { 
               required: "Email is required", 
               pattern:{
                    value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format'
            }})}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-center">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="text-blue-500 underline">
          Login
        </button>
      </p>
    </div>
  );
}

export default Signup;