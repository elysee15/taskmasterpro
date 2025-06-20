import { forwardRef, type ChangeEvent } from "react";
import { Label } from "~/components/shadcn/label";
import useTheme from "hooks/use-theme";
import { cn } from "lib/utils";
import {
  RadioGroupItem,
  RadioGroup as ShadcnRadioGroup,
} from "~/components/shadcn/radio-group";
import { Theme, type SharedRadioProps } from "types";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  FormControlLabel,
  FormHelperText,
  RadioGroup as MuiRadioGroup,
  Radio as MuiRadio,
} from "@mui/material";

const getMuiSize = (size: SharedRadioProps["size"]) => {
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

const getShadcnSizeClasses = (size: SharedRadioProps["size"]) => {
  switch (size) {
    case "sm":
      return "h-3 w-3";
    case "md":
      return "h-4 w-4";
    case "lg":
      return "h-5 w-5";
    default:
      return "h-4 w-4";
  }
};

const getShadcnLabelSizeClasses = (size: SharedRadioProps["size"]) => {
  switch (size) {
    case "sm":
    case "md":
      return "text-sm";
    case "lg":
      return "text-lg";
    default:
      return "text-base";
  }
};

const getMuiColor = (color: SharedRadioProps["color"]) => {
  switch (color) {
    case "primary":
      return "primary";
    case "secondary":
      return "secondary";
    case "success":
      return "success";
    case "error":
      return "error";
    case "warning":
      return "warning";
    case "info":
      return "info";
    default:
      return "primary";
  }
};

const getMuiSizeStyles = (size: SharedRadioProps["size"]) => {
  switch (size) {
    case "sm":
      return {
        "& .MuiRadio-root": {
          "& .MuiSvgIcon-root": {
            fontSize: "1.2rem",
          },
        },
        "& .MuiFormControlLabel-label": {
          fontSize: "0.875rem",
        },
      };
    case "lg":
      return {
        "& .MuiRadio-root": {
          padding: "12px",
          "& .MuiSvgIcon-root": {
            fontSize: "1.5rem",
          },
        },
        "& .MuiFormControlLabel-label": {
          fontSize: "1.125rem",
        },
      };
    default:
      return {};
  }
};

export const Radio = forwardRef<HTMLInputElement, SharedRadioProps>(
  (
    {
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      disabled = false,
      required = false,
      name,
      id,
      className,
      size = "md",
      error = false,
      errorMessage,
      helperText,
      label,
      options,
      orientation = "vertical",
      color = "primary",
      ...props
    },
    ref
  ) => {
    const { theme } = useTheme();

    const handleChange = (newValue: string) => {
      if (onChange) {
        const syntheticEvent = {
          target: {
            name,
            value: newValue,
          },
          currentTarget: {
            name,
            value: newValue,
          },
        } as ChangeEvent<HTMLInputElement>;

        onChange(syntheticEvent);
      }
    };

    if (theme === Theme.shadcn) {
      return (
        <div className={cn("w-full", className)} ref={ref}>
          {label && (
            <Label
              className={cn(
                "block text-sm font-medium mb-3",
                error && "text-red-600",
                disabled && "text-gray-400"
              )}
            >
              {label}
              {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
          )}
          <ShadcnRadioGroup
            value={value}
            defaultValue={defaultValue}
            onValueChange={handleChange}
            name={name}
            id={id}
            ref={ref}
            disabled={disabled}
            required={required}
            className={cn(
              orientation === "horizontal"
                ? "flex flex-wrap gap-6"
                : "grid gap-3"
            )}
            {...props}
          >
            {options.map((option, index) => (
              <div
                key={option.value}
                className={cn(
                  "flex items-center space-x-3",
                  option.disabled && "opacity-50 cursor-not-allowed"
                )}
              >
                <RadioGroupItem
                  value={option.value}
                  id={`${id || name}-${index}`}
                  disabled={disabled || option.disabled}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  className={cn(
                    getShadcnSizeClasses(size),
                    "mt-0.5", // Align with text
                    error && "border-red-500 text-red-600",
                    color === "secondary" && "border-gray-400 text-gray-600",
                    color === "success" && "border-green-500 text-green-600",
                    color === "error" && "border-red-500 text-red-600",
                    color === "warning" && "border-yellow-500 text-yellow-600",
                    color === "info" && "border-blue-500 text-blue-600"
                  )}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label
                    htmlFor={`${id || name}-${index}`}
                    className={cn(
                      getShadcnLabelSizeClasses(size),
                      "font-medium cursor-pointer",
                      error && "text-red-600",
                      disabled || option.disabled
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-900"
                    )}
                  >
                    {option.label}
                  </Label>
                  {option.description && (
                    <p
                      className={cn(
                        "text-sm text-gray-500",
                        disabled || (option.disabled && "text-gray-400")
                      )}
                    >
                      {option.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </ShadcnRadioGroup>
          {(errorMessage || helperText) && (
            <p
              className={cn(
                "mt-2 text-sm",
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
      <FormControl
        error={error}
        disabled={disabled}
        required={required}
        className={className}
        sx={getMuiSizeStyles(size) as any}
        {...props}
      >
        {label && (
          <FormLabel
            id={`${id || name}-label`}
            sx={{
              marginBottom: 1,
              "&.Mui-focused": {
                color: error ? "error.main" : `${getMuiColor(color)}.main`,
              },
            }}
          >
            {label}
          </FormLabel>
        )}
        <MuiRadioGroup
          ref={ref}
          aria-labelledby={label ? `${id || name}-label` : undefined}
          value={value}
          defaultValue={defaultValue}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
          name={name}
          row={orientation === "horizontal"}
          sx={{
            gap: orientation === "horizontal" ? 3 : 1,
            "&.MuiRadioGroup-root": {
              gap: 0,
            },
          }}
        >
          {options.map((option, index) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              disabled={disabled || option.disabled}
              control={
                <MuiRadio
                  size={getMuiSize(size)}
                  color={getMuiColor(color)}
                  onBlur={onBlur}
                  onFocus={onFocus}
                  id={`${id || name}-${index}`}
                />
              }
              label={
                <div>
                  <div className="text-sm">{option.label}</div>
                  {option.description && (
                    <div
                      style={{
                        fontSize: "0.75rem",
                        color: "text.secondary",
                        marginTop: "2px",
                      }}
                    >
                      {option.description}
                    </div>
                  )}
                </div>
              }
              sx={{
                "& .MuiFormControlLabel-label": {
                  marginTop:
                    size === "sm" ? "2px" : size === "lg" ? "6px" : "0px",
                  alignItems: "center",
                },
                "&.MuiFormControlLabel-root": {
                  margin: 0,
                },
              }}
            />
          ))}
        </MuiRadioGroup>
        {(errorMessage || helperText) && (
          <FormHelperText>{error ? errorMessage : helperText}</FormHelperText>
        )}
      </FormControl>
    );
  }
);

Radio.displayName = "Radio";

export const RadioGroup = ({
  children,
  className,
  spacing = "md",
}: {
  children: React.ReactNode;
  className?: string;
  spacing?: "sm" | "md" | "lg";
}) => {
  const spacingClasses = {
    sm: "space-y-1",
    md: "space-y-2",
    lg: "space-y-3",
  };

  return (
    <div className={cn("w-full", spacingClasses[spacing], className)}>
      {children}
    </div>
  );
};
