import { WriterInfoWrap, UserImg, UserName } from "./styled";

export const WriterInfo = ({ username, userImg, width, height, imgSize, fontSize }) => {

return (
    <>
      <WriterInfoWrap width={width} height={height}>
            <UserImg imgSize={imgSize} src={userImg} />
            <UserName fontSize={fontSize}>{username}</UserName>
      </WriterInfoWrap>
    </>
  );
};
