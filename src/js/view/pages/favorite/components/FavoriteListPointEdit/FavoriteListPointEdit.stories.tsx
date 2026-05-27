import React from "react";
import { ComponentStory } from "@storybook/react";
import { FavoriteListPointEdit } from "./FavoriteListPointEdit";
import { editListPoints } from "../../../../../utils";
import { IEditFavoriteListPoint } from "../FavoriteListPointEditForm/FavoriteListPointEditFormProps";

const editListPoint = (editListPoints as IEditFavoriteListPoint[])[0];

export default {
  title: "pages/favorite/components/FavoriteListPointEdit",
  component: FavoriteListPointEdit,
};

const Template: ComponentStory<typeof FavoriteListPointEdit> = (args) => (
  <FavoriteListPointEdit {...args} />
);

export const CreateMode = Template.bind({});
CreateMode.args = {
  listPoint: {
    ...editListPoint,
    name: "",
  },
  isCreationMode: true,
};

export const EditMode = Template.bind({});
EditMode.args = {
  listPoint: editListPoint,
};
