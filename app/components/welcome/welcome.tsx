import useTheme from "hooks/use-theme";
import Button from "../ui/shared/button";

export function Welcome() {
  const { theme, toggle } = useTheme();
  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <Button>Bouton</Button>

      <button onClick={() => toggle()}>Toggle</button>
    </main>
  );
}
