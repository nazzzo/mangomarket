import { CheckMarkerStyled } from "./styled"
import { useState, useEffect } from "react";


export const CheckMarker  = ({ color, size }) => {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
      setTimeout(() => {
        setIsActive(true);
      }, 1000);
    }, []);

    return (
        <>
            <CheckMarkerStyled size={size} color={color} className={isActive? "on" : " "} />
        </>
      );
}