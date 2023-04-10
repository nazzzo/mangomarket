import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap } from "./styled"
import request from "../../utils/request";
import { SellerChat, CustomerChat, Chatter } from './index';

export const GlobalChat = () => {
    const [isSeller, setIsSeller] = useState(false);
    const [customerList, setCustomerList] = useState([])
    const [sellerList, setSellerList] = useState([])
    const [selectedChatter, setSelectedChatter] = useState()
    const { user } = useSelector((state) => state.user)

    const handleSwitch = () => {
        setIsSeller(!isSeller);
    };

    const getCustomerList = async () => {
        const response = await request.get(`/chats/customers?seller=${user.email}`)
        if( !response.data.isError ) setCustomerList(response.data)
    }

    useEffect(() => {
        getCustomerList()
        getSellerList()
    }, [])

    const getSellerList = async () => {
        const response = await request.get(`/chats/sellers?customer=${user.email}`)
        if( !response.data.isError ) setSellerList(response.data)
    }

    const handleClick = (data) => {
        setSelectedChatter(data)
    }

    return (
        <GlobalChatWrap>
            {!selectedChatter && <SwitchBox height="3.5rem">
                <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="0.9rem">
                    나의 판매목록
                </Switch>
                <Switch onClick={handleSwitch} isActive={isSeller} fontSize="0.9rem">
                    구매자
                </Switch>
            </SwitchBox>}
            {!selectedChatter ?
                <Chatter
                    isSeller={isSeller}
                    selectedChatter={selectedChatter}
                    customerList={customerList}
                    sellerList={sellerList}
                    handleClick={handleClick} />
                :
                <SellerChat
                    seller={user.email}
                    customer={selectedChatter.customer}
                    boardid={selectedChatter.boardid}
                />
            }
        </GlobalChatWrap>
    );
};