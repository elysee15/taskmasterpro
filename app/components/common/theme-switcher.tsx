import { ArrowLeftRight } from "lucide-react";
import Button from "../ui/shared/button";
import useTheme from "hooks/use-theme";

function ThemeSwitcher() {
  const { toggle } = useTheme();
  return (
    <Button variant="outline" onClick={toggle}>
      <ArrowLeftRight size={20} />
      <span className="hidden md:inline">Switch Theme</span>
    </Button>
  );
}

export default ThemeSwitcher;
