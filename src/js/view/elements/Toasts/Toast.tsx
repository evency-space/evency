import React from "react";
import { IToastProps } from "./ToastProps";
import { TextBodyLarge } from "../typography";
import { CheckMarkIcon, CloseIcon } from "../../icons";

export const Toast = (props: IToastProps) => {
  const { text } = props;

  return (
    <div className="msg-container flex gap-x-4 p-5 pr-7 bg-black-2 border border-green-1 rounded-2xl relative">
      <div className="flex shrink-0 items-center justify-center h-6 w-6 bg-green-0 rounded-full">
        <CheckMarkIcon size={10} />
      </div>
      <TextBodyLarge className="text-light-4">{text}</TextBodyLarge>
      <div className="flex shrink-0 absolute right-3 top-3 cursor-pointer">
        <CloseIcon size={16} color="#fff" />
      </div>
    </div>
  );
};
