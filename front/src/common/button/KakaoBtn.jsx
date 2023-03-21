import axios from "axios";

export const KakaoBtn = ({ onClick }) => {

    const handleKakaoLogin = async () => {

        const KKO_HOST = `https://kauth.kakao.com`;
        const REST_API_KEY = `1fe7ae4bf45bdf9bd6fc758bd63e9e0f`;
        const REDIRECT_URI = `http://localhost:3005/auths/kakao`;
        const CLIENT_SERCRET = `1NLiTnJ7OOm09XyI4PrGAgIPwKispRor`;
        const redirectURI = `${KKO_HOST}/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
        window.location.href = redirectURI;
      };

    return (
      <div onClick={handleKakaoLogin}>
        <img src="https://i.ibb.co/bQJJ1jH/kakao-login-medium-wide.png" alt="" />
      </div>
    );
  };