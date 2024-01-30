import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointEdit } from "./ListPointEdit";
import { IPrivateListPoint } from "../../../../interfaces";
import { privateListPointsFromBE } from "../../../../utils";

const privateListPoint = (
  privateListPointsFromBE as unknown as IPrivateListPoint[]
)[0].point;
export default {
  title: "components/ListPoint/ListPointEdit",
  component: ListPointEdit,
};

const Template: ComponentStory<typeof ListPointEdit> = (args) => (
  <ListPointEdit {...args} />
);

export const CreateMode = Template.bind({});
CreateMode.args = {
  isCreationMode: true,
};

export const EditMode = Template.bind({});
EditMode.args = {
  listPoint: privateListPoint,
};
