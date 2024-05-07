import React from "react";
import { ComponentStory } from "@storybook/react";
import { withRouter } from "storybook-addon-react-router-v6";
import { ExportFavoritesListPointsPage } from "./ExportFavoritesListPointsPage";
import { IAccessIds, IEventFromBE } from "../../../../interfaces";
import {
  mockedFavoritesListPointsApi,
  mockedPrivateListPointsApi,
  mockedCommonListPointsApi,
} from "../../../../api_clients";
import { accessIds } from "../../../../utils/json/accessIds/accessIds.json";
import { convertIEventFromBEToIEvent, fullEvent } from "../../../../utils";

const event = convertIEventFromBEToIEvent(fullEvent as IEventFromBE);

export default {
  title: "pages/ExportFavoritesListPointsPage",
  component: ExportFavoritesListPointsPage,
  parameters: {
    mockData: [
      ...Object.values(mockedFavoritesListPointsApi),
      ...Object.values(mockedPrivateListPointsApi),
      ...Object.values(mockedCommonListPointsApi),
    ],
    reactRouter: {
      loader: () => ({
        data: Promise.resolve({
          event: {
            ...event,
            eventUid: accessIds.eventUid,
          },
          accessIds,
        }),
      }),
    },
  },
  decorators: [withRouter],
  args: {
    accessIds: accessIds as IAccessIds,
  },
};

const Template: ComponentStory<typeof ExportFavoritesListPointsPage> = () => (
  <ExportFavoritesListPointsPage />
);

export const Primary = Template.bind({});
