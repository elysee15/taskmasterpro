import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { Theme } from "types";

export interface ThemeState {
  theme: Theme;
  set: (theme: Theme) => void;
  toggle: () => void;
}

const useTheme = create<ThemeState>()(
  devtools(
    persist(
      (set) => ({
        theme: Theme.material,
        set: (theme) => set({ theme }),
        toggle: () =>
          set((state) => ({
            theme:
              state.theme === Theme.material ? Theme.shadcn : Theme.material,
          })),
      }),
      {
        name: "theme",
      }
    )
  )
);

export default useTheme;
