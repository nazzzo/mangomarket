import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { SwitchBox, Switch } from "../../common/switch";
import { ChatterWrap, Chatters, ChatterItem, ChatterImgWrap, ChatterImg, ChatterContentWrap, ChatterUser, ChatterContent, BoardImgWrap, BoardImg } from "./styled";
import request from "../../utils/request";
import { SellerChat, CustomerChat } from ".";

export const ChatterList = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [customerList, setCustomerList] = useState({ isLoading: true, error: null, data: {}});
  const [sellerList, setSellerList] = useState({ isLoading: true, error: null, data: {} });
  const [selectedChatter, setSelectedChatter] = useState();
  const { user } = useSelector((state) => state.user);
  const chatterList = isSeller ? sellerList.data : customerList.data;

  const getCustomerList = async () => {
    try {
      const { data } = await request.get(`/chats/customers?seller=${user.email}`);
      setCustomerList({ ...customerList, isLoading: false, error: null, data });
    } catch (e) {
      setCustomerList({ ...customerList, isLoading: false, error: e.message, data: null });
    }
  };

  const getSellerList = async () => {
    try {
      const { data } = await request.get(`/chats/sellers?customer=${user.email}`);
      setSellerList({ ...customerList, isLoading: false, error: null, data });
    } catch (e) {
      setSellerList({ ...customerList, isLoading: false, error: e.message, data: null});
    }
  };

  const handleSwitch = () => {setIsSeller(!isSeller)};
  const handleClick = (data) => {setSelectedChatter(data)};
  const handleGoBack = () => {setSelectedChatter(null)};

  useEffect(() => {
    getCustomerList();
    getSellerList();
  }, []);

  if (customerList.isLoading || sellerList.isLoading) return <>Loading...</>;
  if (customerList.error || sellerList.error) return <>{customerList.error || sellerList.error}</>;
  return (
    <>
      { !selectedChatter ?
          <>
           <SwitchBox height="3.5rem">
            <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="1rem">
              나의 판매목록
            </Switch>
            <Switch onClick={handleSwitch} isActive={isSeller} fontSize="1rem">
              나의 구매목록
            </Switch>
          </SwitchBox>
          <ChatterWrap>
            <Chatters>
              {chatterList.map((v, index) => {
                return (
                  <ChatterItem onClick={() => handleClick(v)} key={index}>
                    <ChatterImgWrap>
                      <ChatterImg src={v.userImg}></ChatterImg>
                    </ChatterImgWrap>
                    <ChatterContentWrap>
                      <ChatterUser
                        username={v.username}
                        address={v.address}
                        date={v.createdAt}
                      />
                      <ChatterContent>{v.content}</ChatterContent>
                    </ChatterContentWrap>
                    <BoardImgWrap>
                      <BoardImg src={v.image} />
                    </BoardImgWrap>
                  </ChatterItem>
                );
              })}
            </Chatters>
          </ChatterWrap>
          </>
          : <SellerChat chatter={selectedChatter} onClick={handleGoBack} />
          // : <CustomerChat boardid={selectedChatter.boardid} onClick={handleGoBack} />
    }
    </>
  );
};
