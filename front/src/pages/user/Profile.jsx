import { MyInfo, MyPoint, MyKeyword } from "../../common/profile";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import request from "../../utils/request";



export const Profile = () => {
  const { user } = useSelector((state) => state.user);
  
  const [isOpen, setIsOpen] = useState(false);
  const [chart, setChart] = useState();
  const [sum, setSum] = useState();

  useEffect(() => {
    const getPoint = async () => {
      const response = await request.get(`/users/point/${user.email}`);
      console.log(`response:::`, response.data);
      setChart(response.data.chart);
      setSum(response.data.sum);
    };
    getPoint();
  }, []);

  return (
    <>
      {user? <MyInfo user={user} width="100%" height="12rem" imgSize="7rem" fontSize="1.1rem" /> : <></>}
      {sum && chart ? (
        <MyPoint username={user.username} email={user.email} chart={chart} sum={sum} />
      ) : (
        <></>
      )}
      <MyKeyword />
    </>
  );
};
