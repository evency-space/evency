import React from "react";
import { ComponentStory } from "@storybook/react";

import { withRouter } from "storybook-addon-react-router-v6";
import { DuplicateListPointModal } from "./DuplicateListPointModal";
import { Modal } from "../../Modal/Modal";
import { accessIds, commonListPointsFromBE } from "../../../../../utils";
import { IAccessIds, ICommonListPoint } from "../../../../../interfaces";

const commonListPoint = (commonListPointsFromBE as ICommonListPoint[])[0];
export default {
  title: "elements/Modal/content/DuplicateListPointModal",
  component: DuplicateListPointModal,
  decorators: [withRouter],
  args: {
    listPoint: commonListPoint,
    accessIds: accessIds as IAccessIds,
  },
};

const Template: ComponentStory<typeof DuplicateListPointModal> = (args) => (
  <Modal onClose={() => {}} content={<DuplicateListPointModal {...args} />} />
);

export const Primary = Template.bind({});

export const WithLongName = Template.bind({});
WithLongName.args = {
  listPoint: {
    ...commonListPoint,
    item: {
      ...commonListPoint.item,
      name: "Очень очень теплый пуховый спальный мешок",
    },
  },
};
