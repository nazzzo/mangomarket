import styled from 'styled-components'
import { Icon } from '@iconify/react'
import { Modal } from '../../../common/modal'
import { useNavigate } from 'react-router-dom'
const HelpDeskWrap = styled.div`
    width: 100%;
`

const WelcomeText = styled.h2`
    color: black;
    margin-top: 1rem;
    font-weight: 100;
`

const QuestionDiv = styled.div`
    width: 100%;
    /* height: 29rem; */
    display: flex;
    align-items: flex-start;
    flex-direction: column;
`

const QuestionText = styled.h2`
    display: flex;
    align-items: center;
    color: black;
    margin-top: 1rem;
    margin-left: 2.9rem;
    font-weight: 700;
    font-size: 1.3rem;
    line-height: 2.43rem;
`

const QuestionUl = styled.ul`
    width: 38.76rem;
    /* height: 29rem; */
    margin-top: 2rem;
    position: relative;
    & > div {
        position: relative;
        width: 100%;
        height: 7rem;
        transition: all 0.5s ease-in-out;
    }
    & > div.off {
        height: 0;
        top: -5rem;
        opacity: 0;
        z-index: -10;
    }
    & > div.on {
        display: block;
        top: 0;
        height: 7rem;
        z-index: 2;
        opacity: 1;
        padding: 3rem;
    }
`
const QuestionLi = styled.li`
    width: 100%;
    height: 7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #ececec;
    & > p {
        width: 80%;
        margin-left: 3rem;
    }

    & > svg {
        align-items: flex-end;
        margin-right: 1.5rem;
    }
`

const SpaceDiv = styled.div`
    width: 100%;
    height: 4rem;
    margin-top: 1rem;
`
const SpaceDiv2 = styled.div`
    width: 100%;
    height: 4rem;
    margin-top: 1rem;
`

const ButtonDiv = styled.div`
    width: 100%;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 5rem;
`

const ReportButton = styled.button`
    border: none;
    width: 6rem;
    height: 3rem;
    margin-right: 3rem;

    &:hover {
        background-color: #e0e0e0;
        color: #444444;
    }
`

export const HelpDeskWraaper = ({ username, textArr }) => {
    const navigate = useNavigate()
    const clickHandler = (e) => {
        const toggle = e.target.nextSibling.classList
        if (toggle.contains('on')) {
            toggle.remove('on')
            toggle.add('off')
        } else {
            toggle.remove('off')
            toggle.add('on')
        }
    }

    const handleWriteClick = () => {
        navigate('/helpdesk/write')
    }

    const handleReportClick = () => {
        navigate('/helpdesk/report')
    }

    return (
        <HelpDeskWrap>
            <WelcomeText>안녕하세요 {username}님,</WelcomeText>
            <WelcomeText>
                무엇을 도와드릴까요?{' '}
                <Icon icon="fluent-emoji:mango" style={{ width: '2rem', height: '2rem' }} />
            </WelcomeText>
            <SpaceDiv />
            <QuestionDiv>
                <QuestionText>
                    자주 묻는 질문{' '}
                    <Icon
                        icon="iconoir:emoji-puzzled"
                        style={{
                            width: '2rem',
                            height: '1.5rem',
                            color: 'black',
                        }}
                    />
                </QuestionText>
                <QuestionUl>
                    {textArr.map((v) => (
                        <>
                            <QuestionLi onClick={clickHandler} style={{ cursor: 'pointer' }}>
                                <p>{v.subject}</p>
                                <Icon
                                    icon="material-symbols:navigate-next"
                                    style={{ width: '2rem', height: '2rem', pointerEvents: 'none' }}
                                />
                            </QuestionLi>

                            <div className="off">{v.content}</div>
                        </>
                    ))}
                </QuestionUl>
                <SpaceDiv2 />
                <ButtonDiv>
                    <ReportButton onClick={handleWriteClick}>1:1 문의하기</ReportButton>
                    <ReportButton onClick={handleReportClick}>신고하기</ReportButton>
                </ButtonDiv>
            </QuestionDiv>
        </HelpDeskWrap>
    )
}
