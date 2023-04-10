import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap, ChatterWrap, ChatterList, ChatterItem, ChatterImgWrap, ChatterImg, ChatterContentWrap, ChatterUserWrap, ChatterUserName, ChatterUserAddress, ChatterContent } from "./styled";
import request from "../../utils/request";
import { SellerChat, CustomerChat } from "./index";

export const GlobalChat = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [selectedChatter, setSelectedChatter] = useState();
  const { user } = useSelector((state) => state.user);

  const handleSwitch = () => {
    setIsSeller(!isSeller);
  };

  const getCustomerList = async () => {
    const response = await request.get(`/chats/customers?seller=${user.email}`);
    if (!response.data.isError) setCustomerList(response.data);
  };

  useEffect(() => {
    getCustomerList();
    getSellerList();
  }, []);

  const getSellerList = async () => {
    const response = await request.get(`/chats/sellers?customer=${user.email}`);
    if (!response.data.isError) setSellerList(response.data);
  };

  const handleClick = (data) => {
    setSelectedChatter(data);
  };

  const chatterList = isSeller ? sellerList : customerList;

  return (
    <GlobalChatWrap>
      {!selectedChatter && (
        <SwitchBox height="3.5rem">
          <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="0.9rem">
            나의 판매목록
          </Switch>
          <Switch onClick={handleSwitch} isActive={isSeller} fontSize="0.9rem">
            구매자
          </Switch>
        </SwitchBox>
      )}
      {!selectedChatter && customerList && sellerList ? (
        <ChatterWrap>
          <ChatterList>
            {chatterList.map((v, index) =>  { console.log(chatterList)
            return(
              <ChatterItem onClick={() => handleClick(v)} key={index}>
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
              </ChatterItem>
            )})}
          </ChatterList>
        </ChatterWrap>
      ) : (
        <SellerChat
          seller={user.email}
          customer={selectedChatter.customer}
          boardid={selectedChatter.boardid}
        />
      )}
    </GlobalChatWrap>
  );
};
