import { useEffect } from "react";
import { AppRouter } from "./routes";
import { Header } from "./common";
import { useDispatch, useSelector } from "react-redux";
import { CategoryRequest } from "./store";

const App = () => {
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector((state) => state.category);
  const { isLogin, user } = useSelector((state) => state.user);
  // console.log(`user:::`, user, isLogin)

  useEffect(() => {
    dispatch(CategoryRequest());
  }, [dispatch]);

  if (loading) return <>로딩중...</>;
  if (error) return <>{error}</>;

  return (
    <>
      <Header categories={data} isLogin={isLogin} user={user} />
      <AppRouter />
    </>
  );
};

export default App;
