import React from "react";
import { ComponentStory } from "@storybook/react";
import { ListPointEditForm } from "./ListPointEditForm";
import { editListPoints } from "../../../../utils";
import { IEditListPoint } from "./ListPointEditFormProps";

const editListPoint = (editListPoints as IEditListPoint[])[0];

export default {
  title: "elements/forms/itemEdit",
  component: ListPointEditForm,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const Template: ComponentStory<typeof ListPointEditForm> = (args) => (
  <ListPointEditForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  listPointData: editListPoint,
};
