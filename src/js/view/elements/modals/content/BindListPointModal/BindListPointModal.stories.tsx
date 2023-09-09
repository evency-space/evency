import React from "react";
import { ComponentStory } from "@storybook/react";

import { BindListPointModal } from "./BindListPointModal";
import { Modal } from "../../Modal/Modal";
import {
  commonListPointsFromBE,
  convertICommonListPointFromBEToIListPoint,
} from "../../../../../utils";
import { ICommonListPointFromBE } from "../../../../../interfaces";

const commonListPoint = convertICommonListPointFromBEToIListPoint(
  (commonListPointsFromBE as ICommonListPointFromBE[])[0]
);

export default {
  title: "elements/Modal/content/BindListPoint",
  component: BindListPointModal,
  args: {
    listPoint: commonListPoint,
    countItemTaken: 0,
  },
};

const Template: ComponentStory<typeof BindListPointModal> = (args) => (
  <Modal onClose={() => {}} content={<BindListPointModal {...args} />} />
);

export const Primary = Template.bind({});

export const TakenByUser = Template.bind({});
TakenByUser.args = {
  countItemTaken: 2,
};

export const WithLongItem = Template.bind({});
WithLongItem.args = {
  listPoint: {
    ...commonListPoint,
    item: {
      ...commonListPoint.item,
      name: "Очень очень теплый пуховый спальник",
    },
  },
};
