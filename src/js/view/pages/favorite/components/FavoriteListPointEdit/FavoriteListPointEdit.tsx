import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IFavoriteListPointEditProps } from "./FavoriteListPointEditProps";

import { PageWrapper } from "../../../../components";
import { ActionPanel, TitleH1 } from "../../../../elements";
import { IEditFavoriteListPoint } from "../FavoriteListPointEditForm/FavoriteListPointEditFormProps";
import { FavoriteListPointEditForm } from "../FavoriteListPointEditForm/FavoriteListPointEditForm";
import { IEditListPoint } from "../../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

export const FavoriteListPointEdit = (props: IFavoriteListPointEditProps) => {
  const { listPoint, isCreationMode, onClick } = props;

  const { t } = useTranslation();

  const [localListPoint, setLocalListPoint] =
    useState<IEditListPoint>(listPoint);

  const [disabledPrimaryButton, setDisabledPrimaryButton] = useState(true);

  const changeLocalListPoint = (updatedListPoint: IEditFavoriteListPoint) => {
    setLocalListPoint(updatedListPoint);
  };

  const pageMainContent = (
    <div className="flex flex-col gap-y-6 pb-6">
      <TitleH1>
        {isCreationMode ? t("list_point.add_item") : t("list_point.edit_item")}
      </TitleH1>
      <FavoriteListPointEditForm
        listPointData={localListPoint}
        onChange={changeLocalListPoint}
        onFullFill={(filled) => setDisabledPrimaryButton(!filled)}
      />
    </div>
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={
        isCreationMode ? t("list_point.add_item") : t("buttons.done")
      }
      onPrimaryButtonClick={() => onClick(localListPoint)}
      primaryButtonDisabled={disabledPrimaryButton}
    />
  );

  useEffect(() => {
    if (listPoint) {
      setLocalListPoint(listPoint);
    }
  }, [listPoint]);

  return (
    <PageWrapper
      pageContent={pageMainContent}
      pageFooter={pageFooter}
      verticalTopPageContent
    />
  );
};
