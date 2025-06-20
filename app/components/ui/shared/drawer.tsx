import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/shadcn/sheet";
import useTheme from "hooks/use-theme";
import { Theme, type DrawerFooterProps, type SharedDrawerProps } from "types";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import { useMemo, useState } from "react";

const getDrawerStyles = (
  side: SharedDrawerProps["side"],
  width?: string | number,
  height?: string | number
) => {
  const isHorizontal = side === "left" || side === "right";
  const isVertical = side === "top" || side === "bottom";

  return {
    width: isHorizontal ? width || 300 : "auto",
    height: isVertical ? height || 300 : "100vh",
    maxWidth: isHorizontal ? "90vw" : "none",
    maxHeight: isVertical ? "90vh" : "none",
  };
};

const Drawer = ({
  overlay,
  onClose,
  open,
  closeOnOutsideClick,
  title,
  description,
  children,
  className,
  side,
  width,
  height,
  ...props
}: SharedDrawerProps) => {
  const { theme } = useTheme();

  const drawerStyles = useMemo(
    () => getDrawerStyles(side, width, height),
    [side, width, height]
  );

  if (theme === Theme.material) {
    return (
      <MuiDrawer
        open={open}
        onClose={closeOnOutsideClick ? onClose : undefined}
        anchor={side}
        ModalProps={{
          keepMounted: false,
          disableEscapeKeyDown: !closeOnOutsideClick,
        }}
        className={className}
        slotProps={{
          paper: {
            sx: {
              ...drawerStyles,
              position: "relative",
            },
          },
        }}
        {...props}
      >
        <Box
          sx={{
            p: 2,
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {(title || description) && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                mb: 2,
                borderBottom: "1px solid",
                borderColor: "divider",
                pb: 2,
              }}
            >
              <Box>
                {title && (
                  <Typography
                    variant="h6"
                    component="h2"
                    sx={{ fontWeight: 600 }}
                  >
                    {title}
                  </Typography>
                )}
                {description && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 0.5 }}
                  >
                    {description}
                  </Typography>
                )}
              </Box>
              <IconButton
                onClick={onClose}
                size="small"
                sx={{ ml: 1 }}
                aria-label="fermer"
              >
                X
              </IconButton>
            </Box>
          )}
          <Box sx={{ flex: 1, overflow: "auto" }}>{children}</Box>
        </Box>
      </MuiDrawer>
    );
  }

  return (
    <>
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose?.()}>
        <SheetContent
          side={side}
          onInteractOutside={
            closeOnOutsideClick ? undefined : (e) => e.preventDefault()
          }
          style={getDrawerStyles(side, width, height)}
        >
          {(title || description) && (
            <SheetHeader>
              {title && <SheetTitle>{title}</SheetTitle>}
              {description && (
                <SheetDescription>{description}</SheetDescription>
              )}
            </SheetHeader>
          )}

          <div className="flex-1 overflow-auto">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Drawer;

export const useDrawer = (initialOpen = false) => {
  const [open, setOpen] = useState(initialOpen);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const toggleDrawer = () => setOpen((prev) => !prev);

  return {
    open,
    openDrawer,
    closeDrawer,
    toggleDrawer,
    setOpen,
  };
};

export const DrawerWithTrigger = ({
  trigger,
  triggerClassName,
  side,
  ...drawerProps
}: SharedDrawerProps & {
  trigger: React.ReactNode;
  triggerClassName?: string;
}) => {
  const { open, openDrawer, closeDrawer } = useDrawer();
  const { theme } = useTheme();

  if (theme === Theme.shadcn) {
    return (
      <Sheet open={open} onOpenChange={(isOpen) => !isOpen && closeDrawer()}>
        <SheetTrigger asChild onClick={openDrawer} className={triggerClassName}>
          {trigger}
        </SheetTrigger>
        <SheetContent side={side} className="">
          {(drawerProps.title || drawerProps.description) && (
            <SheetHeader>
              {drawerProps.title && (
                <SheetTitle>{drawerProps.title}</SheetTitle>
              )}
              {drawerProps.description && (
                <SheetDescription>{drawerProps.description}</SheetDescription>
              )}
            </SheetHeader>
          )}
          <div className="flex-1 overflow-auto px-4">
            {drawerProps.children}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <>
      <div onClick={openDrawer} className={triggerClassName}>
        {trigger}
      </div>
      <Drawer {...drawerProps} open={open} side={side} onClose={closeDrawer} />
    </>
  );
};

export const DrawerFooter = ({ children, className }: DrawerFooterProps) => {
  const { theme } = useTheme();

  if (theme === Theme.shadcn) {
    return <SheetFooter className={className}>{children}</SheetFooter>;
  }

  return (
    <Box
      sx={{
        mt: "auto",
        pt: 2,
        borderTop: "1px solid",
        borderColor: "divider",
        display: "flex",
        gap: 1,
        justifyContent: "flex-end",
      }}
      className={className}
    >
      {children}
    </Box>
  );
};

export const DrawerClose = ({
  children,
  onClick,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  const { theme } = useTheme();

  if (theme === Theme.shadcn) {
    return (
      <SheetClose asChild className={className}>
        {children}
      </SheetClose>
    );
  }

  return (
    <div onClick={onClick} className={className}>
      {children}
    </div>
  );
};
