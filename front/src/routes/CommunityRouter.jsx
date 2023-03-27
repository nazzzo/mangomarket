import { Route, Routes } from "react-router-dom"
import { CommunityList, CommunityView, CommunityWrite } from "../pages/community"

export const CommunityRouter = () => {
  return (
      <Routes>
        <Route path="" element={<CommunityList />}/>
        <Route path="write" element={<CommunityWrite />} />
        <Route path="view/:id" element={<CommunityView />}/>
      </Routes>
  )
}