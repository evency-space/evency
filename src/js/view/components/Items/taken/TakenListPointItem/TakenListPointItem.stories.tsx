import React from "react";
import { ComponentStory } from "@storybook/react";
import { TakenListPointItem } from "./TakenListPointItem";
import {
  takenListPointFromBE,
  untakenListPointFromBE,
} from "../../../../../utils";
import { ITakenListPoint } from "../../../../../interfaces";

const untakenListPoint = (
  untakenListPointFromBE as unknown as ITakenListPoint[]
)[0];
const takenListPoint = (
  takenListPointFromBE as unknown as ITakenListPoint[]
)[0];

export default {
  title: "components/listPoint/taken/TakenListPointItem",
  component: TakenListPointItem,
  args: {
    listPoint: untakenListPoint,
  },
};

const Template: ComponentStory<typeof TakenListPointItem> = (args) => (
  <TakenListPointItem {...args} />
);

export const Primary = Template.bind({});

export const Taken = Template.bind({});
Taken.args = {
  listPoint: takenListPoint,
};
