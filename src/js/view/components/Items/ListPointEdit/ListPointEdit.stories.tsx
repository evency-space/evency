import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointEdit } from "./ListPointEdit";
import { editListPoints } from "../../../../utils";
import { IEditListPoint } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

const editListPoint = (editListPoints as IEditListPoint[])[0];
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
  listPoint: editListPoint,
};
