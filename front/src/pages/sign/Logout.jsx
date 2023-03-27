import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogout } from "../../store/user";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(userLogout());
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    navigate("/");
  }, [dispatch, navigate]);
};
