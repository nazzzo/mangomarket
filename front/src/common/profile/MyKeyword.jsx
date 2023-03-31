import { useState, useCallback } from "react";
import { Input } from "../input";
import { useInput } from "../../hooks";
import { MyKeywordWrap } from "./styled";

export const MyKeyword = ({ height, children }) => {
    return <MyKeywordWrap height={height}>{children}</MyKeywordWrap>;
  };
  