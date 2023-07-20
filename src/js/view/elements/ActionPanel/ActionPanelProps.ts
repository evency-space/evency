import React from "react";

enum ButtonType {
  "button",
  "submit",
  "reset",
}

export interface IContentWrapperProps {
  sticky?: boolean;
  primaryButtonText: string;
  primaryButtonIcon?: React.ReactNode;
  primaryButtonType?: keyof typeof ButtonType;
  primaryButtonDisabled?: boolean;
  onPrimaryButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  secondaryButtonText?: string;
  secondaryButtonIcon?: React.ReactNode;
  onSecondaryButtonClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}
