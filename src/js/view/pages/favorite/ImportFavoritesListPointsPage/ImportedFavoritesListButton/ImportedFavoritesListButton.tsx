import React from "react";
import { useTranslation } from "react-i18next";
import { IImportedFavoritesListButtonProps } from "./ImportedFavoritesListButtonProps";
import { ActionPanel } from "../../../../elements";

export const ImportedFavoritesListButton = (
  props: IImportedFavoritesListButtonProps,
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
