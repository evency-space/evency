import React from "react";
// Icons
import { KebabIcon } from "../../icons/KebabIcon";
import { CalendarIcon } from "../../icons/CalendarIcon";
import { PlusIcon } from "../../icons/PlusIcon";
import { MinusIcon } from "../../icons/MinusIcon";
import { ZoomIcon } from "../../icons/ZoomIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EditIcon } from "../../icons/EditIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { CloseIcon } from "../../icons/CloseIcon";

import "./UIKitPage.css";

export function UIKitPage() {
  return (
    <div className="ui-kit-page">
      <h1>UI-kit page</h1>
      <div className="icons-sizes">
        <h5>32</h5>
        <h5>24</h5>
        <h5>20</h5>
        <h5>16</h5>
        <h5>12</h5>
      </div>
      <div className="icons">
        <div className="flex-1">
          <KebabIcon size={32} />
          <KebabIcon size={24} />
          <KebabIcon size={20} />
          <KebabIcon size={16} />
          <KebabIcon size={12} />
        </div>
        <div className="flex-1">
          <CalendarIcon size={32} />
          <CalendarIcon size={24} />
          <CalendarIcon size={20} />
          <CalendarIcon size={16} />
          <CalendarIcon size={12} />
        </div>
        <div className="flex-1">
          <PlusIcon size={32} />
          <PlusIcon size={24} />
          <PlusIcon size={20} />
          <PlusIcon size={16} />
          <PlusIcon size={12} />
        </div>
        <div className="flex-1">
          <MinusIcon size={32} />
          <MinusIcon size={24} />
          <MinusIcon size={20} />
          <MinusIcon size={16} />
          <MinusIcon size={12} />
        </div>
        <div className="flex-1">
          <ZoomIcon size={32} />
          <ZoomIcon size={24} />
          <ZoomIcon size={20} />
          <ZoomIcon size={16} />
          <ZoomIcon size={12} />
        </div>
        <div className="flex-1">
          <DeleteIcon size={32} />
          <DeleteIcon size={24} />
          <DeleteIcon size={20} />
          <DeleteIcon size={16} />
          <DeleteIcon size={12} />
        </div>
        <div className="flex-1">
          <EditIcon size={32} />
          <EditIcon size={24} />
          <EditIcon size={20} />
          <EditIcon size={16} />
          <EditIcon size={12} />
        </div>
        <div className="flex-1">
          <ShareIcon size={32} />
          <ShareIcon size={24} />
          <ShareIcon size={20} />
          <ShareIcon size={16} />
          <ShareIcon size={12} />
        </div>
        <div className="flex-1">
          <CloseIcon size={32} />
          <CloseIcon size={24} />
          <CloseIcon size={20} />
          <CloseIcon size={16} />
          <CloseIcon size={12} />
        </div>
      </div>
    </div>
  );
}