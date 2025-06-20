import Button from "~/components/ui/shared/button";
import { Funnel, PlusCircle } from "lucide-react";
import Drawer, {
  DrawerWithTrigger,
  useDrawer,
} from "~/components/ui/shared/drawer";
import ThemeSwitcher from "~/components/common/theme-switcher";
import CreateUpdateTaskForm from "~/components/task/create-update-task-form";
import { getTasks } from "services/tasks";
import type { Route } from "../routes/+types/_index";
import React from "react";
import { Await } from "react-router";
import TasksList from "~/components/task/tasks-list";
import { getUsers } from "services/users";
import type { SelectOption } from "types";

export function meta() {
  return [
    { title: "Task Master Pro" },
    { name: "description", content: "Your task manager" },
  ];
}

export async function loader() {
  const tasksPromise = getTasks();
  const usersOptionsPromise: Promise<SelectOption[]> = getUsers().then((res) =>
    res.data?.map((u) => ({ value: u.id.toString(), label: u.name }))
  );
  return {
    tasksPromise,
    usersOptionsPromise,
  };
}

export default function RoutePage({
  loaderData: { tasksPromise, usersOptionsPromise },
}: Route.ComponentProps) {
  const { openDrawer, open: drawerOpen, toggleDrawer } = useDrawer();

  return (
    <div className="container mx-auto min-h-dvh flex items-center justify-center">
      <main className="flex items-center justify-center max-w-7xl px-[4%]">
        <div className="">
          <header className="flex items-center justify-between w-full gap-6">
            <div>
              <h1 className="font-bold text-lg md:text-xl uppercase">
                Mes tâches
              </h1>
            </div>
            <div className="flex items-center gap-x-2">
              <Button variant="ghost">
                <Funnel size={20} />
              </Button>
              <Button onClick={openDrawer}>
                <PlusCircle size={20} />
                <span className="hidden md:inline">Ajouter une tâche</span>
              </Button>

              <Drawer
                open={drawerOpen}
                onClose={toggleDrawer}
                closeOnOutsideClick
                title="Ajouter une tache"
                description="Veuillez remplir le formulaire pour ajouter une tache"
                width={500}
                side="left"
              >
                <div className="p-4">
                  <React.Suspense fallback={"Chargement..."}>
                    <Await
                      resolve={usersOptionsPromise}
                      errorElement={<div>Une erreur est survenue 😬</div>}
                      children={(users) => {
                        return (
                          <CreateUpdateTaskForm
                            usersOptions={users}
                            afterSubmit={() => toggleDrawer()}
                          />
                        );
                      }}
                    />
                  </React.Suspense>
                </div>
              </Drawer>

              <ThemeSwitcher />
            </div>
          </header>
          <article className="h-[400px]">
            <React.Suspense fallback={"Chargement..."}>
              <Await
                resolve={tasksPromise}
                errorElement={<div>Une erreur est survenue 😬</div>}
                children={({ data }) => {
                  return <TasksList tasks={data} />;
                }}
              />
            </React.Suspense>
          </article>
        </div>
      </main>
    </div>
  );
}
