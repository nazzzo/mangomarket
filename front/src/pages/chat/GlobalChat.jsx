import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap } from "./styled"
import request from "../../utils/request";
import { SellerChat, CustomerChat } from './index';

import styled from 'styled-components';

const ChatterWrap = styled.div`
    
`

const ChatterList = styled.ul`
    
`

const Chatter = styled.li`
    display: flex;
    height: 80px;
`

const ChatterImgWrap = styled.div`
    width: 20%;
`

const ChatterImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
`

const ChatterContentWrap = styled.div`
    width: 80%;
    display: flex;
    padding-top: 1rem;
    box-sizing: border-box;
`

const ChatterUserWrap = styled.div`
    width: 40%;
    padding-left: 1.5rem;
    box-sizing: border-box;

    & > div + div {
        margin-top: 0.5rem;
    }
`

const ChatterUserName = styled.div`
`

const ChatterUserAddress = styled.div`
    
`

const ChatterContent = styled.div`
    width: 60%;
`

export const GlobalChat = () => {
    const [isSeller, setIsSeller] = useState(false);
    const [customerList, setCustomerList] = useState([])
    console.log(customerList)
    const [sellerList, setSellerList] = useState([])
    const [selectedChatter, setSelectedChatter] = useState()
    const { user } = useSelector((state) => state.user)

    const handleSwitch = () => {
        setIsSeller(!isSeller);
    };

    const getCustomerList = async () => {
        const response = await request.get(`/chats/customers?seller=${user.email}`)
        setCustomerList(response.data)
    }

    useEffect(() => {
        getCustomerList()
        getSellerList()
    }, [])

    const getSellerList = async () => {
        const response = await request.get(`/chats/sellers?customer=${user.email}`)
        setSellerList(response.data)
    }

    const handleClick = (e) => {
        console.log(e.target)

        setSelectedChatter()
    }

    return (
        <GlobalChatWrap>
            <SwitchBox height="3.5rem">
                <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="0.9rem">
                    나의 판매목록
                </Switch>
                <Switch onClick={handleSwitch} isActive={isSeller} fontSize="0.9rem">
                    구매자
                </Switch>
            </SwitchBox>
            {/* {isSeller ? <SellerChat /> : <CustomerChat seller={"1"} customer={123} boardid={1234} />} */}
            <ChatterWrap>
                <ChatterList>
                    {!isSeller ? customerList.map((v, index) =>
                        !selectedChatter ? 
                        <Chatter onClick={handleClick} key={index} room={`${v.boardid}-${v.customer}`}>
                            <ChatterImgWrap>
                                <ChatterImg src={v.userImg}></ChatterImg>
                            </ChatterImgWrap>
                            <ChatterContentWrap>
                                <ChatterUserWrap>
                                    <ChatterUserName>{v.username}</ChatterUserName>
                                    <ChatterUserAddress>{v.address}</ChatterUserAddress>
                                </ChatterUserWrap>
                                <ChatterContent>최신채팅내역</ChatterContent>
                            </ChatterContentWrap>
                        </Chatter>
                        : <CustomerChat seller customer boardid />
                    ) : sellerList.map((v) =>
                        <Chatter>
                            <ChatterImgWrap>
                                <ChatterImg src={v.userImg}></ChatterImg>
                            </ChatterImgWrap>
                            <ChatterContentWrap>
                                <ChatterUserWrap>
                                    <ChatterUserName>{v.username}</ChatterUserName>
                                    <ChatterUserAddress>{v.address}</ChatterUserAddress>
                                </ChatterUserWrap>
                                <ChatterContent>최신채팅내역</ChatterContent>
                            </ChatterContentWrap>
                        </Chatter>
                    )}
                </ChatterList>
            </ChatterWrap>
        </GlobalChatWrap>
    );
};
// ChatterList
// Chatter
// ChatterImgWrap
// ChatterImg
// ChatterContentWrap
// ChatterUserName
// ChatterUserAddress
// ChatterContent