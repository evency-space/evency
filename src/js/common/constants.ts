// URLs
export const url = "http://localhost:3001/";
export const urlApi = `${url}/api/`;
export const urlApiGet = `${urlApi}v1/get-`;
export const urlApiSet = `${urlApi}v1/set-`;
export const localStorageUsernameKey = "nickname";
export const localStorageTripIdKey = "trip_ids";
export const SERVER_URL = process.env.REACT_APP_IS_DEV_SERVER ? "https://tracking-organizer-dev-99e72366a490.herokuapp.com" : "https://tracking-organizer.herokuapp.com";

export enum LOCALES {
  "ru" = "ru",
  "en" = "en",
}

export enum LIST_POINT_TYPES {
  "recommended" = "recommended",
  "private" = "private",
  "common" = "common",
  "taken" = "taken",
  "favorite" = "favorite",
}
