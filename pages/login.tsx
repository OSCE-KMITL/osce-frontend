import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInput, useLogin } from "../features/auth/hooks/useLogin";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const [login, { loading, error }] = useLogin();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    try {
      await login({ variables: { ...data } });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="w-full h-full bg-slate-50 flex justify-center align-middle ">
      <form
        className="flex w-2/6 h-2/3 flex-col bg-white rounded-2xl shadow-md  px-6 gap-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-bold text-3xl self-center">เข้าสู่ระบบ</h1>
        <label>email</label>
        <input
          className="px-4 py-2 border-2 rounded-md "
          type="email"
          id="email"
          {...register("email")}
          required={true}
        />
        <label>password</label>
        <input
          className="px-4 py-2 border-2 rounded-md "
          type="password"
          id="password"
          {...register("password")}
          required={true}
        />
        <button
          className="px-4 py-2 bg-black text-white rounded-md"
          type="submit"
          disabled={loading}
        >
          {!loading ? "Login with email" : "Loading ..."}
        </button>
      </form>
    </div>
  );
};
export default Login;
