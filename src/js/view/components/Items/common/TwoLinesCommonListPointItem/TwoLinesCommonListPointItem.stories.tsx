import React from "react";
import { ComponentStory } from "@storybook/react";
import { TwoLinesCommonListPointItem } from "./TwoLinesCommonListPointItem";
import { ICommonListPoint } from "../../../../../interfaces";
import { accessIds, commonListPointsFromBE } from "../../../../../utils";
import { mockedCommonListPointsApi } from "../../../../../api_clients";

const commonListPoint = (commonListPointsFromBE as ICommonListPoint[])[0];
export default {
  title: "components/listPoint/common/TwoLinesCommonListPointItem",
  component: TwoLinesCommonListPointItem,
  parameters: {
    mockData: Object.values(mockedCommonListPointsApi),
  },
  args: {
    listPoint: commonListPoint,
    accessIds,
  },
};

const Template: ComponentStory<typeof TwoLinesCommonListPointItem> = (args) => (
  <TwoLinesCommonListPointItem {...args} />
);

export const Primary = Template.bind({});
