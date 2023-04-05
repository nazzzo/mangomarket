import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "../../store/user";
import { ProfileImgUpload } from "../upload/ProfileImgUpload";
import { Input } from "../input";
import { useInput } from "../../hooks";
import { Button } from "../../common/button"
import { Modal } from "../../common/modal"
import { MapAPI } from "../../pages"
import { UserInfoWrap, UserImg, UserInfoLabel, UserName, Address, ButtonBox } from "./styled";
import request from "../../utils/request";

export const MyInfo = ({ user, width, height, imgSize, fontSize }) => {
  const dispatch = useDispatch();
  // const { isLoading, isError, isLogin, user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(user.userImg);
  const [isOpen, setIsOpen] = useState(false)
  const username = useInput(user.username);

  const handleMode = () => {
    setIsEdit((prevState) => !prevState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const response = await request.put("/users", {
            username: username.value,
            userImg: profileImage,
            email: user.email,
            address: user.address,
          });
          console.log(`response:::`, response.data);
          dispatch(
            userLogin(true, {
              email: response.data.user.email,
              username: response.data.user.username,
              userImg: response.data.user.userImg,
              address: response.data.address,
            })
          );
    } catch (e) {
        console.error(e)
    }
  }

  return (
    <>
      <UserInfoWrap width={width} height={height}>
        <form onSubmit={handleSubmit}>
          {isEdit ? (
            <ProfileImgUpload
              width={imgSize}
              height={imgSize}
              src={profileImage}
              setState={setProfileImage}
            />
          ) : (
            <UserImg imgSize={imgSize} src={user.userImg} />
          )}
          {isEdit ? (
            <Input
              height="3rem"
              type="text"
              value={username.value}
              onChange={username.onChange}
              id="username"
              name="username"
              icon="mdi:user-edit"
            />
          ) : (
            <UserInfoLabel>
              <UserName fontSize={fontSize}>{user.username}</UserName>
              <Address fontSize={fontSize}>{user.address}</Address>
            </UserInfoLabel>
          )}
            <ButtonBox>
              {!isEdit && <Button color="yellow" onClick={()=>{setIsOpen(true)}} type="button">동네 인증</Button>}
              <Button color="gray" onClick={handleMode}>
              {" "}
              {isEdit ? "완료" : "프로필 수정"}
              </Button>
            </ButtonBox>
        </form>
      </UserInfoWrap>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
            <MapAPI setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
};
