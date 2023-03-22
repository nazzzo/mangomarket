// import { useStore } from "../store";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// export const useAutoLogout = () => {
//   const { state,dispatch } = useStore();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = document.cookie.split("=")[0];
//     if (state.isLogin && token !== "token") {
//       dispatch({ type: "LOGOUT" });
//       navigate("/");
//     }
//   }, [document.cookie]);
// };