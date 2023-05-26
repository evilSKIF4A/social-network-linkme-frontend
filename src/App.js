import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyPage from "./pages/MyPage/MyPage";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth";
import Chats from "./pages/Chats/Chats";
import UserPage from "./pages/UserPage/UserPage";
import Search from "./pages/Search/Search";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import SubscribersPage from "./pages/SubscribersPage/SubscribersPage";
import socket from "./socket";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.data);
  const status = useSelector((state) => state.auth.status);
  const isAuth = useSelector(selectIsAuth);

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, [dispatch]);

  React.useEffect(() => {
    userData && socket.emit("addUser", userData?._id);
  }, [userData]);

  if (status === "loaded" && !isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/me" element={<MyPage />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/friends/:userId" element={<FriendsPage />} />
        <Route path="/subscribers/:userId" element={<SubscribersPage />} />
        <Route path="/users/:userId" element={<UserPage />} />
        <Route path="/search/result" element={<Search />} />
      </Routes>
    </div>
  );
}

export default App;
