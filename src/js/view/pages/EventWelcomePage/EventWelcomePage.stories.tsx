import React from "react";
import { ComponentStory } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import {
  members,
  fullEvent,
  convertIEventFromBEToIEvent,
} from "../../../utils";
import { EventWelcomePage } from "./EventWelcomePage";
import { IEventFromBE } from "../../../interfaces";
import { SERVER_URL } from "../../../common/constants";

const event = convertIEventFromBEToIEvent(fullEvent as IEventFromBE);

const { eventUid } = event;

const mockedApi = {
  getItems: {
    url: `${SERVER_URL}/Trip/${eventUid}/Members`,
    method: "GET",
    status: 200,
    response: members,
    delay: 700,
  },
};

export default {
  title: "pages/EventWelcomePage",
  component: EventWelcomePage,
  parameters: {
    mockData: Object.values(mockedApi),
    reactRouter: {
      loader: () => ({
        data: Promise.resolve({
          event,
          members,
        }),
      }),
    },
  },
  decorators: [withRouter],
};

const Template: ComponentStory<typeof EventWelcomePage> = () => (
  <EventWelcomePage />
);

export const ChangeMember = Template.bind({});

export const ChooseMember = Template.bind({});
ChooseMember.parameters = {
  reactRouter: {
    loader: () => ({
      data: Promise.resolve({
        event,
        members,
        accessIds: { memberUid: members[0].memberUid },
      }),
    }),
  },
};
