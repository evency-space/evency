import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  Radio,
  TextBodyLarge,
  TextBodyStandard,
  TitleH1,
} from "../../elements";
import { LanguageIcon } from "../../icons";
import { LOCALES } from "../../../common/constants";

export const SettingsPage = () => {
  const { t, i18n } = useTranslation();

  const { language } = i18n;

  const localesText = {
    [LOCALES.en]: "English",
    [LOCALES.ru]: "Русский",
  };

  const locales = Object.keys(LOCALES) as LOCALES[];

  const changeLocale = useCallback(
    async (locale: keyof typeof LOCALES) => {
      document.documentElement.setAttribute("lang", locale);
      await i18n.changeLanguage(locale);
    },
    [i18n]
  );

  return (
    <div className="flex flex-col w-full gap-y-6">
      <TitleH1>{t("pages.settings.title")}</TitleH1>

      <TextBodyLarge fontWeight="semibold">{t("language")}</TextBodyLarge>

      <ul className="flex flex-col gap-y-2">
        {locales.map((locale) => (
          <li
            key={locale}
            className="flex justify-between p-3 bg-black-2 rounded-lg"
          >
            <span className="inline-flex items-center gap-x-3">
              <LanguageIcon language={locale} />
              <TextBodyStandard className="text-dark-4">
                {localesText[locale]}
              </TextBodyStandard>
            </span>
            <Radio
              name={locale}
              value={locale === language}
              onChange={() => {
                void changeLocale(locale);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
