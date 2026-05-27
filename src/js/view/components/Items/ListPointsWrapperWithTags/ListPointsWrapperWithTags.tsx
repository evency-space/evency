import React from "react";
import { useTranslation } from "react-i18next";
import { IListPointsWrapperWithTagsProps } from "./ListPointsWrapperWithTagsProps";
import { PageWrapper } from "../../PageWrapper/PageWrapper";
import { ActionPanel } from "../../../elements";
import { useLoading } from "../../../../hooks";
import { ListPointsWithTags } from "../ListPointsWithTags/ListPointsWithTags";

export const ListPointsWrapperWithTags = (
  props: IListPointsWrapperWithTagsProps
) => {
  const { listPoints, getListPointData, onCreateListPoint, title, tags } =
    props;

  const { t } = useTranslation();

  const { loading } = useLoading();

  const pageMainContent = !loading ? (
    <ListPointsWithTags
      listPoints={listPoints}
      title={title}
      tags={tags}
      getListPointData={getListPointData}
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
      pageFooter={pageFooter}
      verticalTopPageContent
    />
  );
};
