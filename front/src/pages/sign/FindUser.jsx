import { useState } from "react";
import { useInput } from "../../hooks/useInput";
import { Input } from "../../common/input";
import { Button } from "../../common/button";
import { SwitchBox, Switch } from "../../common/switch";
import { FindUserWrap, FindUserForm, ManualText, ResultText } from "./styled";
import request from "../../utils/request";

export const FindUser = () => {
  const username = useInput("");
  const email = useInput("");
  const phoneNumber = useInput("");
  const [isFindPw, setIsFindPw] = useState(false);
  const [isResponse, setIsResponse] = useState(null);

  const handleSwitch = () => {
    setIsFindPw(!isFindPw);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFindPw) {
      const response = await request.post("/users/usercheck", {
        phoneNumber: phoneNumber.value,
      });
      setIsResponse(response.data.email);
    } else {
      const response = await request.post("/users/usercheck", {
        email: email.value,
      });
    }
  };

  return (
    <FindUserWrap width="20.5rem" height="27rem">
      <SwitchBox height="3.5rem">
        <Switch onClick={handleSwitch} isActive={!isFindPw} fontSize="0.9rem">
          아이디 찾기
        </Switch>
        <Switch onClick={handleSwitch} isActive={isFindPw} fontSize="0.9rem">
          비밀번호 찾기
        </Switch>
      </SwitchBox>
      <FindUserForm onSubmit={handleSubmit} width="16.5rem">
        <ManualText fontSize="0.75rem">
          {isFindPw
            ? "닉네임과 이메일을 입력하시면, 임시 비밀번호를 발송해드립니다"
            : "닉네임과 전화번호를 입력해주세요"}
        </ManualText>
        <Input
          height="3rem"
          type="text"
          value={username.value}
          onChange={username.onChange}
          id="username"
          name="username"
          icon="mdi:account"
          placeholder="닉네임"
        ></Input>
        <Input
          height="3rem"
          type="text"
          value={isFindPw ? email.value : phoneNumber.value}
          onChange={isFindPw ? email.onChange : phoneNumber.onChange}
          id={isFindPw ? "email" : "phoneNumber"}
          name={isFindPw ? "email" : "phoneNumber"}
          icon={
            isFindPw
              ? "ic:round-email"
              : "material-symbols:phone-android-rounded"
          }
          placeholder={isFindPw ? "이메일" : "전화번호"}
        ></Input>
        <Button color="yellow" fontColor="#fff" fontSize="1rem" height="3rem">
          {isFindPw ? "이메일 전송" : "가입정보 조회"}
        </Button>
        {isResponse ? (
          <ResultText fontSize="0.7rem">
            {isFindPw
              ? "메일이 전송되었습니다. 메일함을 확인해주세요"
              : `사용하신 아이디는 ${isResponse}입니다`}
          </ResultText>
        ) : (
          ""
        )}
      </FindUserForm>
    </FindUserWrap>
  );
};
