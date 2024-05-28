import React from "react";
import { ComponentStory } from "@storybook/react";
import { ImportedFavoritesList } from "./ImportedFavoritesList";
import { mockedFavoritesListPointsApi } from "../../../../../api_clients";
import { favoriteListPointsFromBE } from "../../../../../utils";

export default {
  title: "pages/favorite/ImportFavoritesListPointsPage/ImportedFavoritesList",
  component: ImportedFavoritesList,
  parameters: {
    mockData: Object.values(mockedFavoritesListPointsApi),
  },
  args: {
    selectedListPoints: {},
  },
};

const Template: ComponentStory<typeof ImportedFavoritesList> = (args) => (
  <ImportedFavoritesList {...args} />
);

export const Primary = Template.bind({});

export const WithSelected = Template.bind({});
WithSelected.args = {
  selectedListPoints: {
    [favoriteListPointsFromBE[0].item.itemUid]: 20,
  },
};
