import { useState,useEffect } from "react";
import { ReserveInfoForm, AddressInfo, TimeInfo } from "./styled"
import { Button } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"


export const ReserveInfo = ({ address, time }) => {
  const [isOpenAlert, setIsOpenAlert] = useState(false);

  const date = new Date(time);
  const formattedTime = date.toLocaleDateString('en-US', {hour: 'numeric', minute: 'numeric'});

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await request.put("/board/${id}", {
          });
        if (response.data === 1) setIsOpenAlert(true)
    } catch (e) { console.error(e)}
  }

  const handleCloseAlert = () => {
    setIsOpenAlert(false)
  } 
  return (
    <>
        <ReserveInfoForm onSubmit={handleSubmit}>
            <AddressInfo>{address}</AddressInfo>
            <TimeInfo>예약시간: {formattedTime}</TimeInfo>
            <Button color="green">수락</Button>
            <Button color="grey">거절</Button>
        </ReserveInfoForm>
        <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">상품이 예약되었습니다</Alert>
    </>
  );
};