enum CounterSizes {
  "sm",
  "md",
}

enum CounterColor {
  "gray",
  "green",
}

export interface ICounterProps {
  label?: string;
  value: number;
  step?: number;
  size?: keyof typeof CounterSizes;
  color?: keyof typeof CounterColor;
  className?: string;
  onChange: (value: number) => void;
}
