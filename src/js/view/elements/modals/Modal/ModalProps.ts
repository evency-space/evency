export interface IModalProps {
  className?: string;
  title?: string;
  description?: string;
  content: JSX.Element;
  onClose: () => void;
}
