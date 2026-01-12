export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Todo {
  id: string;
  title: string;
  description?: string;
  status: "PENDING" | "IN_PROGRESS" | "DONE";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}
