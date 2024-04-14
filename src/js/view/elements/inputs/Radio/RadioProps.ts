export interface IRadioProps {
  value: boolean;
  label?: JSX.Element;
  name?: string;
  labelClassName?: string;
  onChange: () => void;
}
