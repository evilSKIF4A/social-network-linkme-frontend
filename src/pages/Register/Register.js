import React from "react";
import { Link, Navigate } from "react-router-dom";
import "./Register.css";
import { selectIsAuth } from "../../redux/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { fetchRegister } from "../../redux/slices/auth";

export default function Register() {
  const isAuth = useSelector(selectIsAuth);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchRegister(values));

    if (!data.payload) {
      return alert("Не удалось зарегистрироваться");
    }

    if ("token" in data.payload) {
      window.localStorage.setItem("token", data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/me" />;
  }
  return (
    <div className="container-login">
      <div className="center height-100vh-2">
        <div className="window-register">
          <Link className="text-decoration-none" to="/auth/login">
            Назад
          </Link>
          <h3 className="center">Регистрация</h3>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div>
              <input
                type="text"
                className="form-input mb-3"
                placeholder="Имя"
                error={Boolean(errors.firstName?.message)}
                helperText={errors.firstName?.message}
                {...register("firstName", { required: "Укажите имя" })}
              />
            </div>
            <div>
              <input
                type="text"
                className="form-input mb-3"
                placeholder="Фамилия"
                error={Boolean(errors.lastName?.message)}
                helperText={errors.lastName?.message}
                {...register("lastName", { required: "Укажите фамилию" })}
              />
            </div>
            <div>
              <input
                type="email"
                className="form-input mb-3"
                placeholder="Email"
                error={Boolean(errors.email?.message)}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-input"
                placeholder="Пароль"
                error={Boolean(errors.password?.message)}
                helperText={errors.password?.message}
                {...register("password", { required: "Введите пароль" })}
              />
            </div>
            <div className="center my-3">
              <button
                disabled={!isValid}
                className="btn btn-primary center"
                type="submit"
              >
                Зарегистрироваться
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
