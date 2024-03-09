"use client";

import clsx from "clsx";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  console.log(errors);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { name, email, password } = data;
    console.log({ name, email, password });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="nombre">Nombre completo</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded ", {
          "border-red-500": errors.name,
        })}
        type="text"
        autoFocus
        {...register("name", { required: true })}
      />
      <div className="text-sm text-red-500 mb-2">
        {errors.name && "El nombre es requerido"} &nbsp;
      </div>

      <label htmlFor="email">Correo electrónico</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.email,
        })}
        type="email"
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
      />
      <div className="text-sm text-red-500 mb-2">
        {errors.email?.type === "required" &&
          "El correo electronico es requerido"}
        {errors.email?.type === "pattern" &&
          "El correo electronico no es valido"}
        &nbsp;
      </div>

      <label htmlFor="email">Contraseña</label>
      <input
        className={clsx("px-5 py-2 border bg-gray-200 rounded", {
          "border-red-500": errors.password,
        })}
        type="password"
        {...register("password", { required: true, minLength: 6 })}
      />
      <div className="text-sm text-red-500 mb-5">
        {errors.password?.type === "required" && "La contraseña es requerida"}
        {errors.password?.type === "minLength" &&
          "La contraseña debe tener al menos 6 caracteres"}
        &nbsp;
      </div>

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  );
};
