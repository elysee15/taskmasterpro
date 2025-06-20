export const PRIORITY = {
  low: "Faible",
  medium: "Moyenne",
  high: "Haute",
} as const;

export const PRIORITY_COLORS_MAP = {
  low: "green",
  medium: "yellow",
  high: "red",
} as const;

export const priorityOptions = [
  { value: "high", label: "Haute" },
  { value: "medium", label: "Moyenne" },
  { value: "low", label: "Basse" },
];

export const STATUS = {
  todo: "A faire",
  inProgress: "En cours",
  done: "Terminé",
} as const;

export const statusOptions = [
  { value: "todo", label: "A faire" },
  { value: "inProgress", label: "En cours" },
  { value: "done", label: "Terminé" },
];
