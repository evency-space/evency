import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ActionPanel, TitleH1 } from "../../elements";
import { CommonListPointViewOptions } from "./CommonListPointViewOptions/CommonListPointViewOptions";
import { LocaleOptions } from "./LocaleOptions/LocaleOptions";
import { PageWrapper } from "../../components";

export const SettingsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const pageMainContent = (
    <div className="flex flex-col w-full gap-y-8">
      <TitleH1>{t("pages.settings.title")}</TitleH1>
      <LocaleOptions />
      <CommonListPointViewOptions />
    </div>
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={t("pages.settings.button")}
      primaryButtonType="submit"
      onPrimaryButtonClick={() => navigate(-1)}
    />
  );

  return (
    <PageWrapper
      pageContent={pageMainContent}
      pageFooter={pageFooter}
      className="h-full"
      verticalTopPageContent
    />
  );
};
