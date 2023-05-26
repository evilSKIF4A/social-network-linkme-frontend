import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import "./Login.css";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export default function Login() {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert("Не удалось авторизоваться!");
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
        <div className="window-login">
          <h3 className="center">Логин</h3>
          <form onSubmit={handleSubmit(onSubmit)} method="post">
            <div>
              <input
                type="email"
                className="form-input mb-3"
                placeholder="Email"
                error={errors.email?.message}
                helperText={errors.email?.message}
                {...register("email", { required: "Укажите почту" })}
              />
            </div>
            <div>
              <input
                type="password"
                className="form-input"
                placeholder="Пароль"
                error={errors.password?.message}
                helperText={errors.password?.message}
                {...register("password", { required: "Введите пароль" })}
              />
            </div>
            <div className="reboot-password">
              <Link className="reboot-password text-decoration-none " to="#">
                Забыли пароль?
              </Link>
            </div>
            <div className="center mb-1">
              <button
                disabled={!isValid}
                className="btn btn-primary center button"
                type="submit"
              >
                Войти
              </button>
            </div>
          </form>
          <div className="center ">
            <Link
              className="center button button-second text-decoration-none center "
              to="/auth/register"
            >
              Регистрация
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
