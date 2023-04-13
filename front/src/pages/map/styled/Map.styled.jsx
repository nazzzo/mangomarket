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


export const ReserveInfoForm = styled.form`
    margin-top: 3%;
    padding: 3%;
    text-align: center;

    & button {
        margin-top: 2%;
        width: 50%;
        padding: 3%;
        color: #fff;
    }
`

export const AddressInfo = styled.div`
    font-size: 0.85rem;
    color: #000;
`

export const TimeInfo = styled.div`
    padding: 3% 0;
    font-size: 0.85rem;
    color: #198b34;
`