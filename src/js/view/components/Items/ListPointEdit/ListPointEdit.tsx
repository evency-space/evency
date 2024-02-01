import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { IListPointEditProps } from "./ListPointEditProps";
import { PageWrapper } from "../../PageWrapper/PageWrapper";

import { ActionPanel, ListPointEditForm, TitleH1 } from "../../../elements";
import { IEditListPoint } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

export const ListPointEdit = (props: IListPointEditProps) => {
  const { listPoint, isCreationMode, onClick } = props;

  const { t } = useTranslation();

  const [localListPoint, setLocalListPoint] =
    useState<IEditListPoint>(listPoint);

  const [disabledPrimaryButton, setDisabledPrimaryButton] = useState(true);

  const changeLocalListPoint = (updatedListPoint: IEditListPoint) => {
    setLocalListPoint(updatedListPoint);
  };

  const pageMainContent = (
    <div className="flex flex-col gap-y-3">
      <TitleH1>
        {isCreationMode ? t("list_point.add_item") : t("list_point.edit_item")}
      </TitleH1>
      <ListPointEditForm
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
