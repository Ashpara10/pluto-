import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const CreateWorkspaceDialogSchema = z.object({
  title: z.string(),
  image: z.string(),
});

const CreateWorkspace = () => {
  const { register, handleSubmit } = useForm<
    z.infer<typeof CreateWorkspaceDialogSchema>
  >({
    defaultValues: {
      title: "",
      image: "https://api.dicebear.com/9.x/glass/svg?seed=Untitled",
    },
    resolver: zodResolver(CreateWorkspaceDialogSchema),
  });
  return <div>CreateWorkspace</div>;
};

export default CreateWorkspace;
