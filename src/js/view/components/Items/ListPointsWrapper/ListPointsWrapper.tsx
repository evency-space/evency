import React from "react";
import { useTranslation } from "react-i18next";
import { IListPointsWrapperProps } from "./ListPointsWrapperProps";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { ActionPanel } from "../../../elements";
import { useLoading } from "../../../../hooks";
import { ListPoints } from "../ListPoints/ListPoints";

export const ListPointsWrapper = (props: IListPointsWrapperProps) => {
  const {
    listPoints,
    getListPointData,
    customActionPanel,
    onCreateListPoint,
    title,
    disableCategoryAddButton = false,
  } = props;

  const { t } = useTranslation();

  const { loading } = useLoading();

  const pageMainContent = !loading ? (
    <ListPoints
      listPoints={listPoints}
      title={title}
      getListPointData={getListPointData}
      disableCategoryAddButton={disableCategoryAddButton}
      onCreateListPoint={onCreateListPoint}
    />
  ) : (
    <div />
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={t("list_point.add_item")}
      onPrimaryButtonClick={() => onCreateListPoint?.()}
    />
  );

  return (
    <PageWrapper
      pageContent={pageMainContent}
      pageFooter={customActionPanel || pageFooter}
      verticalTopPageContent
    />
  );
};
