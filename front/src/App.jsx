import { useEffect } from "react";
import { AppRouter } from "./routes";
import { Header } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "./store/user";
import { CategoryRequest } from "./store";
import { AppWrapper } from "./styles/App.styled"
import request from "./utils/request";

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.category);
  const { isLogin, user, keyword } = useSelector((state) => state.user);

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

  if (loading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <>
      <Header categories={data} isLogin={isLogin} user={user} keywords={keyword} />
      <AppWrapper><AppRouter /></AppWrapper>
    </>
  );
};

export default App;
