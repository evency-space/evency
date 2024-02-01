import React from "react";
import { ComponentStory } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { RecommendedListPointEditPage } from "./RecommendedListPointEditPage";
import { editListPoints } from "../../../../utils";
import { saveCurrentListPointInLocalStorage } from "../../../../utils/localStorage";
import { accessIds } from "../../../../utils/json/accessIds/accessIds.json";
import { IEditListPoint } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";

const editListPoint = (editListPoints as IEditListPoint[])[0];
const emptyListPoint = { ...editListPoint, name: "" };

const initialLocalStorageState = ({
  listPoint,
}: {
  listPoint: IEditListPoint;
}) => {
  saveCurrentListPointInLocalStorage(listPoint);
  return Promise.resolve({});
};

export default {
  title: "pages/listPoint/recommended/RecommendedListPointEditPage",
  component: RecommendedListPointEditPage,
  decorators: [withRouter],
};

const Template: ComponentStory<typeof RecommendedListPointEditPage> = () => (
  <RecommendedListPointEditPage />
);

export const CreateMode = Template.bind({});
CreateMode.loaders = [
  () => initialLocalStorageState({ listPoint: emptyListPoint }),
];
CreateMode.parameters = {
  reactRouter: {
    routePath: "/event/:eventUid/recommended/item",
    routeParams: { eventUid: accessIds.eventUid },
  },
};

export const EditMode = Template.bind({});
EditMode.loaders = [
  () => initialLocalStorageState({ listPoint: editListPoint }),
];
EditMode.parameters = {
  reactRouter: {
    routePath: "/event/:eventUid/recommended/item/:index",
    routeParams: { eventUid: accessIds.eventUid, index: 5 },
  },
};
