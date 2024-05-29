enum TListItemSelectorVariants {
  "checkbox",
  "radio",
}

export interface IListItemSelectorProps {
  listItemName?: string;
  value: boolean;
  content?: JSX.Element;
  grayTitle?: boolean;
  variant?: keyof typeof TListItemSelectorVariants;
  onClick: () => void;
}
