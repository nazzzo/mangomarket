import request from "../utils/request"

export const duplicateCheck = async (inputId) => {
    const check = document.querySelector(`#${inputId}Box .alertMessage`);
    const input = document.querySelector(`#${inputId}`);
    const response = await request.post("/users/usercheck", {
      [inputId]: input.value,
    });
    console.log(response.data);
    if (response.data !== null) {
      check.innerHTML = "이미 사용중입니다";
      check.style.color = "red";
    } else {
      check.innerHTML = "사용할 수 있습니다";
      check.style.color = "green";
    }
    check.style.opacity = 1;
    setTimeout(()=>{
    check.style.opacity = 0;
    }, 2000)
  };
  
  const config = {
    username: {
      reg: /^[A-Za-z가-힣0-9]{2,16}$/,
      callback: duplicateCheck,
    },
    userpw: {
      reg: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,16}$/,
      // callback: null,
    },
    phoneNumber: {
      reg: /^010[0-9]{8}$/,
      callback: duplicateCheck,
    },
    email: {
      reg: /^[A-Za-z0-9]+@[A-Za-z0-9.-_]{1,10}.[A-Za-z]{2,4}$/,
      callback: duplicateCheck,
    },
  };
  
//   for (const key in config) {
//     checkInput(key, config[key].reg, config[key].callback);
//   }
  
//   // 패스워드 재확인
//   document.querySelector("#pwcheck").addEventListener("keyup", () => {
//     const check = document.querySelector(".checkMessage")
//     if (
//       document.querySelector("#userpw").value !==
//       document.querySelector("#pwcheck").value
//       )
//       check.style.opacity = 1;
//     else {
//       check.innerHTML = "비밀번호가 일치합니다";
//       check.style.color = "green";
//       setTimeout(()=>{
//         check.style.opacity = 0;
//         }, 2000)
//       }
//   });