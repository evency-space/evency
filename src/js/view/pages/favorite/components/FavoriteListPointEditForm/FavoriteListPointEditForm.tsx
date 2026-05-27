import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  IEditFavoriteListPoint,
  IFavoriteListPointEditFormProps,
} from "./FavoriteListPointEditFormProps";
import {
  LIST_POINT_CATEGORIES,
  LIST_POINT_UNITS,
} from "../../../../../interfaces";
import {
  Input,
  Select,
  TagsGroup,
  TextBodyStandard,
} from "../../../../elements";
import { TagsEditModal } from "../TagsEditModal/TagsEditModal";

export const FavoriteListPointEditForm = (
  props: IFavoriteListPointEditFormProps
) => {
  const { listPointData, onChange, onFullFill } = props;

  const { t } = useTranslation();

  const { name, unit, tag, userTags = [] } = listPointData;

  const checkFormFullFilled = () => !!name;

  const listPointCategories = Object.values(LIST_POINT_CATEGORIES);

  const listPointUnits = Object.values(LIST_POINT_UNITS);

  const changeItem = (value: Partial<IEditFavoriteListPoint>) => {
    onChange({
      ...listPointData,
      ...value,
    });
  };

  const changeUnits = (u: string) => {
    const selectedUnit = u as LIST_POINT_UNITS;

    changeItem({ unit: selectedUnit });
  };

  const changeUserTags = (tags: string[]) => {
    changeItem({ userTags: tags });
  };

  useEffect(() => {
    onFullFill(checkFormFullFilled());
  });

  return (
    <form className="flex flex-col gap-y-6">
      <div>
        <Input
          label={t("list_point.edit_form.item")}
          value={name}
          onChange={(value) => changeItem({ name: value })}
        />
      </div>
      <div>
        <TextBodyStandard className="block dark:text-dark-3 mb-2">
          {t("list_point.edit_form.category")}
        </TextBodyStandard>
        <TagsGroup
          tags={listPointCategories}
          activeTags={[tag]}
          localizationPath="list_point.categories"
          onClick={(tagName) => changeItem({ tag: tagName })}
        />
      </div>
      <Select
        label={t("list_point.edit_form.unit")}
        localizationPath="list_point.units"
        value={unit}
        options={listPointUnits}
        onChange={changeUnits}
      />
      <TagsEditModal selectedTags={userTags} onChange={changeUserTags} />
    </form>
  );
};
