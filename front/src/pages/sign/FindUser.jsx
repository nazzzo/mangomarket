import { useState } from "react"
import { useInput } from "../../hooks/useInput";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { SwitchBox, Switch } from "../../common/switch";
import { FindUserWrap, FindUserForm, ManualText, ResultText } from "./styled";
import request from "../../utils/request";

export const FindUser = () => {
  const username = useInput("");
  const email = useInput("");
  const userid = useInput("");  
  const [isFindId, setIsFindId] = useState(true);
  const [isResponse, setIsResponse] = useState(false);

  const handleSwitch = () => {
    setIsFindId(!isFindId);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFindId) {
        const response = await request.post("/auths", {
            username: username.value,
            email: email.value,
          });
    } else {
        const response = await request.post("/auths", {
            userid: userid.value,
            email: email.value,
          });
    }
  };

  return (
    <FindUserWrap  width="20.5rem" height="27rem">
      <SwitchBox height="3.5rem">
        <Switch onClick={handleSwitch} isActive={isFindId} fontSize="0.9rem">아이디 찾기</Switch>
        <Switch onClick={handleSwitch} isActive={!isFindId} fontSize="0.9rem">비밀번호 찾기</Switch>
      </SwitchBox>
      <FindUserForm onSubmit={handleSubmit} width="16.5rem">
        <ManualText fontSize="0.75rem">          
        {isFindId
            ? "이름과 이메일을 입력해주세요"
            : "아이디와 이메일을 입력하시면, 임시 비밀번호를 발송해드립니다"}
        </ManualText>
        <Input
          height="3rem"
          type="text"
          value={isFindId ? username.value : userid.value}
          onChange={isFindId ? username.onChange : userid.onChange}
          id={isFindId ? "username" : "userid"}
          name={isFindId ? "username" : "userid"}
          icon="mdi:account"
          placeholder={isFindId ? "이름" : "아이디"}
        ></Input>
        <Input
          height="3rem"
          type="text"
          value={email.value}
          onChange={email.onChange}
          id="email"
          name="email"
          icon="ic:round-email"
          placeholder="이메일"
        ></Input>
        <Button color="yellow" fontColor="#fff" fontSize="1rem" height="3rem">
        {isFindId ? "아이디 검색" : "이메일 전송"}
        </Button>
        <ResultText fontSize="0.7rem">          
        {isFindId
            ? "회원님이 가입하신 아이디는 <span>{{userid}}</span>입니다"
            : "메일이 전송되었습니다. 메일함을 확인해주세요"}
        </ResultText>
      </FindUserForm>
    </FindUserWrap>
  );
};