import { Report } from './styled'
import { useState } from 'react'

export const HelpDeskReport = () => {
    const [reportInfo, setReportInfo] = useState()

    return <Report reportInfo={reportInfo} setReportInfo={setReportInfo} />
}
