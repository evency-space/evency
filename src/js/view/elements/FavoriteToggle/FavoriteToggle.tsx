import React from "react";
import { useTranslation } from "react-i18next";
import { IFavoriteToggleProps } from "./FavoriteToggleProps";
import { ButtonSecondary } from "../buttons";
import { StarIcon } from "../../icons";
import { TextBodyStandard } from "../typography";

export const FavoriteToggle = (props: IFavoriteToggleProps) => {
  const { isFavorite = false, onClick } = props;

  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-x-2">
      <TextBodyStandard className="text-dark-4">
        {t("favoriteToggle.description")}
      </TextBodyStandard>
      <ButtonSecondary
        icon={
          <StarIcon
            size={24}
            fill="#8BFFC1"
            iconStyle={isFavorite ? "fill" : "outline"}
          />
        }
        onClick={onClick}
      />
    </div>
  );
};
