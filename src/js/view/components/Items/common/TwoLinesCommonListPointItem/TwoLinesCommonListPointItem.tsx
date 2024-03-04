import React, { useCallback, useState } from "react";
import { debounce } from "underscore";
import { ITwoLinesCommonListPointItem } from "./TwoLinesCommonListPointItemProps";
import { ArrowIcon, LoaderIcon } from "../../../../icons";
import { classesOf } from "../../../../../utils";
import { IListPointBinding } from "../../../../../interfaces";
import { TwoLinesListPointItem } from "../../TwoLinesListPointItem/TwoLinesListPointItem";
import { CommonListPointsUtils } from "../utils";
import {
  changeCommonListPointBindStatus,
  getMemberBindings,
} from "../../../../../api_clients";
import { CommonItemBindingsDetails } from "../CommonItemBindingsDetails/CommonItemBindingsDetails";

export const TwoLinesCommonListPointItem = (
  props: ITwoLinesCommonListPointItem
) => {
  const { listPoint, accessIds, updateListPoint } = props;

  const [itemLoading, setItemLoading] = useState<boolean>(false);

  const [bindingsDetails, setBindingsDetails] = useState<IListPointBinding[]>(
    []
  );

  const { memberUid, eventUid } = accessIds;

  const commonListPointsUtils = CommonListPointsUtils({ accessIds });

  const getBindingsProgress = useCallback(
    () =>
      commonListPointsUtils.getBindingsProgress({
        bindings: listPoint.bindings,
        memberUid,
      }),
    [commonListPointsUtils, listPoint, memberUid]
  );

  const bindingsProgress = getBindingsProgress();

  const [memberCountItemTaken, setMemberCountItemTaken] = useState(
    bindingsProgress.selectedMember
  );

  const showBindingsDetails = bindingsDetails.length > 0;

  const hideAdditionalContent = () => setBindingsDetails([]);

  const getBindingsDetails = useCallback(async () => {
    try {
      setItemLoading(true);

      const result = await getMemberBindings({
        eventUid,
        pointUid: listPoint.pointUid,
      });

      setBindingsDetails(result);
    } finally {
      setItemLoading(false);
    }
  }, [eventUid, listPoint]);

  const itemClasses = classesOf(
    "transition duration-150 ease-out",
    itemLoading && "opacity-30 pointer-events-none"
  );

  const prependContent = (
    <div className="pt-[5px] cursor-pointer">
      <ArrowIcon size={12} direction={showBindingsDetails ? "down" : "right"} />
    </div>
  );

  const bindingsDetailsContent = (
    <CommonItemBindingsDetails
      bindingsDetails={bindingsDetails}
      accessIds={accessIds}
      count={listPoint.count}
      unit={listPoint.unit}
      onHide={hideAdditionalContent}
    />
  );

  const bindListPoint = async ({ count }: { count: number }) => {
    try {
      setItemLoading(true);

      const payload = {
        ...accessIds,
        pointUid: listPoint.pointUid,
        count,
      };

      const updatedListPoint = await changeCommonListPointBindStatus(payload);

      updateListPoint(updatedListPoint);

      if (showBindingsDetails) {
        await getBindingsDetails();
      }
    } finally {
      setItemLoading(false);
    }
  };

  const handleBlockedListPoint = () => {
    commonListPointsUtils.showBlockedListPointModal();
    setMemberCountItemTaken(bindingsProgress.selectedMember);
  };

  const checkListPointAvailability = debounce((count: number) => {
    setMemberCountItemTaken(count);

    void commonListPointsUtils
      .checkListPointAvailability({
        pointUid: listPoint.pointUid,
      })
      .then(() => bindListPoint({ count }))
      .catch(handleBlockedListPoint);
  }, 500);

  const toggleAdditionalContent = async () => {
    if (showBindingsDetails) {
      hideAdditionalContent();
    } else {
      await getBindingsDetails();
    }
  };

  return (
    <div className="relative">
      <TwoLinesListPointItem
        className={itemClasses}
        unit={listPoint.unit}
        count={listPoint.count}
        countItemTaken={bindingsProgress.all}
        memberCountItemTaken={memberCountItemTaken}
        listPointName={listPoint.item.name}
        prependContent={prependContent}
        isButton
        additionalContent={bindingsDetailsContent}
        onClickTitle={() => {
          void toggleAdditionalContent();
        }}
        onBindListPoint={checkListPointAvailability}
      />
      {itemLoading && (
        <LoaderIcon
          size={24}
          className="animate-spin absolute inset-0 m-auto"
        />
      )}
    </div>
  );
};
