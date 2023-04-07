import { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap } from "./styled"
import request from "../../utils/request";
import { SellerChat, CustomerChat } from './index';

export const GlobalChat = () => {
    const [ isSeller, setIsSeller ] = useState(false);
    const [ customerList, setCustomerList ]  = useState([])
    const [ sellerList, setSellerList ]  = useState([])
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
            <div>{ !isSeller ?
            customerList.map((v) => <div>{Object.values(v)}</div> )
            :
            sellerList.map((v) => <div>{Object.values(v)}</div> ) }</div>
        </GlobalChatWrap>
    );
};