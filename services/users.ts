import { API_ENDPOINTS } from "constants/endpoints";
import { apiClient } from "lib/axios";
import type { User, CreateUserParams, UpdateUserParams, Task } from "types";

export async function getUsers() {
  return apiClient.get<User[]>(API_ENDPOINTS.users, {
    params: {
      _sort: "id",
      _order: "desc",
    },
  });
}

export async function createUser(user: CreateUserParams) {
  return apiClient.post<User>(API_ENDPOINTS.users, user);
}

export async function updateUser(user: UpdateUserParams) {
  return apiClient.put<User>(`${API_ENDPOINTS.users}/${user.id}`, user);
}

export async function deleteUser(userId: string) {
  return apiClient.delete(`${API_ENDPOINTS.users}/${userId}`);
}

export async function getUser(userId: string) {
  return apiClient.get<User>(`${API_ENDPOINTS.users}/${userId}`);
}

export async function getUserTasks(userId: number) {
  return apiClient.get<Task[]>(API_ENDPOINTS.tasks, {
    params: {
      userId,
      _sort: "createdAt",
      _order: "desc",
    },
  });
}
