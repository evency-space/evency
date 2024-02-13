import React from "react";
import { ComponentStory } from "@storybook/react";
import { TwoLinesListPointItem } from "./TwoLinesListPointItem";
import { PlusIcon } from "../../../icons";

export default {
  title: "components/ListPoint/TwoLinesListPointItem",
  component: TwoLinesListPointItem,
  args: {
    listPointName: "Банка газировки",
    count: 10,
    unit: "package",
    countItemTaken: 5,
    memberCountItemTaken: 0,
  },
};
const Template: ComponentStory<typeof TwoLinesListPointItem> = (args) => (
  <TwoLinesListPointItem {...args} />
);

export const Primary = Template.bind({});

export const WithLongName = Template.bind({});
WithLongName.args = {
  listPointName:
    "Холодная банка газировки с бодрящим Dr. Pepper (открывать в последний день)",
};

export const WithPrependContent = Template.bind({});
WithPrependContent.args = {
  listPointName:
    "Холодная банка газировки с бодрящим Dr. Pepper (открывать в последний день)",
  prependContent: <PlusIcon size={24} />,
};

export const TakenItem = Template.bind({});
TakenItem.args = {
  countItemTaken: 10,
  count: 20,
  memberCountItemTaken: 5,
};

export const BindingSuccessfully = Template.bind({});
BindingSuccessfully.args = {
  countItemTaken: 10,
  count: 10,
};
