import { Routes, Route } from "react-router-dom";
import { BoardView, BoardWrite } from "../pages";

export const BoardRouter = () => {
  return (
    <Routes>
      <Route path="write" element={<BoardWrite />} />
      <Route path=":id" element={<BoardView />} />
    </Routes>
  );
};
