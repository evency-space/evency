import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { IBindListPointModal } from "./BindListPointModalProps";
import { ActionPanel } from "../../../ActionPanel/ActionPanel";
import { ModalTitle } from "../../Modal/ModalTitle/ModalTitle";
import { Counter } from "../../../Counter/Counter";
import { BindingProgressTags } from "../../../BindingProgressTags/BindingProgressTags";
import { TextBodyLarge } from "../../../typography";

export const BindListPointModal = (props: IBindListPointModal) => {
  const { listPoint, countItemTaken, onClick } = props;

  const { t } = useTranslation();

  const [countItem, setCountItem] = useState<number>(countItemTaken || 0);

  return (
    <>
      <ModalTitle title={t("i_take")} />

      <div className="flex justify-between">
        <TextBodyLarge className="text-light-4">
          {`${listPoint.item.name} (${t(
            `list_point.short_units.${listPoint.unit}`
          )})`}
        </TextBodyLarge>
        <BindingProgressTags
          progressCount={countItemTaken}
          totalCount={listPoint.count}
          unit={listPoint.unit}
        />
      </div>

      <Counter value={countItem} onChange={setCountItem} />

      <ActionPanel
        primaryButtonText={t("buttons.done")}
        onPrimaryButtonClick={() => onClick(countItem)}
      />
    </>
  );
};
