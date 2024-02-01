import { accessIds, favoriteListPointsFromBE } from "../../../utils";
import { favoritesListPointApi } from "../../listPoint";

const status = 200;
const delay = 700;

const favoritesEndPoints = favoritesListPointApi({
  ...accessIds,
  itemUid: ":pointUid",
});

export const mockedFavoritesListPointsApi = {
  getItems: {
    url: favoritesEndPoints.getItems,
    method: "POST",
    status,
    response: favoriteListPointsFromBE,
    delay,
  },
  //   addItem: {
  //     url: privateEndPoints.addItem,
  //     method: "POST",
  //     status,
  //     response: [],
  //     delay,
  //   },
  //   editItem: {
  //     url: privateEndPoints.editItem,
  //     method: "PUT",
  //     status,
  //     response: [],
  //     delay,
  //   },

  //   removeItem: {
  //     url: privateEndPoints.removeItem,
  //     method: "DELETE",
  //     status,
  //     response: [],
  //     delay,
  //   },
};
