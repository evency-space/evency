import React, { useCallback, useState } from "react";
import { ICommonListPointItemProps } from "./CommonListPointItemProps";
import { ListPointItem } from "../../ListPointItem/ListPointItem";
import {
  BindListPointModal,
  BindingProgressTags,
  BtnIcon,
  TagMe,
  TextBodySmall,
} from "../../../../elements";
import { KebabIcon, LoaderIcon, PlusIcon } from "../../../../icons";
import { classesOf } from "../../../../../utils";
import { CommonListPointsUtils } from "../utils";
import { useLoading } from "../../../../../hooks";
import {
  changeCommonListPointBindStatus,
  getMemberBindings,
} from "../../../../../api_clients";
import { CommonItemBindingsDetails } from "../CommonItemBindingsDetails/CommonItemBindingsDetails";
import { IListPointBinding } from "../../../../../interfaces";

export const CommonListPointItem = (props: ICommonListPointItemProps) => {
  const { listPoint, accessIds, onShowListPointSettings, updateListPoint } =
    props;

  const { setLoading } = useLoading();

  const commonListPointsUtils = CommonListPointsUtils({ accessIds });

  const { memberUid, eventUid } = accessIds;

  const [itemLoading, setItemLoading] = useState<boolean>(false);

  const [bindingsDetails, setBindingsDetails] = useState<IListPointBinding[]>(
    []
  );

  const hideAdditionalContent = () => setBindingsDetails([]);

  const showBindingsDetails = bindingsDetails.length > 0;

  const getBindingsProgress = useCallback(
    () =>
      commonListPointsUtils.getBindingsProgress({
        bindings: listPoint.bindings,
        memberUid,
      }),
    [commonListPointsUtils, listPoint, memberUid]
  );

  const bindingsProgress = getBindingsProgress();

  const getBindingProgress = () => {
    let progress = 0;

    listPoint.bindings.forEach((binding) => {
      progress += binding.count;
    });

    return progress;
  };

  const bindingProgress = getBindingProgress();

  const bindingButtonClasses = classesOf(
    "btn btn-sm btn-square normal-case border-0",
    bindingsProgress.selectedMember === 0 &&
      "btn-primary focus:bg-green-2 focus-visible:bg-green-2",
    bindingsProgress.selectedMember > 0 && "dark:bg-green-0 text-white"
  );

  const outerBlockClasses = classesOf(
    "flex items-center justify-between gap-x-4 w-full transition duration-150 ease-out",
    itemLoading && "opacity-10"
  );

  const bindListPoint = async ({
    pointUid,
    count,
  }: {
    pointUid: string;
    count: number;
  }) => {
    try {
      setLoading(true);
      commonListPointsUtils.closeModal();

      const payload = {
        ...accessIds,
        pointUid,
        count: 0,
      };
      if (count !== 0) {
        payload.count = count;
      }

      await changeCommonListPointBindStatus(payload);

      await updateListPoint();
    } finally {
      setLoading(false);
    }
  };

  const showBindModal = () => {
    const binding = listPoint.bindings.find(
      (b) => b.member.memberUid === accessIds.memberUid
    );
    const countItemTaken = binding ? binding.count : 0;

    commonListPointsUtils.showModal({
      listPoint,
      content: (
        <BindListPointModal
          listPoint={listPoint}
          countItemTaken={countItemTaken}
          onClick={(count) => {
            void bindListPoint({ pointUid: listPoint.pointUid, count });
          }}
        />
      ),
    });
  };

  const checkListPointAvailability = async () => {
    try {
      setLoading(true);

      await commonListPointsUtils
        .checkListPointAvailability({
          pointUid: listPoint.pointUid,
        })
        .then(showBindModal)
        .catch(commonListPointsUtils.showBlockedListPointModal);
    } finally {
      setLoading(false);
    }
  };

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

  const toggleAdditionalContent = async () => {
    if (showBindingsDetails) {
      hideAdditionalContent();
    } else {
      await getBindingsDetails();
    }
  };

  const listPointBindingProgress = (
    <BindingProgressTags
      progressCount={bindingProgress}
      totalCount={listPoint.count}
      unit={listPoint.unit}
    />
  );

  const listPointCount = (
    <div className="flex items-center gap-x-4">
      {bindingsProgress.selectedMember > 0 && <TagMe />}
      {!showBindingsDetails && listPointBindingProgress}
    </div>
  );

  const actionButtons = (
    <div className="flex gap-x-2">
      <button
        className={bindingButtonClasses}
        onClick={() => {
          void checkListPointAvailability();
        }}
      >
        {bindingsProgress.selectedMember > 0 ? (
          <TextBodySmall>{bindingsProgress.selectedMember}</TextBodySmall>
        ) : (
          <PlusIcon size={16} />
        )}
      </button>

      <BtnIcon
        icon={<KebabIcon size={16} />}
        className="btn-sm"
        onClick={onShowListPointSettings}
      />
    </div>
  );

  const content = (
    <div className="flex grow relative">
      <div className={outerBlockClasses}>
        {listPointCount}
        {actionButtons}
      </div>
      {itemLoading && (
        <LoaderIcon
          size={24}
          className="animate-spin absolute inset-0 m-auto"
        />
      )}
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

  return (
    <ListPointItem
      listPointName={listPoint.item.name}
      grayTitle={bindingsProgress.all >= listPoint.count}
      isButton
      content={content}
      outerContent={bindingsDetailsContent}
      onClickTitle={() => {
        void toggleAdditionalContent();
      }}
    />
  );
};
