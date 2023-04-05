import Select from "react-select";
import { SelectStyled } from "./styled";

export const Selector = ({ options, selectedOption, setSelectedOption, width }) => {

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
      fontSize: "0.9rem",
      boxShadow: state.isFocused ? "none" : provided.boxShadow
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#FFFFFF",
      borderColor: "#CCCCCC",
      fontSize: "0.9rem",
    }),
    option: (provided, state) => ({
      ...provided,
    }),
    indicatorSeparator: (provided, state) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <SelectStyled
      options={options}
      value={selectedOption}
      onChange={setSelectedOption}
      styles={customStyles}
      width={width}
    />
  );
};
