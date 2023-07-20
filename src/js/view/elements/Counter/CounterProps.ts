export interface ICounterProps {
  label?: string;
  value: number;
  step?: number;
  onChange: (value: number) => void;
}
