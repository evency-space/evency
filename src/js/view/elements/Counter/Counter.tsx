import React, { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { ICounterProps } from "./CounterProps";
import { ButtonSecondary } from "../buttons";
import { MinusIcon, PlusIcon } from "../../icons";
import { TextBodyStandard } from "../typography";

export const Counter = (props: ICounterProps) => {
  const { label, value, step = 1, onChange } = props;

  const id = "counter-input";
  const stepMoreValue = value - step <= 0;

  const [localValue, setLocalValue] = useState<string>(String(value));

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
    onChange(Number(localValue));
  }, [localValue, onChange]);

  return (
    <>
      {label && (
        <label htmlFor={id}>
          <TextBodyStandard className="dark:text-dark-3">
            {label}
          </TextBodyStandard>
        </label>
      )}

      <div className="flex h-[55px] w-full gap-x-3">
        <ButtonSecondary
          className="h-full"
          icon={<MinusIcon size={24} />}
          disabled={stepMoreValue}
          onClick={decrementInputValue}
        />
        <input
          id={id}
          inputMode="numeric"
          className="w-full text-center rounded-lg bg-dark-2 text-light-4 focus:outline-none"
          value={localValue}
          type="text"
          onChange={changeInputValue}
        />
        <ButtonSecondary
          className="h-full"
          icon={<PlusIcon size={24} />}
          onClick={incrementInputValue}
        />
      </div>
    </>
  );
};
