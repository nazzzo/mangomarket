import { useState } from "react";
import { Button } from "../../common/button";
import { SwitchBox, Switch } from "../../common/switch";
import { GlobalChatWrap } from "./styled"
import request from "../../utils/request";

export const GlobalChat = () => {
  const [isSeller, setIsSeller] = useState(false);

  const handleSwitch = () => {
    setIsSeller(!isSeller);
  };

  return (
    <GlobalChatWrap>
      <SwitchBox height="3.5rem">
        <Switch onClick={handleSwitch} isActive={!isSeller} fontSize="0.9rem">
          판매자
        </Switch>
        <Switch onClick={handleSwitch} isActive={isSeller} fontSize="0.9rem">
          구매자
        </Switch>
      </SwitchBox>
      {isSeller ? <div></div> : <div></div>}
    </GlobalChatWrap>
  );
};
