import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, saveUserInfo, removeUserInfo } from "../../store/user";
import { useNavigate } from "react-router-dom";
import { useInput } from "../../hooks/useInput";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { CheckBox } from "../../common/checkbox";
import { Modal } from "../../common/modal"
import { FindUser } from "./FindUser"
import { SigninWrap, SigninForm, KakaoBtn, SigninOption } from "./styled";
import request from "../../utils/request";

export const Login = () => {
  const [rememberMe, setRememberMe] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dispatch = useDispatch();
  const { isLoading, isError, isLogin, user, auth } = useSelector((state) => state.user);
  const userid = useInput(auth.userid);
  const userpw = useInput(auth.userpw);
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.userid && auth.userpw) setRememberMe(true);
  }, []);

  const handleCheck = (e) => {
    setRememberMe((prevState) => !prevState)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await request.post("/auths", {
      userid: userid.value,
      userpw: userpw.value,
    });
    if (response.status >= 400 || response.data.isError) {
      alert(response.data.message);
    } else if (response.status === 200 && response.data.userid) {
      dispatch(
        userLogin(true, {
          userid: response.data.userid,
          username: response.data.username,
        })
      );
      rememberMe
      ? dispatch(saveUserInfo(userid.value, userpw.value))
      : dispatch(removeUserInfo())
      navigate("/");
    }
  };

  return (
    <>
    <SigninWrap width="23rem" height="42rem">
      <SigninForm width="18.7rem" onSubmit={handleSubmit}>
        <Input
          height="3rem"
          type="text"
          value={userid.value}
          onChange={userid.onChange}
          id="email"
          name="email"
          icon="ic:round-email"
          placeholder="이메일 주소를 입력해주세요"
        ></Input>
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
        <Button
          color="yellow"
          fontColor="#fff"
          fontSize="1.1rem"
          height="3rem"
        >Login</Button>
        <KakaoBtn />
      </SigninForm>
      <SigninOption width="18.7rem" fontSize="0.9rem">
        <ul>
          <li>
            <CheckBox color="yellow" size="0.95rem" id="check" text="Remember Me" checked={rememberMe} onChange={handleCheck}/>
          </li>
          <li onClick={()=>{setIsOpen(true)}}>비밀번호 찾기</li>
        </ul>
        <p>아직 회원이 아니신가요? <a onClick={()=>{navigate("/signup")}}>회원가입</a></p>
      </SigninOption>
    </SigninWrap>
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}><FindUser /></Modal>
</>
  );
};
