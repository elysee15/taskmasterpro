import Button from "../ui/shared/button";
import Input from "../ui/shared/input";
import { Radio } from "../ui/shared/radio";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { getErrorMessage } from "lib/utils";
import { useNavigate } from "react-router";
import { Select } from "../ui/shared/select";
import type { CreateTaskParams, SelectOption } from "types";
import { priorityOptions, statusOptions } from "constants/shared";
import toNumber from "lodash-es/toNumber";
import { createTask } from "services/tasks";

const formValidationSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  priority: z.enum(["high", "medium", "low"], {
    errorMap: () => ({ message: "La priorité est requise" }),
  }),
  userId: z.string({ coerce: true }).optional(),
  status: z.enum(["todo", "inProgress", "done"]).default("todo").optional(),
});

type FormValues = z.infer<typeof formValidationSchema>;

type CreateUpdateTaskFormProps = {
  afterSubmit?: () => void;
  usersOptions: SelectOption[];
};

function CreateUpdateTaskForm({
  afterSubmit,
  usersOptions,
}: CreateUpdateTaskFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(formValidationSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "high",
      status: "todo",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values: FormValues) => {
    try {
      const data = { ...values } as CreateTaskParams;
      const userId = toNumber(values?.userId);
      if (userId) {
        data.userId = userId;
      }

      await createTask({
        ...data,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      toast.success("La tâche a bien été ajouté");
      afterSubmit?.();
      navigate(".", { replace: true });
    } catch (error) {
      console.error(error);
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
      <Input
        label="Titre"
        placeholder="Ajouter le titre la tâche ici..."
        error={!!errors.title?.message}
        errorMessage={errors.title?.message}
        {...register("title")}
      />
      <Input
        placeholder="Ajouter la description de la tâche ici..."
        label="Description"
        multiline
        rows={7}
        error={!!errors.description?.message}
        errorMessage={errors.description?.message}
        {...register("description")}
      />

      <Controller
        name="userId"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            onValueChange={field.onChange}
            label="Affecter à"
            options={usersOptions}
            error={!!fieldState.error}
            placeholder="Affecter une tâche ici..."
            size="md"
          />
        )}
      />

      <Controller
        name="priority"
        control={control}
        render={({ field, fieldState }) => (
          <Radio
            {...field}
            label="Priorité"
            options={priorityOptions}
            error={!!fieldState.error}
            errorMessage={fieldState.error?.message}
            required
            orientation="vertical"
            size="md"
            color="primary"
          />
        )}
      />

      <Controller
        name="status"
        control={control}
        render={({ field, fieldState }) => (
          <Select
            {...field}
            onValueChange={field.onChange}
            label="Status"
            options={statusOptions}
            error={!!fieldState.error}
            placeholder="Ajouter le statut ici..."
            size="md"
          />
        )}
      />

      <Button
        disabled={!isValid || isSubmitting}
        type="submit"
        className="mt-5"
      >
        Créer la tâche
      </Button>
    </form>
  );
}

export default CreateUpdateTaskForm;
