import { Icon } from "@iconify/react";
import { useSelector } from "react-redux";
import { InfoWrap, UserImg, UserName } from "./styled";

export const UserInfo = ({width, height, imgSize, fontSize}) => {
    const { isLoading, isError, isLogin, user } = useSelector((state) => state.user);
    
    return (
        <>
        <InfoWrap width={width} height={height}>
            <UserImg imgSize={imgSize} src={user.userImg}/>
            <UserName fontSize={fontSize}>{user.username}</UserName>
        </InfoWrap>
        </>
    )
}