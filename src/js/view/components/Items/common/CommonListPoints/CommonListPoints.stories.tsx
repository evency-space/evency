import React from "react";
import { ComponentStory } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { CommonListPoints } from "./CommonListPoints";
import { mockedCommonListPointsApi } from "../../../../../api_clients";
import { accessIds } from "../../../../../utils/json/accessIds/accessIds.json";
import { IAccessIds } from "../../../../../interfaces";
import { commonListPointsFromBE } from "../../../../../utils";
import {
  TCommonListPointViewMode,
  switchCommonListPointViewMode,
} from "../../../../../utils/localStorage";

export default {
  title: "components/listPoint/common/CommonListPoints",
  component: CommonListPoints,
  decorators: [withRouter],
  parameters: {
    mockData: Object.values(mockedCommonListPointsApi),
  },
  args: {
    accessIds: accessIds as IAccessIds,
  },
};

const initialViewMode = (viewMode: TCommonListPointViewMode) => {
  switchCommonListPointViewMode(viewMode);
  return Promise.resolve({});
};

const Template: ComponentStory<typeof CommonListPoints> = (args) => (
  <CommonListPoints {...args} />
);

export const Primary = Template.bind({});
Primary.loaders = [() => initialViewMode("oneLine")];

export const Locked = Template.bind({});
Locked.loaders = [() => initialViewMode("oneLine")];
Locked.parameters = {
  mockData: Object.values({
    ...mockedCommonListPointsApi,
    lockItem: { ...mockedCommonListPointsApi.lockItem, status: 423 },
  }),
};

export const GetNewBindings = Template.bind({});
GetNewBindings.loaders = [() => initialViewMode("oneLine")];
GetNewBindings.parameters = {
  mockData: Object.values({
    ...mockedCommonListPointsApi,
    getItems: {
      ...mockedCommonListPointsApi.getItems,
      response: [{ ...commonListPointsFromBE[0], bindings: [] }],
    },
  }),
};

export const EmptyBindings = Template.bind({});
EmptyBindings.loaders = [() => initialViewMode("oneLine")];
EmptyBindings.parameters = {
  mockData: Object.values({
    ...mockedCommonListPointsApi,
    getMemberBindings: {
      ...mockedCommonListPointsApi.getMemberBindings,
      response: [],
    },
  }),
};

export const TwoLinesPrimary = Template.bind({});
TwoLinesPrimary.loaders = [() => initialViewMode("twoLines")];
