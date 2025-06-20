import type { Task } from "types";
import TasksListItem from "./tasks-list-item";

type TasksListProps = {
  tasks: Task[];
};

function TasksList({ tasks }: TasksListProps) {
  return (
    <div className="h-full overflow-y-scroll scroll-smooth divide-y">
      {tasks.map((task) => (
        <TasksListItem key={task.id} task={task} />
      ))}
    </div>
  );
}

export default TasksList;
