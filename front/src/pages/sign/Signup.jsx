import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useInput, useDuplicateCheck } from "../../hooks";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { ProfileImg } from "../../common/upload";
import { CheckBox } from "../../common/checkbox";
import { SignupWrap, ImageBox, FormWrap, SignupForm, Label } from "./styled";
import request from "../../utils/request";

export const Signup = () => {
  const [profileImage, setProfileImage] = useState("http://localhost:3005/default-image.png")

  const dispatch = useDispatch();
  const { isLoading, isError, isLogin, user } = useSelector((state) => state.user);
  const username = useInput("");
  const userpw = useInput("");
  const pwcheck = useInput("");
  const email = useInput("");
  const phoneNumber = useInput("");
  const navigate = useNavigate();


  const duplicateCheck = async () => {
    const response = await request.post("/users/usercheck", {
      username: username.value,
    });
    console.log(response.data)
  }
  duplicateCheck()

  const handleSubmit = async (e) => {
    e.preventDefault();


    const response = await request.post("/users", {
      email: email.value,
      username: username.value,
      userpw: userpw.value,
      phoneNumber: phoneNumber.value,
      userImg: profileImage,
    });
    if (response.status >= 400 || response.data.isError) {
      alert(response.data.message);
    } else if (response.status === 201 && response.data === 'OK') {
      const response = await request.post("/auths", {
        email: email.value,
        userpw: userpw.value,
      });
      dispatch(
        userLogin(true, {
          email: response.data.email,
          username: response.data.username,
        })
      );
      navigate("/");
    }
  };

  return (
    <>
    <SignupWrap width="23rem" height="42rem">
      <ImageBox>
        <ProfileImg width="7rem" height="7rem" src={profileImage} setState={setProfileImage} />
      </ImageBox>
      <FormWrap>
      <SignupForm onSubmit={handleSubmit}>
        <Label>닉네임</Label>
        <Input
          height="3rem"
          type="text"
          value={username.value}
          onChange={username.onChange}
          id="username"
          name="username"
          icon="mdi:account"
          placeholder="사용할 닉네임을 입력해주세요"
        ></Input>
        <Label>비밀번호</Label>
        <Input
          height="3rem"
          type="password"
          value={userpw.value}
          onChange={userpw.onChange}
          id="userpw"
          name="userpw"
          icon="mdi:eye-off"
          placeholder="비밀번호를 입력해주세요"
        ></Input>
        <Label>비밀번호 확인</Label>
        <Input
          height="3rem"
          type="password"
          value={pwcheck.value}
          onChange={pwcheck.onChange}
          id="pwcheck"
          icon="mdi:eye-off"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        ></Input>
        <Label>이메일</Label>
        <Input
          height="3rem"
          type="email"
          value={email.value}
          onChange={email.onChange}
          id="email"
          name="email"
          icon="ic:round-email"
          placeholder="이메일을 입력해주세요"
        ></Input>
        <Label>전화번호</Label>
        <Input
          height="3rem"
          type="tell"
          value={phoneNumber.value}
          onChange={phoneNumber.onChange}
          id="phoneNumber"
          name="phoneNumber"
          icon="material-symbols:phone-android-rounded"
          placeholder="전화번호를 입력해주세요"
        ></Input>
        <Button
          color="yellow"
          fontColor="#fff"
          fontSize="1.1rem"
          height="3rem"
        >Sign Up
        </Button>
      </SignupForm>
      </FormWrap>
    </SignupWrap>
</>
  );
};
