import request from "../../utils/request"
import { } from "./styled"


export const validCheck = (input, setIsValid) => {
    const inputId = input.id
    const config = {
      username: /^[A-Za-z가-힣0-9]{2,16}$/,
      userpw: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
      phoneNumber:/^010[0-9]{8}$/,
      email: /^[A-Za-z0-9]+@[A-Za-z0-9.-_]{1,10}.[A-Za-z]{2,4}$/,
    };
    for (const key in config) {
      if (inputId === key) {
        // console.log(key, config[key].test(input.value));
        config[key].test(input.value) ? setIsValid(true) : setIsValid(false);
      }
    }
  }

export const duplicateCheck = async (input, setIsDuplicated) => {
    const inputId = input.id
    const response = await request.post("/users/usercheck", {
      [`${inputId}`]: input.value,
    });
    console.log(response.data)
    response.data !== null ? setIsDuplicated(true) : setIsDuplicated(false)
}

export const passwordCheck = ({userpw, pwcheck, setIsValid}) => {
    userpw === pwcheck ?  setIsValid(true) : setIsValid(false);
}


export const InputCheck = ({id, isFocused, isValid, isDuplicated, duplicated, enable, invalid }) => {
    return id === isFocused 
    ? (isValid? <span>{isDuplicated 
        ? duplicated : enable }</span> 
        : <span>{invalid}</span>) 
    : <></>
}

