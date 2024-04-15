import React from "react";
import { useTranslation } from "react-i18next";
import { ITargetListTypeSelectorProps } from "./TargetListTypeSelectorProps";
import { TARGET_LISTS_TYPES } from "../constants";
import { Radio } from "../../../../elements";
import { LIST_POINT_TYPES } from "../../../../../common/constants";

export const TargetListTypeSelector = (props: ITargetListTypeSelectorProps) => {
  const { selectedList = LIST_POINT_TYPES.private, selectList } = props;

  const { t } = useTranslation();

  return (
    <ul className="flex flex-col gap-y-2">
      {TARGET_LISTS_TYPES.map((listType) => (
        <li key={listType} className="bg-black-2 rounded-lg">
          <Radio
            labelClassName="flex-row-reverse justify-between p-3"
            label={t(`list_point_types.${listType as string}`)}
            value={selectedList === listType}
            onChange={() => selectList(listType)}
          />
        </li>
      ))}
    </ul>
  );
};
