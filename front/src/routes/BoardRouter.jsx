import { Routes, Route } from "react-router-dom";
import { BoardList, BoardView, BoardWrite } from "../pages";

export const BoardRouter = () => {
  return (
    <Routes>
      <Route path="" element={<BoardList />} />
      <Route path="write" element={<BoardWrite />} />
      <Route path="view/:id" element={<BoardView />} />
    </Routes>
  );
};
