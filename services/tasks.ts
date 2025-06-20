import { API_ENDPOINTS } from "constants/endpoints";
import { apiClient } from "lib/axios";
import type { CreateTaskParams, GetTaskParams, Task } from "types";

export async function getTasks(params: GetTaskParams = {}) {
  return apiClient.get<Task[]>(API_ENDPOINTS.tasks, {
    params: {
      _sort: "id",
      _order: "desc",
      ...params,
    },
  });
}

export async function createTask(task: CreateTaskParams) {
  return apiClient.post<Task>(API_ENDPOINTS.tasks, task);
}

export async function updateTask(task: Task) {
  return apiClient.put<Task>(`${API_ENDPOINTS.tasks}/${task.id}`, task);
}

export async function deleteTask(taskId: number) {
  return apiClient.delete(`${API_ENDPOINTS.tasks}/${taskId}`);
}

export async function getTask(taskId: number) {
  return apiClient.get<Task>(`${API_ENDPOINTS.tasks}/${taskId}`);
}

export async function assignTaskToUser(taskId: number, userId: number) {
  const { data: existingTask } = await getTask(taskId);

  return updateTask({
    ...existingTask,
    userId,
    updatedAt: new Date().toISOString(),
  });
}
