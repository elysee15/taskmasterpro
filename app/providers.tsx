import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { muiTheme } from "../lib/mui-theme";
import CssBaseline from "@mui/material/CssBaseline";
import useTheme from "../hooks/use-theme";
import { Toaster, toast } from "sonner";

function Providers({ children }: React.PropsWithChildren) {
  const { theme } = useTheme();

  return (
    <StyledEngineProvider injectFirst={theme === "material"}>
      <ThemeProvider theme={muiTheme}>
        <CssBaseline />
        <Toaster richColors />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default Providers;
