import { Report } from './styled'
import { useState } from 'react'
import { useInput, useTextArea } from '../../hooks'
export const HelpDeskReport = () => {
    const [reportInfo, setReportInfo] = useState()

    return <Report reportInfo={reportInfo} setReportInfo={setReportInfo} />
}
