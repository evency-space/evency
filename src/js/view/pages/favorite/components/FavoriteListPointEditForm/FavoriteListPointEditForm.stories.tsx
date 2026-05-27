import React from "react";
import { ComponentStory } from "@storybook/react";
import { FavoriteListPointEditForm } from "./FavoriteListPointEditForm";
import { IEditFavoriteListPoint } from "./FavoriteListPointEditFormProps";
import { editListPoints } from "../../../../../utils";

const editListPoint = (editListPoints as IEditFavoriteListPoint[])[0];

export default {
  title: "pages/favorite/components/FavoriteListPointEditForm",
  component: FavoriteListPointEditForm,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};

const Template: ComponentStory<typeof FavoriteListPointEditForm> = (args) => (
  <FavoriteListPointEditForm {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  listPointData: editListPoint,
};
