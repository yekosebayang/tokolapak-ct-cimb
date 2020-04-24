import React from "react";
import "./Button.css";

type ButtonTypes = {
  type: "contained" | "outlined" | "textual";
  children: any;
  style?: object;
  className?: string;
};

const ButtonUI = (props: ButtonTypes) => {
  const { type, children, style, className } = props;

  return (
    <div style={style} className={`custom-btn custom-btn-${type} ${className}`}>
      {children}
    </div>
  );
};

export default ButtonUI;
