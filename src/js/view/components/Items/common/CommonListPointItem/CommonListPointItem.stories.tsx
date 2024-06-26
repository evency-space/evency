import React from "react";
import { ComponentStory } from "@storybook/react";
import { CommonListPointItem } from "./CommonListPointItem";
import { ICommonListPoint } from "../../../../../interfaces";
import { accessIds, commonListPointsFromBE } from "../../../../../utils";

const commonListPoint = (commonListPointsFromBE as ICommonListPoint[])[0];
export default {
  title: "components/listPoint/common/CommonListPointItem",
  component: CommonListPointItem,
  args: {
    listPoint: commonListPoint,
    accessIds,
  },
};

const Template: ComponentStory<typeof CommonListPointItem> = (args) => (
  <CommonListPointItem {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  listPoint: {
    ...commonListPoint,
    count: 10,
  },
};

export const WithLongName = Template.bind({});
WithLongName.args = {
  listPoint: {
    ...commonListPoint,
    item: {
      ...commonListPoint.item,
      name: "Очень чистая родниковая вода",
    },
    count: 5,
    unit: "liter",
  },
};

export const NotTakenItem = Template.bind({});
NotTakenItem.args = {
  listPoint: {
    ...commonListPoint,
    bindings: [],
  },
};

export const TakenItem = Template.bind({});
TakenItem.args = {
  accessIds,
};

export const BindingSuccessfully = Template.bind({});

// export const Loading = Template.bind({});
// Loading.args = {
//   loading: true,
// };

// export const LoadingWithLongNameItem = Template.bind({});
// LoadingWithLongNameItem.args = {
//   loading: true,
//   listPoint: {
//     ...commonListPoint,
//     item: { ...commonListPoint.item, name: "Очень чистая родниковая вода" },
//     count: 5,
//     unit: "liter",
//   },
// };
