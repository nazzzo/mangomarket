import { Routes, Route } from "react-router";
import { Main, Login, Logout, Signup } from "../pages";
import { BoardRouter } from "./BoardRouter";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/board/*" element={ <BoardRouter />} />
    </Routes>
  );
};
