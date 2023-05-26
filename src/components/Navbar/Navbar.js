import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/auth";
import logo from "../../static/img/logo.jpg";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.data);

  const onClickLogout = () => {
    dispatch(logout());
    window.localStorage.removeItem("token");
    navigate("/auth/login");
    window.location.reload();
  };

  const [searchText, setSearchText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!searchText) {
      return;
    }
    const strings = searchText.split(" ");
    const fname = strings[0];
    const lname = strings[1];

    navigate("/search/result/", { state: { fname, lname } });
  };
  return (
    <div className="container">
      <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
        <div className="col-md-3 mb-2 mb-md-0 ">
          <Link
            to="/me"
            className="d-inline-flex link-body-emphasis text-decoration-none"
          >
            <img src={logo} width="150px" height="30px" alt="Foto" />
          </Link>
        </div>

        <div className="col-md-2 mb-2 mb-md-0 ">
          <form onSubmit={onSubmit}>
            <input
              type="search"
              className="form-control"
              placeholder="Поиск..."
              aria-label="Search"
              onChange={(e) => setSearchText(e.target.value)}
              onSubmit={onSubmit}
              value={searchText}
            />
          </form>
        </div>

        <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
          <li>
            <Link to="/me" className="nav-link px-2">
              Моя страница
            </Link>
          </li>
          <li>
            <Link to="/chats" className="nav-link px-2">
              Чаты
            </Link>
          </li>
          <li>
            <Link
              to={userData ? "/friends/" + userData._id : "/friends/"}
              className="nav-link px-2"
            >
              Друзья
            </Link>
          </li>
          <li>
            <Link
              to={userData ? "/subscribers/" + userData._id : "/subscribers/"}
              className="nav-link px-2"
            >
              Подписчики
            </Link>
          </li>
        </ul>

        <div className="col-md-3 text-end">
          <button
            onClick={onClickLogout}
            type="submit"
            className="btn btn-danger me-2"
          >
            Выйти
          </button>
        </div>
      </header>
    </div>
  );
}
