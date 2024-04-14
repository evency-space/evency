import React from "react";
import { SVGprops } from "../../interfaces";

export const CheckMarkIcon = (props: SVGprops) => {
  const { size } = props;
  return (
    <svg
      width={size.toString()}
      height={size.toString()}
      viewBox="0 0 12 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M1 4.42857L5.07407 9L11 1" stroke="white" strokeWidth="1.5" />
    </svg>
  );
};
