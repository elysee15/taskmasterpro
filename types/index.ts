export enum Theme {
  material = "material",
  shadcn = "shadcn",
}

export interface SharedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive";
  className?: string;
  size?: "sm" | "lg" | "icon";
  type?: "button" | "submit" | "reset";
}

export interface SharedDrawerProps {
  children: React.ReactNode;
  open: boolean;
  onClose?: () => void;
  side?: "left" | "right" | "top" | "bottom";
  title?: string;
  description?: string;
  className?: string;
  overlay?: boolean;
  closeOnOutsideClick?: boolean;
  width?: string | number;
  height?: string | number;
}

export interface DrawerFooterProps {
  children: React.ReactNode;
  className?: string;
}

type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "search";
type Size = "sm" | "md" | "lg";
type Variant = "default" | "filled" | "outlined";

export interface SharedInputProps {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  onChange?: (event: any) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  required?: boolean;
  readOnly?: boolean;
  type?: InputType;
  size?: Size;
  variant?: Variant;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  autoComplete?: string;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  name?: string;
  id?: string;
  className?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  multiline?: boolean;
  rows?: number;
  maxRows?: number;
  minRows?: number;
}

export interface RadioOption {
  value: string;
  label: string;
  disabled?: boolean;
  description?: string;
}

export interface SharedRadioProps {
  value?: string;
  defaultValue?: string;
  onChange?: (event: any) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement>;
  onFocus?: React.FocusEventHandler<HTMLButtonElement>;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  className?: string;
  size?: Size;
  error?: boolean;
  errorMessage?: string;
  helperText?: string;
  label?: string;
  options: RadioOption[];
  orientation?: "horizontal" | "vertical";
  color?: "primary" | "secondary" | "success" | "error" | "warning" | "info";
}

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SharedSelectProps {
  size?: Size;
  variant?: "outline" | "filled" | "ghost";
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  onBlur?: React.FocusEventHandler<HTMLButtonElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLButtonElement> | undefined;
  options: SelectOption[];
  label?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export type TaskPriority = "low" | "medium" | "high";
export type TaskStatus = "todo" | "inProgress" | "done";

export type Task = {
  id: number;
  title: string;
  description: string;
  priority: TaskPriority;
  userId?: number;
  status: TaskStatus;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

export type CreateTaskParams = Omit<Task, "id">;

export type GetTaskParams = {
  id?: string;
  priority?: TaskPriority;
  completed?: boolean;
};

export type Role = "dev" | "manager" | "designer" | "admin";

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}

export type CreateUserParams = Omit<User, "id">;

export type UpdateUserParams = User;
