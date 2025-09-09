import { useState } from "react";
import { useForm } from "react-hook-form";
import { apiFetch } from "../lib/apiFetch";

type LoginForm = {
  email: string;
  password: string;
};

type LoginProps = {
  onLogin: (token: string, user: any) => void;
  onSwitchToSignup: () => void;
};

function Login({ onLogin, onSwitchToSignup }: LoginProps) {
  const [error, setError] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiFetch("post", "/api/auth/sign-in", data);
      if (response.success) {
        localStorage.setItem("token", response.data.token);
        onLogin(response.data.token, response.data.user);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="container mx-auto translate-y-20 bg-white rounded p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            {...register("password", { required: "Password is required" })}
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <button onClick={onSwitchToSignup} className="text-blue-500 underline">
          Sign up
        </button>
      </p>
    </div>
  );
}

export default Login;