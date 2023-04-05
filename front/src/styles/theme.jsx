import { ThemeProvider } from "styled-components";

export const GlobalTheme = ({ children }) => {
  const colorChip = {
    blue: {
      color: "#0069d9",
      hover: "#007bff",
      active: "#005cbf",
    },
    red: {
      color: "#d51f31",
      hover: "#dc3545",
      active: "#a71d2a",
    },
    green: {
      color: "#28a745",
      hover: "#218838",
      active: "#1e7e34",
    },
    yellow: {
      color: "#f3ad22",
      hover: "#ffc822",
      active: "#c69500",
    },
    beige: {
      color: "#eed8ae",
      hover: "#f5deb3",
      active: "#d7cda0",
    },
    pink: {
      color: "#d6336c",
      hover: "#e64980",
      active: "#ba265d",
    },
    purple: {
      color: "#8257e5",
      hover: "#9b4dca",
      active: "#6c40bb",
    },
    grey: {
      color: "#8b8b8b",
      hover: "#cbcbcb",
      active: "#4f4f4f",
    },
    header: {
      color: "#ececec"
    }
  };
  
    return (
        <ThemeProvider theme={colorChip}>{children}</ThemeProvider>
    );
  };
  
  