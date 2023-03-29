import { UserHistoryWrap, UserImg, UserName } from "./styled";

export const UserHistory = ({ email, username, userImg, width, height, imgSize, fontSize }) => {

    console.log(email)

return (
    <>
      <UserHistoryWrap width={width} height={height}>
            <UserImg imgSize={imgSize} src={userImg} />
            <UserName fontSize={fontSize}>{username}</UserName>
      </UserHistoryWrap>
    </>
  );
};
