import { accessIds, privateListPointsFromBE } from "../../../utils";
import { privateListPointApi } from "../../listPoint";

const status = 200;
const delay = 700;

const privateEndPoints = privateListPointApi({
  ...accessIds,
  pointUid: ":pointUid",
});

export const mockedPrivateListPointsApi = {
  addItem: {
    url: privateEndPoints.addItem,
    method: "POST",
    status,
    response: [],
    delay,
  },
  editItem: {
    url: privateEndPoints.editItem,
    method: "PUT",
    status,
    response: [],
    delay,
  },
  getItems: {
    url: privateEndPoints.getItems,
    method: "GET",
    status,
    response: privateListPointsFromBE,
    delay,
  },
  removeItem: {
    url: privateEndPoints.removeItem,
    method: "DELETE",
    status,
    response: [],
    delay,
  },
  addPrivateItemsFromFavorites: {
    url: privateEndPoints.addFromFavorites,
    method: "POST",
    status,
    response: [],
    delay,
  },
};
