import React, { useState } from "react";
import {
  lockCommonListPoint,
  unlockCommonListPoint,
} from "../../../../api_clients";
import { useModal } from "../../../../hooks";
import {
  IAccessIds,
  ICommonListPoint,
  IListPointBinding,
} from "../../../../interfaces";
import { BlockedListPointModal } from "../../../elements";

export const CommonListPointsUtils = ({
  accessIds,
}: {
  accessIds: IAccessIds;
}) => {
  const modalContext = useModal();

  const [selectedListPoint, setSelectedListPoint] =
    useState<ICommonListPoint>();

  const closeModal = () => {
    modalContext.setContent(undefined);

    if (selectedListPoint) {
      void unlockCommonListPoint({
        ...accessIds,
        pointUid: selectedListPoint.pointUid,
      });

      setSelectedListPoint(undefined);
    }
  };

  return {
    closeModal,

    showModal: ({
      listPoint,
      content,
    }: {
      listPoint?: ICommonListPoint;
      content: JSX.Element;
    }) => {
      modalContext.setContent({ content, onClose: closeModal });

      if (listPoint) {
        setSelectedListPoint(listPoint);
      }
    },

    showBlockedListPointModal: () => {
      const content = <BlockedListPointModal onClick={closeModal} />;

      modalContext.setContent({ content, onClose: closeModal });
    },

    checkListPointAvailability: async ({
      pointUid,
    }: {
      pointUid: ICommonListPoint["pointUid"];
    }) => {
      const { status } = await lockCommonListPoint({
        ...accessIds,
        pointUid,
      });

      if (status === 201) {
        return Promise.resolve();
      }

      return Promise.reject();
    },

    getBindingsProgress: ({
      bindings,
      memberUid,
    }: {
      bindings: IListPointBinding[];
      memberUid: string;
    }) =>
      bindings.reduce(
        (result, binding): { all: number; selectedMember: number } => {
          const { count, member } = binding;
          const all = result.all + count;
          let { selectedMember } = result;

          if (member.memberUid === memberUid) {
            selectedMember += count;
          }

          return {
            selectedMember,
            all,
          };
        },
        { selectedMember: 0, all: 0 }
      ),
  };
};
