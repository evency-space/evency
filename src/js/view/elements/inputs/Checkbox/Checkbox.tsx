import React from "react";
import { ICheckboxProps } from "./CheckboxProps";

export const Checkbox = (props: ICheckboxProps) => {
  const { label, value, onChange } = props;
  return (
    <label className="flex gap-x-3 cursor-pointer">
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
