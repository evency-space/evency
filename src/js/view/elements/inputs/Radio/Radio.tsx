import React from "react";
import { IRadioProps } from "./RadioProps";
import { classesOf } from "../../../../utils";

export const Radio = (props: IRadioProps) => {
  const { label, name, value, labelClassName, onChange } = props;

  const radioClasses = classesOf(
    "radio radio-primary border-dark-2 transition-[background_box-shadow_0.2s_ease-in-out]",
    "checked:animate-[box-shadow-inset-pulse_0.2s_ease-in-out] checked:shadow-[inset_0_0_0_4px] checked:shadow-black-0 checked:bg-green-1 checked:border-green-1"
  );

  const labelClasses = classesOf("flex gap-x-3 cursor-pointer", labelClassName);

  return (
    <label className={labelClasses}>
      <input
        type="radio"
        name={name}
        className={radioClasses}
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
