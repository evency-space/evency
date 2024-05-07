import React from "react";
import { ICheckboxProps } from "./CheckboxProps";
import { classesOf } from "../../../../utils";

export const Checkbox = (props: ICheckboxProps) => {
  const { label, value, className, onChange } = props;

  const labelClasses = classesOf("flex gap-x-3 cursor-pointer", className);

  return (
    <label className={labelClasses}>
      <input
        type="checkbox"
        className="checkbox checkbox-primary rounded"
        checked={value}
        onChange={onChange}
      />
      {label}
    </label>
  );
};
