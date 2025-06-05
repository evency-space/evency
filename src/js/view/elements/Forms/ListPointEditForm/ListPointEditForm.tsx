import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  IEditListPoint,
  IListPointEditFormProps,
  LIST_POINT_UNITS_STEP,
} from "./ListPointEditFormProps";
import {
  LIST_POINT_CATEGORIES,
  LIST_POINT_UNITS,
} from "../../../../interfaces";

import { Input, Checkbox } from "../../inputs";
import { Select } from "../../Select/Select";
import { TagsGroup } from "../../TagsGroup/TagsGroup";
import { TextBodyLarge, TextBodyStandard } from "../../typography";
import { Counter } from "../../Counter/Counter";

export const ListPointEditForm = (props: IListPointEditFormProps) => {
  const { listPointData, isCreationMode, onChange, onFullFill } = props;

  const { t } = useTranslation();

  const { name, unit, tag, count } = listPointData;

  const [countStep, setCountStep] = useState<number>(
    LIST_POINT_UNITS_STEP[unit]
  );

  const countIsNumber = typeof count === "number";

  const checkFormFullFilled = () => !!name && (!countIsNumber || !!count);

  const listPointCategories = Object.values(LIST_POINT_CATEGORIES);

  const listPointUnits = Object.values(LIST_POINT_UNITS);

  const activeTagIndex = listPointCategories.findIndex(
    (category) => category === tag
  );

  const changeItem = (value: Partial<IEditListPoint>) => {
    onChange({
      ...listPointData,
      ...value,
    });
  };

  const changeUnits = (u: string) => {
    const selectedUnit = u as LIST_POINT_UNITS;

    setCountStep(LIST_POINT_UNITS_STEP[unit]);
    changeItem({ unit: selectedUnit });
  };

  useEffect(() => {
    onFullFill(checkFormFullFilled());
  });

  return (
    <form className="flex flex-col gap-y-6">
      <div>
        <TextBodyStandard className="block dark:text-dark-3 mb-2">
          {t("list_point.edit_form.category")}
        </TextBodyStandard>
        <TagsGroup
          tags={listPointCategories}
          activeTagIndex={activeTagIndex}
          localizationPath="list_point.categories"
          onClick={(value) => changeItem({ tag: listPointCategories[value] })}
        />
      </div>
      <div>
        <Input
          label={t("list_point.edit_form.item")}
          value={name}
          onChange={(value) => changeItem({ name: value })}
        />
      </div>
      <Select
        label={t("list_point.edit_form.unit")}
        localizationPath="list_point.units"
        value={unit}
        options={listPointUnits}
        onChange={changeUnits}
      />
      {countIsNumber && (
        <Counter
          label={t("list_point.edit_form.count")}
          value={count}
          step={countStep}
          onChange={(value) => changeItem({ count: value })}
        />
      )}
      {isCreationMode && listPointData.pointType === "common" && (
        <Checkbox
          className="flex-row-reverse justify-between items-center"
          label={
            <TextBodyLarge className="text-light-4">
              {t("list_point.edit_form.take_it")}
            </TextBodyLarge>
          }
          value={listPointData.takeIt || false}
          onChange={() => changeItem({ takeIt: !listPointData.takeIt })}
        />
      )}
    </form>
  );
};
