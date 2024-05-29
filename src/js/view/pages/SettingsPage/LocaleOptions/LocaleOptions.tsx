import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { TextBodyLarge, TextBodyStandard } from "../../../elements";
import { LOCALES } from "../../../../common/constants";
import { LanguageIcon } from "../../../icons";
import { ListItemSelector } from "../../../components/ListItemSelector/ListItemSelector";

export const LocaleOptions = () => {
  const { t, i18n } = useTranslation();

  const { language } = i18n;

  const localesText = {
    [LOCALES.en]: "English",
    [LOCALES.ru]: "Русский",
    [LOCALES.cn]: "中文",
  };

  const locales = Object.keys(LOCALES) as LOCALES[];

  const changeLocale = useCallback(
    async (locale: keyof typeof LOCALES) => {
      document.documentElement.setAttribute("lang", locale);
      await i18n.changeLanguage(locale);
    },
    [i18n],
  );

  const content = (locale: LOCALES) => (
    <span className="inline-flex items-center gap-x-3">
      <LanguageIcon language={locale} />
      <TextBodyStandard className="text-dark-4">
        {localesText[locale]}
      </TextBodyStandard>
    </span>
  );

  return (
    <div className="flex flex-col gap-y-6">
      <TextBodyLarge fontWeight="semibold">{t("language")}</TextBodyLarge>

      <ul className="flex flex-col gap-y-2">
        {locales.map((locale) => (
          <li key={locale} className="px-3 bg-black-2 rounded-lg">
            <ListItemSelector
              content={content(locale)}
              value={locale === language}
              variant="radio"
              onClick={() => {
                void changeLocale(locale);
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
