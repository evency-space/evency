import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ICounterProps } from "./CounterProps";
import { ButtonSecondary } from "../buttons";
import { MinusIcon, PlusIcon } from "../../icons";
import { TextBodyStandard } from "../typography";
import { classesOf } from "../../../utils";

export const Counter = (props: ICounterProps) => {
  const {
    label,
    value,
    step = 1,
    size = "md",
    color = "gray",
    className,
    onChange,
  } = props;

  const id = "counter-input";
  const stepMoreValue = value - step < 0;
  const buttonIconSize = size === "sm" ? 12 : 24;

  const [localValue, setLocalValue] = useState<string>(String(value));

  const inputClasses = classesOf(
    "w-full text-center rounded-lg text-light-4 focus:outline-none",
    color === "gray" && "bg-dark-2",
    color === "green" && "bg-green-0"
  );

  const rootClasses = classesOf("flex flex-col gap-y-2", className);

  const counterClasses = classesOf(
    "flex w-full",
    size === "sm" && "gap-x-2 h-[40px]",
    size === "md" && "gap-x-3 h-[55px]"
  );

  const counterButtonClasses = classesOf(
    "h-auto min-h-[24px]",
    size === "sm" && "px-3",
    size === "md" && "px-4"
  );

  const minusCounterButtonClasses = classesOf(
    counterButtonClasses,
    stepMoreValue && "bg-black-2"
  );

  const changeInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { value: inputValue } = e.target;
    const reg = /^\d+[.,]?\d*$/;
    const res = reg.test(inputValue);

    if (res || !inputValue) {
      setLocalValue(inputValue.replace(",", "."));
    }
  };

  const incrementInputValue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLocalValue(String(Math.trunc(Number(localValue) * 10 + step * 10) / 10));
  };

  const decrementInputValue = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!stepMoreValue) {
      setLocalValue(
        String(Math.trunc(Number(localValue) * 10 - step * 10) / 10)
      );
    }
  };

  useEffect(() => {
    if (value !== +localValue) {
      onChange(Number(localValue));
    }
  }, [localValue]);

  useEffect(() => {
    setLocalValue(String(value));
  }, [value]);

  return (
    <div className={rootClasses}>
      {label && (
        <label htmlFor={id}>
          <TextBodyStandard className="dark:text-dark-3">
            {label}
          </TextBodyStandard>
        </label>
      )}

      <div className={counterClasses}>
        <ButtonSecondary
          className={minusCounterButtonClasses}
          icon={<MinusIcon size={buttonIconSize} />}
          disabled={stepMoreValue}
          onClick={decrementInputValue}
        />
        <input
          id={id}
          inputMode="numeric"
          className={inputClasses}
          value={localValue}
          type="text"
          onChange={changeInputValue}
        />
        <ButtonSecondary
          className={counterButtonClasses}
          icon={<PlusIcon size={buttonIconSize} />}
          onClick={incrementInputValue}
        />
      </div>
    </div>
  );
};
