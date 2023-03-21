import { ThemeProvider } from "styled-components";

export const GlobalTheme = ({ children }) => {
  const colorChip = {
    blue: {
      color: "#0069d9",
      hover: "#007bff",
      active: "#005cbf",
    },
    red: {
      color: "#c82333",
      hover: "#dc3545",
      active: "#a71d2a",
    },
    green: {
      color: "#218838",
      hover: "#28a745",
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
    gray: {
      color: "#5a5c69",
      hover: "#6c757d",
      active: "#484a55",
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
    }
  };
  
    return (
        <ThemeProvider theme={colorChip}>{children}</ThemeProvider>
    );
  };
  
  