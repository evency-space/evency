import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useSearchParams,
  useLocation,
  Await,
  useLoaderData,
  useNavigate,
} from "react-router-dom";
import { toast } from "react-toastify";
import {
  addPrivateItemsFromFavorites,
  addCommonItemsFromFavorites,
} from "../../../../api_clients";
import { STEP_QUERY_PARAM } from "./constants";
import { ImportedFavoritesList } from "./ImportedFavoritesList/ImportedFavoritesList";
import { PageWrapper } from "../../../components";
import { ImportedFavoritesListButton } from "./ImportedFavoritesListButton/ImportedFavoritesListButton";
import { Loader, TitleH1 } from "../../../elements";
import { TSelectedFavoritesItems, TSelectedList } from "../types";
import {
  deleteSelectedFavoritesItemsFromLocalStorage,
  getSelectedFavoritesItemsFromLocalStorage,
  saveSelectedFavoritesItemsInLocalStorage,
} from "../storages";
import { TargetListTypeSelector } from "./TargetListTypeSelector/TargetListTypeSelector";
import { LIST_POINT_TYPES } from "../../../../common/constants";
import { TProvidedEvent } from "../../../../../router/types";
import { IAccessIds, IEvent } from "../../../../interfaces";
import { eventPageUrl } from "../../../../../router/constants";
import { useLoading } from "../../../../hooks";
import { Toast } from "../../../elements/Toasts/Toast";

export const ImportFavoritesListPointsPage = () => {
  const routeData = useLoaderData() as TProvidedEvent;

  const { setLoading } = useLoading();

  const { t } = useTranslation();

  const location = useLocation();

  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  const [accessIds, setAccessIds] = useState<IAccessIds>();

  const [event, setEvent] = useState<IEvent>();

  const [step, setStep] = useState<number>(1);

  const [selectedListPoints, setSelectedListPoints] =
    useState<TSelectedFavoritesItems>({});

  const [targetList, setTargetList] = useState<TSelectedList>(
    LIST_POINT_TYPES.private
  );

  const isFirstStep = () => step === 1;

  const goBackToEventPage = () => {
    navigate(eventPageUrl({ eventUid: accessIds?.eventUid || "" }), {
      replace: true,
    });
  };

  const getSelectedListPointsCount = useCallback(
    () => Object.values(selectedListPoints).filter((count) => count > 0).length,
    [selectedListPoints]
  );

  const getStepQueryParam = useCallback(
    () => searchParams.get(STEP_QUERY_PARAM.key),
    [searchParams]
  );

  const changeStep = async () => {
    if (isFirstStep()) {
      setSearchParams({ [STEP_QUERY_PARAM.key]: STEP_QUERY_PARAM.value });
    } else if (event && accessIds) {
      try {
        setLoading(true);

        const items = Object.keys(selectedListPoints).map((itemUid) => ({
          itemUid,
          count: selectedListPoints[itemUid],
        }));
        const payload = {
          eventUid: event.eventUid,
          memberUid: accessIds.memberUid,
          items,
        };

        if (targetList === LIST_POINT_TYPES.private) {
          await addPrivateItemsFromFavorites(payload);
        } else if (targetList === LIST_POINT_TYPES.common) {
          await addCommonItemsFromFavorites(payload);
        }

        deleteSelectedFavoritesItemsFromLocalStorage();
        goBackToEventPage();
        toast(
          <Toast text={t("pages.import_favorites.successfully_imported")} />
        );
      } finally {
        setLoading(false);
      }
    }
  };

  const changeSelectedListPoints = (points: TSelectedFavoritesItems) => {
    setSelectedListPoints(points);
    saveSelectedFavoritesItemsInLocalStorage(points);
  };

  const pageContent = (
    <div className="flex flex-col gap-y-6 w-full h-full">
      <TitleH1>{t(`pages.import_favorites.step_${step}.title`)}</TitleH1>
      {isFirstStep() ? (
        <ImportedFavoritesList
          selectedListPoints={selectedListPoints}
          onChangeSelectedListPoints={changeSelectedListPoints}
        />
      ) : (
        <TargetListTypeSelector
          selectedList={targetList}
          selectList={setTargetList}
        />
      )}
    </div>
  );

  const pageFooter = (
    <ImportedFavoritesListButton
      count={getSelectedListPointsCount()}
      onClick={() => {
        void changeStep();
      }}
    />
  );

  useEffect(() => {
    setSelectedListPoints(getSelectedFavoritesItemsFromLocalStorage());
  }, []);

  useEffect(() => {
    const hasStepListParam = getStepQueryParam() === STEP_QUERY_PARAM.value;
    const selectedListPointsFromLS =
      getSelectedFavoritesItemsFromLocalStorage();

    if (Object.values(selectedListPointsFromLS).length !== 0) {
      setStep(hasStepListParam ? 2 : 1);
    } else if (hasStepListParam) {
      searchParams.delete(STEP_QUERY_PARAM.key);
      setSearchParams(searchParams);
    }
  }, [
    location,
    getStepQueryParam,
    getSelectedListPointsCount,
    searchParams,
    setSearchParams,
  ]);

  useEffect(() => {
    if (routeData) {
      void routeData.data.then((d) => {
        setEvent(d.event);
        setAccessIds(d.accessIds);
      });
    }
  }, [routeData]);

  return (
    <React.Suspense fallback={<Loader />}>
      <Await resolve={routeData?.data} errorElement={<p>Error page loading</p>}>
        <PageWrapper
          pageContent={pageContent}
          pageFooter={pageFooter}
          verticalTopPageContent
        />
      </Await>
    </React.Suspense>
  );
};
