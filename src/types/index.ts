export type User = {
  username: string;
  phone: string;
};

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export const Filter = {
  All: "All",
  Completed: "Completed",
  Uncompleted: "Uncompleted",
  Favorites: "Favorites",
} as const;

export type FilterType = (typeof Filter)[keyof typeof Filter];
