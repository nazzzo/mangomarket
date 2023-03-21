import { useState } from "react";
import { InputStyled } from "./styled";
import { Icon } from "@iconify/react";

export const Input = ({ width, height, icon, type, className, ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isText, setIsText] = useState(false);

  return (
    <InputStyled
      width={width}
      height={height}
      className={`input-style ${isFocused ? "focused" : ""}`}
    >
      <input
        {...rest}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        type={isText && type === "password" ? "text" : type}
      />
      {type === "password" ? (
        <Icon
          icon={isText ? "mdi:eye" : "mdi:eye-off"}
          onClick={() => setIsText((prevState) => !prevState)}
          className="password-icon"
        />
      ) : (
        <Icon icon={icon} />
      )}
    </InputStyled>
  );
};
