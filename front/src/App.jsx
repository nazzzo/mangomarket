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
  const { isLogin, user } = useSelector((state) => state.user);

  console.log('배포 테스트:::', document.cookie, 'user:::', user)

  useEffect(() => {
    if (document.cookie.split("=")[0] === "token") {
      const token = document.cookie.split("=")[1];
      console.log(`token:::`, token);
      (async () => {
        const response = await request.post("/auths/sns", { token });
        if (response.status === 200 && response.data.email) {
          dispatch(
            userLogin(true, {
              email: response.data.email,
              username: response.data.username,
              userImg: response.data.userImg,
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
      <Header categories={data} isLogin={isLogin} user={user} />
      <AppWrapper><AppRouter /></AppWrapper>
    </>
  );
};

export default App;
