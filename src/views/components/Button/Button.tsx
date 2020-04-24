import React from "react";
import "./Button.css";

type ButtonTypes = {
  type: "contained" | "outlined" | "textual";
  children: any;
};

const ButtonUI = (props: ButtonTypes) => {
  const { type, children } = props;

  return <div className={`custom-btn custom-btn-${type}`}>{children}</div>;
};

export default ButtonUI;
