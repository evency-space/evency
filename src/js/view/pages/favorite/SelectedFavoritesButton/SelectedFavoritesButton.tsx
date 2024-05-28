import React from "react";
import { useTranslation } from "react-i18next";
import { ISelectedFavoritesButtonProps } from "./SelectedFavoritesButtonProps";
import { ActionPanel } from "../../../elements";

export const SelectedFavoritesButton = (
  props: ISelectedFavoritesButtonProps,
) => {
  const { count = 0, onClick } = props;

  const { t } = useTranslation();

  const counterText = count > 0 ? `(${count})` : "";
  const buttonText = `${t("add_items")} ${counterText}`;

  return (
    <ActionPanel
      primaryButtonDisabled={count === 0}
      primaryButtonText={buttonText}
      onPrimaryButtonClick={onClick}
    />
  );
};
