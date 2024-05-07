import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ListPointEdit } from "../../../components/Items/ListPointEdit/ListPointEdit";

import {
  replaceListPointToLocalStorageRecommendedListPoints,
  pushListPointToLocalStorageRecommendedListPoints,
} from "../storages";
import {
  deleteCurrentListPointFromLocalStorage,
  getCurrentListPointFromLocalStorage,
} from "../../../../utils/localStorage";
import { IEditListPoint } from "../../../elements/Forms/ListPointEditForm/ListPointEditFormProps";
import { convertIEditListPointToIListPoint } from "../../../../utils";

export const RecommendedListPointEditPage = () => {
  const navigate = useNavigate();

  const { index } = useParams();

  const listPoint = getCurrentListPointFromLocalStorage();

  const indexIsUndefined = index === undefined;

  const isCreationMode = indexIsUndefined;

  const changeListPoints = (editedListPoint: IEditListPoint) => {
    const convertedListPoint =
      convertIEditListPointToIListPoint(editedListPoint);

    if (isCreationMode) {
      pushListPointToLocalStorageRecommendedListPoints(convertedListPoint);
    } else if (!indexIsUndefined) {
      replaceListPointToLocalStorageRecommendedListPoints(
        Number(index),
        convertedListPoint,
      );
    }

    // back to listPoints page
    navigate(-1);
    deleteCurrentListPointFromLocalStorage();
  };

  return (
    listPoint && (
      <ListPointEdit
        listPoint={listPoint}
        isCreationMode={isCreationMode}
        onClick={changeListPoints}
      />
    )
  );
};
