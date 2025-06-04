import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { TextBodyLarge, TextBodyStandard } from "../../../elements";
import {
  TCommonListPointViewMode,
  getCommonListPointViewMode,
  switchCommonListPointViewMode,
} from "../../../../utils/localStorage";
import { ListItemSelector } from "../../../components/ListItemSelector/ListItemSelector";

export const CommonListPointViewOptions = () => {
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState<TCommonListPointViewMode>(
    getCommonListPointViewMode() || "twoLines"
  );

  const changeCommonListPointViewMode = (mode: TCommonListPointViewMode) => {
    switchCommonListPointViewMode(mode);
    setViewMode(mode);
  };

  const viewModes: TCommonListPointViewMode[] = ["oneLine", "twoLines"];

  const content = (mode: TCommonListPointViewMode) => (
    <TextBodyStandard className="text-dark-4">
      {t(`pages.settings.commonListPointViewOptions.${mode}`)}
    </TextBodyStandard>
  );

  return (
    <div className="flex flex-col gap-y-6">
      <TextBodyLarge fontWeight="semibold">
        {t("pages.settings.commonListPointViewOptions.title")}
      </TextBodyLarge>

      <ul className="flex flex-col gap-y-2">
        {viewModes.map((mode) => (
          <li key={mode} className="px-3 bg-black-2 rounded-lg">
            <ListItemSelector
              content={content(mode)}
              variant="radio"
              value={mode === viewMode}
              onClick={() => changeCommonListPointViewMode(mode)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
