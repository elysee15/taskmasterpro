import { forwardRef } from "react";
import { Textarea } from "~/components/shadcn/textarea";
import useTheme from "hooks/use-theme";
import { Theme, type SharedInputProps } from "types";
import { Input as ShadcnInput } from "~/components/shadcn/input";
import { cn } from "lib/utils";
import { Label } from "~/components/shadcn/label";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";

const getMuiSize = (size: SharedInputProps["size"]) => {
  switch (size) {
    case "sm":
      return "small";
    case "md":
      return "medium";
    case "lg":
      return "medium";
    default:
      return "medium";
  }
};

const getMuiVariant = (variant: SharedInputProps["variant"]) => {
  switch (variant) {
    case "default":
      return "outlined";
    case "filled":
      return "filled";
    case "outlined":
      return "outlined";
    default:
      return "outlined";
  }
};

const getShadcnSizeClasses = (size: SharedInputProps["size"]) => {
  switch (size) {
    case "sm":
      return "h-8 px-2 text-sm";
    case "md":
      return "h-10 px-3";
    case "lg":
      return "h-12 px-4 text-lg";
    default:
      return "h-10 px-3";
  }
};

const getMuiSizeStyles = (size: SharedInputProps["size"]) => {
  switch (size) {
    case "sm":
      return {
        "& .MuiInputBase-input": {
          padding: "8px 12px",
          fontSize: "0.875rem",
        },
      };
    case "lg":
      return {
        "& .MuiInputBase-input": {
          padding: "0px 14px",
          height: 44,
          fontSize: "1.125rem",
        },
      };
    default:
      return {
        "& .MuiInputBase-input": {
          padding: "0px 14px",
          height: 44,
          fontSize: "0.875rem",
        },
        textarea: {
          padding: "0px !important",
        },
      };
  }
};

const Input = forwardRef<HTMLInputElement, SharedInputProps>(
  (
    {
      value,
      defaultValue,
      placeholder,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      readOnly = false,
      type = "text",
      size = "md",
      variant = "default",
      error = false,
      errorMessage,
      helperText,
      label,
      fullWidth = false,
      autoFocus = false,
      autoComplete,
      maxLength,
      minLength,
      pattern,
      name,
      id,
      className,
      startIcon,
      endIcon,
      multiline = false,
      rows,
      maxRows,
      minRows,
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      if (onChange) {
        onChange(e);
      }
    };

    if (theme === Theme.shadcn) {
      const InputComponent = multiline ? Textarea : ShadcnInput;

      return (
        <div className={cn("w-full", fullWidth && "w-full", className)}>
          {label && (
            <Label
              htmlFor={id}
              className={cn(
                "block text-sm font-medium mb-2",
                error && "text-red-600",
                disabled && "text-gray-400"
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}

          <div className="relative">
            {startIcon && (
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {startIcon}
              </div>
            )}

            <InputComponent
              value={value}
              defaultValue={defaultValue}
              placeholder={placeholder}
              onChange={handleChange}
              onBlur={onBlur as any}
              onFocus={onFocus as any}
              disabled={disabled}
              required={required}
              readOnly={readOnly}
              type={type}
              autoFocus={autoFocus}
              autoComplete={autoComplete}
              maxLength={maxLength}
              minLength={minLength}
              pattern={pattern}
              name={name}
              id={id}
              rows={multiline ? rows : undefined}
              className={cn(
                getShadcnSizeClasses(size),
                error &&
                  "border-red-500 focus:border-red-500 focus:ring-red-500",
                startIcon && "pl-10",
                endIcon && "pr-10",
                disabled && "opacity-50 cursor-not-allowed",
                fullWidth && "w-full"
              )}
              ref={ref as any}
              {...props}
            />

            {endIcon && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                {endIcon}
              </div>
            )}
          </div>

          {(errorMessage || helperText) && (
            <p
              className={cn(
                "mt-1 text-sm",
                error ? "text-red-600" : "text-gray-500"
              )}
            >
              {error ? errorMessage : helperText}
            </p>
          )}
        </div>
      );
    }

    return (
      <TextField
        ref={ref}
        value={value}
        defaultValue={defaultValue}
        placeholder={placeholder}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={disabled}
        required={required}
        slotProps={{
          inputLabel: {
            shrink: !!label,
          },
          input: {
            readOnly,
            startAdornment: startIcon ? (
              <InputAdornment position="start">{startIcon}</InputAdornment>
            ) : undefined,
            endAdornment: endIcon ? (
              <InputAdornment position="end">{endIcon}</InputAdornment>
            ) : undefined,
          },
          htmlInput: {
            maxLength,
            minLength,
            pattern,
          },
        }}
        type={type}
        size={getMuiSize(size)}
        variant={getMuiVariant(variant)}
        error={error}
        helperText={error ? errorMessage : helperText}
        label={label}
        fullWidth={fullWidth}
        autoFocus={autoFocus}
        autoComplete={autoComplete}
        name={name}
        id={id}
        className={className}
        multiline={multiline}
        rows={rows}
        maxRows={maxRows}
        minRows={minRows}
        sx={{
          ...(getMuiSizeStyles(size) as any),
          ...(required &&
            label && {
              "& .MuiInputLabel-asterisk": {
                color: "error.main",
              },
            }),
        }}
        {...props}
      />
    );
  }
);

export default Input;
