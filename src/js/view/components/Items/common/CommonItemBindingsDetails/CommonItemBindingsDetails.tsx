import React from "react";
import { useTranslation } from "react-i18next";
import { ICommonItemBindingsDetailsProps } from "./CommonItemBindingsDetailsProps";
import {
  BindingProgressTags,
  ButtonTransparent,
  TagMe,
  TagSmall,
  TextBodyLarge,
  TextBodyStandard,
} from "../../../../elements";
import { ArrowIcon } from "../../../../icons";
import { IListPointBinding } from "../../../../../interfaces";

export const CommonItemBindingsDetails = (
  props: ICommonItemBindingsDetailsProps
) => {
  const { bindingsDetails, accessIds, count, unit, onHide } = props;

  const { t } = useTranslation();

  const { memberUid } = accessIds;

  const getBindingsProgress = () => {
    let progress = 0;

    bindingsDetails.forEach((binding) => {
      progress += binding.count;
    });

    return progress;
  };

  const bindingsProgress = getBindingsProgress();

  const listPointBindingsCount = ({
    bindingCount,
  }: {
    bindingCount: IListPointBinding["count"];
  }) => (
    <TagSmall isButton={false} className="w-max">{`${bindingCount} ${t(
      `list_point.short_units.${unit}`
    )}`}</TagSmall>
  );

  const listPointBindingProgress = (
    <BindingProgressTags
      progressCount={bindingsProgress}
      totalCount={count}
      unit={unit}
    />
  );

  return bindingsDetails.length > 0 ? (
    <div className="collapse collapse-open">
      <div className="collapse-content flex flex-col justify-center gap-y-3 px-0 duration-200">
        <div className="flex justify-between pt-1">
          <TextBodyStandard>Разобрано</TextBodyStandard>
          {listPointBindingProgress}
        </div>

        <TextBodyStandard>Кто взял</TextBodyStandard>

        <ul className="flex flex-col gap-y-3">
          {bindingsDetails.map((binding) => (
            <li className="flex justify-between" key={binding.member.name}>
              <div className="flex items-center gap-x-2">
                <TextBodyLarge className="font-semibold text-light-4">
                  {binding.member.name}
                </TextBodyLarge>
                {binding.member.memberUid === memberUid && <TagMe />}
              </div>

              {listPointBindingsCount({
                bindingCount: binding.count,
              })}
            </li>
          ))}
        </ul>

        <ButtonTransparent
          className="btn-sm"
          icon={<ArrowIcon size={16} direction="up" />}
          onClick={onHide}
        >
          {t("hide")}
        </ButtonTransparent>
      </div>
    </div>
  ) : (
    <div />
  );
};
