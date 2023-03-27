import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";
import { ProfileImgUpload } from "../upload/ProfileImgUpload";
import { Input } from "../input";
import { useInput } from "../../hooks";
import { UserInfoWrap, UserImg, UserName, ProfileEdit } from "./styled";
import request from "../../utils/request";

export const UserInfo = ({ width, height, imgSize, fontSize }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // const { isLoading, isError, isLogin, user } = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const [profileImage, setProfileImage] = useState(user.userImg);
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
            email: user.email
          });
          console.log(`response:::`, response.data);
          dispatch(
            userLogin(true, {
              email: response.data.user.email,
              username: response.data.user.username,
              userImg: response.data.user.userImg,
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
            <UserName fontSize={fontSize}>{user.username}</UserName>
          )}
          <ProfileEdit color="yellow" onClick={handleMode}>
            {" "}
            {isEdit ? "완료" : "프로필 수정"}
          </ProfileEdit>
        </form>
      </UserInfoWrap>
    </>
  );
};
