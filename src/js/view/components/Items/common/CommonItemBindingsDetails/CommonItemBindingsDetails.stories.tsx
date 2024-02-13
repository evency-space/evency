import React from "react";
import { ComponentStory } from "@storybook/react";
import { CommonItemBindingsDetails } from "./CommonItemBindingsDetails";
import {
  commonListPointBindingsFromBE,
  accessIds,
  commonListPointsFromBE,
} from "../../../../../utils";
import { ICommonListPoint } from "../../../../../interfaces";

const commonListPoint = (commonListPointsFromBE as ICommonListPoint[])[0];

export default {
  title: "components/listPoint/common/CommonItemBindingsDetails",
  component: CommonItemBindingsDetails,
  args: {
    bindingsDetails: commonListPointBindingsFromBE,
    unit: commonListPoint.unit,
    count: commonListPoint.count,
  },
};

const Template: ComponentStory<typeof CommonItemBindingsDetails> = (args) => (
  <CommonItemBindingsDetails {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  accessIds,
};

export const WithMe = Template.bind({});
WithMe.args = {
  accessIds: {
    ...accessIds,
    memberUid: commonListPointBindingsFromBE[0].member.memberUid,
  },
};
