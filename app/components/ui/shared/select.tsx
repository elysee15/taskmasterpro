import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  type SelectChangeEvent,
} from "@mui/material";
import useTheme from "hooks/use-theme";
import { Theme, type SharedSelectProps } from "types";
import {
  Select as ShadcnSelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../shadcn/select";

function getMuiSize(size: SharedSelectProps["size"]): "small" | "medium" {
  switch (size) {
    case "sm":
      return "small";
    case "lg":
      return "medium";
    default:
      return "medium";
  }
}

function getMuiVariant(
  variant: SharedSelectProps["variant"]
): "outlined" | "filled" | "standard" {
  switch (variant) {
    case "outline":
      return "outlined";

    case "ghost":
      return "standard";
    default:
      return "outlined";
  }
}

export const Select = ({
  size,
  variant,
  placeholder,
  value,
  onValueChange,
  options,
  label,
  disabled,
  error,
  onBlur,
  onFocus,
  ...props
}: SharedSelectProps) => {
  const { theme } = useTheme();

  const handleMuiChange = (event: SelectChangeEvent<string>) => {
    onValueChange?.(event.target.value);
  };

  if (theme === Theme.material) {
    return (
      <FormControl
        fullWidth={props.fullWidth}
        size={getMuiSize(size)}
        variant={getMuiVariant(variant)}
        disabled={disabled}
        error={error}
        {...props}
      >
        {label && <InputLabel shrink>{label}</InputLabel>}
        <MuiSelect
          value={value || ""}
          onChange={handleMuiChange}
          displayEmpty={!!placeholder}
          onBlur={onBlur as any}
          onFocus={onFocus as any}
          label={label}
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </MuiSelect>
      </FormControl>
    );
  }

  return (
    <div className={props.className}>
      {label && (
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block">
          {label}
        </label>
      )}
      <ShadcnSelect
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        {...props}
      >
        <SelectTrigger
          className={`
            ${size === "sm" ? "h-8 text-sm" : ""}
            ${size === "lg" ? "h-12 text-lg" : ""}
            ${error ? "border-destructive" : ""}
            ${variant === "ghost" ? "border-0 bg-transparent" : ""}
          `}
          onBlur={onBlur}
          onFocus={onFocus}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </ShadcnSelect>
    </div>
  );
};
