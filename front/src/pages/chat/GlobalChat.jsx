import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap, ChatterWrap, ChatterList, ChatterItem, ChatterImgWrap, ChatterImg, ChatterContentWrap, ChatterUser, ChatterContent, BoardImgWrap, BoardImg, ChatterCard } from "./styled";
import request from "../../utils/request";
import { SellerChat } from "./index";

export const GlobalChat = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [sellerList, setSellerList] = useState([]);
  const [selectedChatter, setSelectedChatter] = useState();
  const { user } = useSelector((state) => state.user);

  const handleSwitch = () => {
    setIsSeller(!isSeller)
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

  const handleGoBack = () => {
    setSelectedChatter(null);
  }

  const chatterList = isSeller ? sellerList : customerList;

  return (
    <GlobalChatWrap width="27rem" height="37rem">
      {!selectedChatter && (
        <SwitchBox height="3.5rem">
          <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="1rem">
            나의 판매목록
          </Switch>
          <Switch onClick={handleSwitch} isActive={isSeller} fontSize="1rem">
            나의 구매목록
          </Switch>
        </SwitchBox>
      )}
      {!selectedChatter && customerList && sellerList ? (
        <ChatterWrap>
          <ChatterList>
            {chatterList.map((v, index) => {
              return (
                <ChatterItem onClick={() => handleClick(v)} key={index}>
                  <ChatterImgWrap>
                    <ChatterImg src={v.userImg}></ChatterImg>
                  </ChatterImgWrap>
                  <ChatterContentWrap>
                    <ChatterUser username={v.username} address={v.address} date={v.createdAt} />
                    <ChatterContent>{v.content}</ChatterContent>
                  </ChatterContentWrap>
                  <BoardImgWrap>
                    <BoardImg src={v.image} />
                  </BoardImgWrap>
                </ChatterItem>
              );
            })}
          </ChatterList>
        </ChatterWrap>
      ) : (
        <>
          <ChatterCard onClick={handleGoBack} chatter={selectedChatter} />
          <SellerChat
            seller={!isSeller ? user.email : selectedChatter.seller}
            customer={!isSeller ? selectedChatter.customer : user.email}
            boardid={selectedChatter.boardid}
            chatter={selectedChatter}
          />
        </>
      )}
    </GlobalChatWrap>
  );
};
