import { Route, Routes } from 'react-router-dom'
import {
    CommunityList,
    CommunityView,
    CommunityWrite,
    CommunityUpdate,
    CommunnityProfileList,
} from '../pages/community'

export const CommunityRouter = () => {
    return (
        <Routes>
            <Route path="" element={<CommunityList />} />
            <Route path="write" element={<CommunityWrite />} />
            <Route path=":id" element={<CommunityView />} />
            <Route path="update/:id" element={<CommunityUpdate />} />
            <Route path="writeList" element={<CommunnityProfileList />} />
        </Routes>
    )
}
