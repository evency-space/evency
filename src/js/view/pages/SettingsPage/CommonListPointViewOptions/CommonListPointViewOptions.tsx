import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Radio, TextBodyLarge, TextBodyStandard } from "../../../elements";
import {
  TCommonListPointViewMode,
  getCommonListPointViewMode,
  switchCommonListPointViewMode,
} from "../../../../utils/localStorage";

export const CommonListPointViewOptions = () => {
  const { t } = useTranslation();

  const [viewMode, setViewMode] = useState<TCommonListPointViewMode>(
    getCommonListPointViewMode() || "oneLine",
  );

  const changeCommonListPointViewMode = (mode: TCommonListPointViewMode) => {
    switchCommonListPointViewMode(mode);
    setViewMode(mode);
  };

  const viewModes: TCommonListPointViewMode[] = ["oneLine", "twoLines"];

  return (
    <div className="flex flex-col gap-y-6">
      <TextBodyLarge fontWeight="semibold">
        {t("pages.settings.commonListPointViewOptions.title")}
      </TextBodyLarge>

      <ul className="flex flex-col gap-y-2">
        {viewModes.map((mode) => (
          <li
            key={mode}
            className="flex justify-between p-3 bg-black-2 rounded-lg"
          >
            <span className="inline-flex items-center gap-x-3">
              <TextBodyStandard className="text-dark-4">
                {t(`pages.settings.commonListPointViewOptions.${mode}`)}
              </TextBodyStandard>
            </span>
            <Radio
              name={mode}
              value={mode === viewMode}
              onChange={() => changeCommonListPointViewMode(mode)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};
