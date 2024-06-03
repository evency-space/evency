import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ActionPanel, Input, TitleH1 } from "../../elements";
import { CommonListPointViewOptions } from "./CommonListPointViewOptions/CommonListPointViewOptions";
import { LocaleOptions } from "./LocaleOptions/LocaleOptions";
import { PageWrapper } from "../../components";
import {
  getUserNameFromLocalStorage,
  saveUserNameInLocalStorage,
} from "../../../utils/localStorage";

export const SettingsPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const [username, setUsername] = useState(getUserNameFromLocalStorage() || "");

  const applySettings = () => {
    if (username) {
      saveUserNameInLocalStorage(username);
    }
    navigate(-1);
  };

  const pageMainContent = (
    <div className="flex flex-col w-full gap-y-8">
      <TitleH1>{t("pages.settings.title")}</TitleH1>
      <div>
        <Input
          label={t("member_name")}
          value={username}
          onChange={setUsername}
          placeholder={t("member_name_example")}
        />
      </div>
      <LocaleOptions />
      <CommonListPointViewOptions />
    </div>
  );

  const pageFooter = (
    <ActionPanel
      primaryButtonText={t("pages.settings.button")}
      primaryButtonType="submit"
      onPrimaryButtonClick={applySettings}
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
