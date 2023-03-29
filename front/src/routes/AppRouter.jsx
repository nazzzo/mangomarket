import { Routes, Route } from "react-router";
import { Main, Login, Logout, Signup, Profile, MapAPI } from "../pages";
import { BoardRouter } from "./BoardRouter";
import { CommunityRouter } from "./CommunityRouter";

export const AppRouter = () => {

  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/board/*" element={ <BoardRouter />} />
      <Route path="/community/*" element={<CommunityRouter />} />
      <Route path="/maptest/*" element={<MapAPI />} />
    </Routes>
  );
};
