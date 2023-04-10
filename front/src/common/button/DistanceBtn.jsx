import { useState } from "react"
import { DistanceBtnStyled, SelectStyled } from "./styled"
import Select from "react-select";


export const DistanceBtn = ({ width, height, selectedDistance, setSelectedDistance }) => {

    const selectOptions = [
        { value: '2.5', label: '2.5km' },
        { value: '5', label: '5km' },
        { value: '10', label: '10km' },
    ]
    
    const customStyles = {
        control: (provided, state) => ({
          ...provided,
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
          fontSize: "0.9rem",
          boxShadow: state.isFocused ? "none" : "none", // 선택 효과 제거
        }),
        menu: (provided, state) => ({
          ...provided,
          fontSize: "0.9rem",
          border: "none",
        }),
        option: (provided, state) => ({
          ...provided,
          backgroundColor: state.isSelected ? "#f2a93b" : "transparent",
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
      <DistanceBtnStyled width={width} height={height}>
        <SelectStyled
            options={selectOptions}
            value={selectedDistance}
            onChange={setSelectedDistance}
            styles={customStyles}
            placeholder="거리 선택"
        />
      </DistanceBtnStyled>
    );
  };

