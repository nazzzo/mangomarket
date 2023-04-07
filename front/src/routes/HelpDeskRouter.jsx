import { Routes, Route } from 'react-router-dom'
import {
    HelpDeskList,
    HelpDeskWrite,
    HelpDeskReport,
    HelpBoard,
    HelpView,
    HelpDeskProfileList,
} from '../pages/helpdesk'

export const HelpDeskRouter = () => {
    return (
        <Routes>
            <Route path="" element={<HelpDeskList />} />
            <Route path="/write" element={<HelpDeskWrite />} />
            <Route path="/report" element={<HelpDeskReport />} />
            <Route path="/board" element={<HelpBoard />} />
            <Route path="/board/:id" element={<HelpView />} />
            <Route path="writeList" element={<HelpDeskProfileList />} />
        </Routes>
    )
}
