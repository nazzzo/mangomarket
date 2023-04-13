import { useState } from "react"
import { TimerBtnStyled, SelectorStyled } from "./styled"
import Select from "react-select";


export const TimerBtn = ({ width, height, selectedTime, setSelectedTime }) => {

    const selectOptions = [
        { value: new Date(new Date().getTime() + (60 * 60 * 1000)).toISOString(), label: "1시간 후" },
        { value: new Date(new Date().getTime() + (60 * 60 * 3000)).toISOString(), label: "3시간 후" },
        { value: new Date(new Date().getTime() + (60 * 60 * 6000)).toISOString(), label: "6시간 후" },
        { value: 'unset', label: '시간 미정' },
    ]
    
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          fontSize: "0.9rem",
          boxShadow: state.isFocused ? "none" : "none", // 선택 효과 제거
        }),
        menu: (provided) => ({
            ...provided,
            position: 'absolute',
            top: 'unset',
            bottom: '100%',
            fontSize: "0.9rem",
            maxHeight: '200px',
            overflowY: 'scroll',
          }),
          menuList: (provided) => ({
            ...provided,
            paddingTop: 0,
            paddingBottom: 0,
          }),
        option: (provided, state) => ({
          ...provided,
          color: "#000000",
        }),
        indicatorSeparator: (provided, state) => ({
          ...provided,
          display: "none",
        }),
        placeholder: (provided, state) => ({
            ...provided,
            color: "#000000",
          }),
      };

    return (
      <TimerBtnStyled width={width} height={height} type="button">
        <SelectorStyled
            options={selectOptions}
            value={selectedTime}
            onChange={setSelectedTime}
            styles={customStyles}
            menuPosition="absolute"
            placeholder="약속시간 선택"
            width="100%"
        />
      </TimerBtnStyled>
    );
  };

