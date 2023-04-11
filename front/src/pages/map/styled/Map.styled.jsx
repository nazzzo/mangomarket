import styled from 'styled-components'


export const GetAddressForm = styled.form`
    width: 20rem;
    height: 10rem;
    display: flex;
    flex-direction: column;

    & button {
        margin: 8% auto;
        width: 15rem;
        padding: 3%;
        color: #fff;
        font-size: 1.1rem;
        border-radius: 6px;
    }
`

export const GuideText = styled.div`
    margin: 5% 0;
    font-size: 1rem;
    color: #333;
    display: flex;
`
export const MarkerImg = styled.img`
    height: 1.2rem;
    margin-right: 1%;
`


export const MyAddress = styled.div`
    margin: 5% auto 1% auto;
    font-size: 1.2rem;
`

export const Result = styled.div`
    color: #00a32b;
    font-size: 1.4rem;
`