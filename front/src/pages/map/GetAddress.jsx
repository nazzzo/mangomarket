import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";
import { GetAddressForm, MyAddress, Result } from "./styled"
import { Button } from "../../common/button"
import { Alert } from "../../common/alert"
import request from "../../utils/request"

export const GetAddress = ({ lat, lng, setIsOpen }) => {
    const [address, setAddress] = useState(null);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch()

    const handleGetAddress= () => {
        const geocoder = new window.kakao.maps.services.Geocoder(); // 좌표 -> 주소로 변환해주는 객체
        const coord = new window.kakao.maps.LatLng(lat, lng); // 주소로 변환할 좌표 입력
        const callback = function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            console.log(result[0].address)
            const depth2 = result[0].address['region_2depth_name']
            const depth3 = result[0].address['region_3depth_name']
            setAddress(depth2 + " " + depth3);
          }
        };
        geocoder.coord2Address(coord.getLng(), coord.getLat(), callback);
      }

      const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await request.put("/users", {
                email: user.email,
                username: user.username,
                userImg: user.userImg,
                address: address,
                latitude : lat, 
                longitude : lng,
              });
              if (response.data.user) {
                dispatch(
                    userLogin(true, {
                        email: user.email,
                        username: user.username,
                        userImg: user.userImg,
                        address: address,
                    })
                  );
                  setIsOpenAlert(true)
                }
        } catch (e) {
            console.error(e)
        }
      }
      console.log(`opened:::`, isOpenAlert)

      const handleCloseAlert = () => {
        setIsOpenAlert(false)
        setIsOpen(false)
    }

  return (
    <>
        <GetAddressForm onSubmit={handleSubmit} >
        {address && (<MyAddress>내 주소는...? <Result>{address}</Result></MyAddress>)}
        {!address
        ? <Button type="button" onClick={handleGetAddress} color="yellow">주소 찾기</Button>
        : <Button type="submit" color="yellow">동네 인증</Button>
        }
        </GetAddressForm>
        <Alert isOpenAlert={isOpenAlert} onClose={handleCloseAlert} color="green" width="20rem" height="5rem">동네인증 성공</Alert>
    </>
  );
};