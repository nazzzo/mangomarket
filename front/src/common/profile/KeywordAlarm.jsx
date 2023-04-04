import { KeywordAlarmWrap, TextHeader } from './styled'
import { ItemContainer } from "../itemContainer"

export const KeywordAlarm = ({height, width, setIsOpen, alarmData, navigate}) => {

    return <KeywordAlarmWrap width={width} height={height}>
            <TextHeader>키워드 알람</TextHeader>
            {(!alarmData.isError)
            ? <ItemContainer boardList={alarmData} width={width} height={height} setIsOpen={setIsOpen} navigate={navigate} />
            : <></>}
    </KeywordAlarmWrap>
}