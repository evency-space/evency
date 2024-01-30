import React from "react";
import { ComponentStory } from "@storybook/react";
import { BaseListPointItem } from "./BaseListPointItem";
import { privateListPointsFromBE } from "../../../../utils";
import { IPrivateListPoint } from "../../../../interfaces";

const { point, count } = (
  privateListPointsFromBE as unknown as IPrivateListPoint[]
)[0];
export default {
  title: "components/listPoint/BaseListPointItem",
  component: BaseListPointItem,
  args: {
    name: point.item.name,
    unit: point.unit,
    count,
  },
};

const Template: ComponentStory<typeof BaseListPointItem> = (args) => (
  <BaseListPointItem {...args} />
);

export const Primary = Template.bind({});

export const WithLongName = Template.bind({});
WithLongName.args = {
  name: "Очень теплый пуховый спальник",
};

export const WithoutCount = Template.bind({});
WithoutCount.args = {
  count: undefined,
};
