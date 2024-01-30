export interface MemberEditListItemProps {
  memberName: string;
  memberUid: string;
  isMe: boolean;
  onEdit: (member: { name: string; memberUid: string }) => void;
  onDelete: (member: { name: string; memberUid: string }) => void;
  onFinishEdit: (value: boolean) => void;
  onFocusInput: (value: boolean) => void;
}
