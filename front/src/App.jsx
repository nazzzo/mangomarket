import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import { AppRouter } from "./routes";
import { Header } from "./common";
import { ChatBtn } from "./common/button"
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./store/user";
import { CategoryRequest } from "./store";
import { AppWrapper } from "./styles/App.styled"
import request from "./utils/request";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { loading, error, data } = useSelector((state) => state.category);
  const { isLogin, user, keyword, isAlarm } = useSelector((state) => state.user);
  const [isAllowChat, setIsAllowChat] = useState(false);

  useEffect(() => {
    if (document.cookie.split("=")[0] === "token") {
      const token = document.cookie.split("=")[1];
      (async () => {
        const response = await request.post("/auths/sns", { token });
        if (response.status === 200 && response.data.email) {
          dispatch(
            userLogin(true, {
              email: response.data.email,
              username: response.data.username,
              userImg: response.data.userImg,
              address: response.data.address,
            })
          );
        }
      })();
    }
  }, [document.cookie]);

  useEffect(() => {
    dispatch(CategoryRequest());
  }, [dispatch]);


  useEffect(() => {
    setIsAllowChat(location.pathname.startsWith('/board'));
  }, [location.pathname]);

  if (loading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <>
      <Header categories={data} isLogin={isLogin} user={user} keywords={keyword} isAlarm={isAlarm} />
      <AppWrapper><AppRouter /></AppWrapper>
      {isLogin && !isAllowChat && <ChatBtn />}
    </>
  );
};

export default App;
