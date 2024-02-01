import React from "react";
import { ComponentStory } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { ListPointEditPage } from "./ListPointEditPage";
import {
  ICommonListPoint,
  IListPoint,
  IPrivateListPoint,
} from "../../../interfaces";
import {
  mockedPrivateListPointsApi,
  mockedCommonListPointsApi,
} from "../../../api_clients";
import {
  accessIds,
  privateListPointsFromBE,
  getEmptyListPoint,
  commonListPointsFromBE,
  convertListPointToIEditListPoint,
} from "../../../utils";
import {
  pushAccessIdsInLocalStorage,
  saveCurrentListPointInLocalStorage,
  TLocalStorageListPointTypes,
} from "../../../utils/localStorage";

const commonListPoint = (commonListPointsFromBE as ICommonListPoint[])[0];
const privateListPoint = (
  privateListPointsFromBE as unknown as IPrivateListPoint[]
)[0];
const emptyListPoint = getEmptyListPoint();

const initialLocalStorageState = ({
  type,
  listPoint,
}: {
  type: TLocalStorageListPointTypes;
  listPoint: IListPoint | ICommonListPoint | IPrivateListPoint;
}) => {
  const currentListPoint = convertListPointToIEditListPoint({
    point: listPoint,
    pointType: type,
  });
  pushAccessIdsInLocalStorage(accessIds);
  saveCurrentListPointInLocalStorage(currentListPoint);
  return Promise.resolve({});
};

export default {
  title: "pages/ListPointEditPage",
  component: ListPointEditPage,
  decorators: [withRouter],
  parameters: {
    reactRouter: {
      routePath: "/event/:eventUid/item",
      routeParams: { eventUid: accessIds.eventUid },
    },
  },
};

const Template: ComponentStory<typeof ListPointEditPage> = () => (
  <ListPointEditPage />
);

export const CreatePrimaryListPoint = Template.bind({});
CreatePrimaryListPoint.loaders = [
  () =>
    initialLocalStorageState({ type: "private", listPoint: emptyListPoint }),
];
CreatePrimaryListPoint.parameters = {
  mockData: Object.values(mockedPrivateListPointsApi),
};

export const CreateCommonListPoint = Template.bind({});
CreateCommonListPoint.loaders = [
  () => initialLocalStorageState({ type: "common", listPoint: emptyListPoint }),
];
CreateCommonListPoint.parameters = {
  mockData: Object.values(mockedCommonListPointsApi),
};

export const EditPrivateListPoint = Template.bind({});
EditPrivateListPoint.loaders = [
  () =>
    initialLocalStorageState({ type: "private", listPoint: privateListPoint }),
];
EditPrivateListPoint.parameters = {
  mockData: Object.values(mockedPrivateListPointsApi),
};

export const EditCommonListPoint = Template.bind({});
EditCommonListPoint.loaders = [
  () =>
    initialLocalStorageState({ type: "common", listPoint: commonListPoint }),
];
EditCommonListPoint.parameters = {
  mockData: Object.values(mockedCommonListPointsApi),
};
