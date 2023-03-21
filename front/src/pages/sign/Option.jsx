import { useNavigate } from "react-router-dom";
import { SigninOptionStyled } from "./styled";
import { CheckBox } from "../../common/checkbox"
import { useDispatch, useSelector } from "react-redux";

export const SigninOption = ({ width, height, fontSize }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

  return (
    <SigninOptionStyled width={width} height={height} fontSize={fontSize}>
      <ul>
        <li><CheckBox color="blue" size="0.95rem" id="check" text="Remember Me" /></li>
        <li>비밀번호 찾기</li>
      </ul>
      <p>아직 회원이 아니신가요? <a onClick={()=>{navigate("/signup")}}>회원가입</a></p>
    </SigninOptionStyled>
  );
};
