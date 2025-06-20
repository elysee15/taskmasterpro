import useTheme from "hooks/use-theme";
import { buttonVariants, Button as ShadcnButton } from "../shadcn/button";
import MuiButton from "@mui/material/Button";
import { Theme, type SharedButtonProps } from "types";
import type { VariantProps } from "class-variance-authority";

function getMuiSize(
  size: SharedButtonProps["size"]
): "small" | "medium" | "large" {
  switch (size) {
    case "sm":
      return "small";
    case "lg":
      return "large";
    default:
      return "medium";
  }
}

function getShadcnSize(
  size: SharedButtonProps["size"]
): VariantProps<typeof buttonVariants>["size"] {
  switch (size) {
    case "sm":
      return "sm";
    case "icon":
      return "icon";
    case "lg":
      return "lg";
    default:
      return "default";
  }
}

function getMuiVariant(
  variant: SharedButtonProps["variant"]
): "text" | "contained" | "outlined" | undefined {
  switch (variant) {
    case "outline":
      return "outlined";
    case "ghost":
      return "text";
    case "secondary":
      return "contained";
    case "primary":
      return "contained";
    default:
      return undefined;
  }
}

function getMuiColor(
  variant: SharedButtonProps["variant"]
): "primary" | "secondary" | "error" | undefined {
  switch (variant) {
    case "destructive":
      return "error";
    default:
      return undefined;
  }
}

function getShadcnVariant(
  variant: SharedButtonProps["variant"]
): VariantProps<typeof buttonVariants>["variant"] {
  switch (variant) {
    case "outline":
      return "outline";
    case "ghost":
      return "ghost";
    case "secondary":
      return "secondary";
    case "destructive":
      return "destructive";
    default:
      return "default";
  }
}

const Button = ({ size, variant, ...props }: SharedButtonProps) => {
  const { theme } = useTheme();

  if (theme === Theme.material) {
    return (
      <MuiButton
        size={getMuiSize(size)}
        variant={getMuiVariant(variant)}
        color={getMuiColor(variant)}
        {...props}
      >
        {props.children}
      </MuiButton>
    );
  }

  return (
    <ShadcnButton
      size={getShadcnSize(size)}
      variant={getShadcnVariant(variant)}
      {...props}
    />
  );
};

export default Button;
