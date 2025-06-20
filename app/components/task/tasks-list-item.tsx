import { PRIORITY, PRIORITY_COLORS_MAP } from "constants/shared";
import type { Task } from "types";
import Button from "../ui/shared/button";
import { CircleX, PencilLine } from "lucide-react";

type TasksListItemProps = {
  task: Task;
};

function TasksListItem({ task }: TasksListItemProps) {
  return (
    <div key={task.id} className="py-2 flex items-center justify-between gap-6">
      <section>
        <hgroup>
          <h3 className="font-bold">{task.title || "-"}</h3>
          {task.description && <p className="text-sm">{task.description}</p>}
        </hgroup>
        <div className="text-sm flex items-center gap-2 text-slate-600">
          <div>
            Priorité:{" "}
            <span
              style={{
                color: PRIORITY_COLORS_MAP[task.priority],
              }}
            >
              {PRIORITY[task.priority]}
            </span>
          </div>
          <div>Assigné à : {task.userId ? task.userId : "Non assigné"}</div>
        </div>
      </section>
      <div className="flex gap-2">
        <Button aria-label="Modifier la tâche">
          <PencilLine size={20} />
        </Button>
        <Button variant="destructive" aria-label="Supprimer la tâche">
          <CircleX size={20} />
        </Button>
      </div>
    </div>
  );
}

export default TasksListItem;
