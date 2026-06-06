export interface User {
  username: string;
  phone: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
