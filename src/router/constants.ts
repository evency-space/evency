export const homePageUrl = () => "/";

export const welcomePageUrl = () => "/welcome";

export const createEventPageUrl = () => "/event";

export const eventPageUrl = ({ eventUid }: { eventUid: string }) =>
  `${createEventPageUrl()}/${eventUid}`;

export const eventWelcomePageUrl = ({ eventUid }: { eventUid: string }) =>
  `${eventPageUrl({ eventUid })}/welcome`;

export const eventCreateListPointPageUrl = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventPageUrl({ eventUid })}/item`;

export const eventEditListPointPageUrl = ({
  eventUid,
  listPointUid,
}: {
  eventUid: string;
  listPointUid: string;
}) => `${eventPageUrl({ eventUid })}/item/${listPointUid}`;

export const editEventPageUrl = ({ eventUid }: { eventUid: string }) =>
  `${eventPageUrl({ eventUid })}/edit`;

export const shareEventPageUrl = ({ eventUid }: { eventUid: string }) =>
  `${eventPageUrl({ eventUid })}/share`;

export const eventMembersPageUrl = ({ eventUid }: { eventUid: string }) =>
  `${eventPageUrl({ eventUid })}/members`;

export const eventRecommendedListPointsPageUrl = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventPageUrl({ eventUid })}/recommended`;

export const eventCreateRecommendedListPointPageUrl = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventRecommendedListPointsPageUrl({ eventUid })}/item`;

export const eventEditRecommendedListPointPageUrl = ({
  eventUid,
  index,
}: {
  eventUid: string;
  index: number;
}) => `${eventRecommendedListPointsPageUrl({ eventUid })}/item/${index}`;

export const favoritesListPointsPageUrl = () => "/favorites";

export const createFavoriteListPointPageUrl = () =>
  `${favoritesListPointsPageUrl()}/item`;

export const editFavoriteListPointPageUrl = ({
  listPointUid,
}: {
  listPointUid: string;
}) => `${favoritesListPointsPageUrl()}/item/${listPointUid}`;

export const faqPageUrl = () => "/help";

export const settingsPageUrl = () => "/settings";

export const eventImportFavoritesItemsPageUrlStepOne = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventPageUrl({ eventUid })}/favorites`;

export const eventImportFavoritesItemsPageUrlStepTwo = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventImportFavoritesItemsPageUrlStepOne({ eventUid })}?step=list`;

export const eventExportFavoritesItemsPageUrl = ({
  eventUid,
}: {
  eventUid: string;
}) => `${eventImportFavoritesItemsPageUrlStepOne({ eventUid })}/export`;
