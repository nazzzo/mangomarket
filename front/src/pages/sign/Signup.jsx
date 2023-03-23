import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks";
import { Input } from "../../common/input";
import { validCheck, duplicateCheck, passwordCheck, InputCheck } from "../../common/inputCheck" 
import { Button } from "../../common/button";
import { ProfileImg } from "../../common/upload";
import { CheckBox } from "../../common/checkbox";
import { SignupWrap, ImageBox, FormWrap, SignupForm, Label } from "./styled";
import request from "../../utils/request";

export const Signup = () => {
  const [profileImage, setProfileImage] = useState()
  const [isFocused, setIsFocused] = useState(null)
  const [isValid, setIsValid] = useState()
  const [isDuplicated, setIsDuplicated] = useState(false)

  const dispatch = useDispatch();
  const { isLoading, isError, isLogin, user } = useSelector((state) => state.user);
  const username = useInput("");
  const userpw = useInput("");
  const pwcheck = useInput("");
  const email = useInput("");
  const phoneNumber = useInput("");
  const navigate = useNavigate();  
  
  const handleInputChange = async (e) => {
    setIsFocused(e.target.id)
    validCheck(e.target, setIsValid)
    if (isValid) await duplicateCheck(e.target, setIsDuplicated)
    if (e.target.id === "pwcheck") passwordCheck({
      userpw : userpw.value,
      pwcheck : e.target.value, 
      setIsValid})
  };

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
        <InputCheck id="username" isFocused={isFocused} isValid={isValid} isDuplicated={isDuplicated} duplicated="이미 사용중입니다" enable="사용할 수 있습니다" invalid="초성 및 특수문자는 사용할 수 없습니다" />
        <Input
          height="3rem"
          type="text"
          value={username.value}
          onChange={username.onChange}
          onInput={handleInputChange}
          id="username"
          name="username"
          icon="mdi:account"
          placeholder="사용할 닉네임을 입력해주세요"
        ></Input>
        <Label>비밀번호</Label>
        <InputCheck id="userpw" isFocused={isFocused} isValid={isValid} enable="사용할 수 있습니다" invalid="특수문자를 포함한 8자리 이상의 영문 및 숫자" />
        <Input
          height="3rem"
          type="password"
          value={userpw.value}
          onChange={userpw.onChange}
          onInput={handleInputChange}
          id="userpw"
          name="userpw"
          icon="mdi:eye-off"
          placeholder="비밀번호를 입력해주세요"
        ></Input>
        <Label>비밀번호 확인</Label>
        <InputCheck id="pwcheck" isFocused={isFocused} isValid={isValid} enable="사용할 수 있습니다" invalid="비밀번호가 일치하지 않습니다" />
        <Input
          height="3rem"
          type="password"
          value={pwcheck.value}
          onChange={pwcheck.onChange}
          onInput={handleInputChange}
          id="pwcheck"
          icon="mdi:eye-off"
          placeholder="비밀번호를 다시 한 번 입력해주세요"
        ></Input>
        <Label>이메일</Label>
        <InputCheck id="email" isFocused={isFocused} isValid={isValid} isDuplicated={isDuplicated} duplicated="이미 사용중입니다" enable="사용할 수 있습니다" invalid="이메일 형식에 맞게 입력해주세요" />
        <Input
          height="3rem"
          type="email"
          value={email.value}
          onChange={email.onChange}
          onInput={handleInputChange}
          id="email"
          name="email"
          icon="ic:round-email"
          placeholder="이메일을 입력해주세요"
        ></Input>
        <Label>전화번호</Label>
        <InputCheck id="phoneNumber" isFocused={isFocused} isValid={isValid} isDuplicated={isDuplicated} duplicated="이미 사용중입니다" enable="사용할 수 있습니다" invalid="'-'를 제외한 11자리 숫자" />
        <Input
          height="3rem"
          type="tell"
          value={phoneNumber.value}
          onChange={phoneNumber.onChange}
          onInput={handleInputChange}
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
