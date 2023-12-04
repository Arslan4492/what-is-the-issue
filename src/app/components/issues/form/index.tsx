"use client";

import { issueSchema } from "@/shared/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Issue } from "@prisma/client";
import { Button, Callout, TextField, Select } from "@radix-ui/themes";
// import * as Select from "@radix-ui/react-select";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";
import { ErrorMessage, Spinner } from "../../common";

type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueFormData>({
    resolver: zodResolver(issueSchema),
  });
  const [error, setError] = useState("");
  const [status, setStatus] = useState(issue?.status);
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    let values = { ...data, status };
    try {
      setSubmitting(true);
      if (issue) await axios.patch("/api/issues/" + issue.id, values);
      else await axios.post("/api/issues", data);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className="space-y-3" onSubmit={onSubmit}>
        <div className="flex items-center justify-center w-full gap-4">
          <section className="w-full">
            <TextField.Root>
              <TextField.Input
                defaultValue={issue?.title}
                placeholder="Title"
                {...register("title")}
              />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
          </section>
          <section>
            <Select.Root
              defaultValue={issue?.status || ""}
              onValueChange={(e: any) => setStatus(e)}
            >
              <Select.Trigger aria-label="status" placeholder="Choose status" />
              <Select.Content onChange={(s) => console.log(s)}>
                <Select.Group onChange={(s) => console.log(s)}>
                  <Select.Item value="OPEN">Open</Select.Item>
                  <Select.Item value="IN_PROGRESS">In Progress</Select.Item>
                  <Select.Item value="CLOSED">Closed</Select.Item>
                </Select.Group>
              </Select.Content>
            </Select.Root>
          </section>
        </div>

        <Controller
          name="description"
          control={control}
          defaultValue={issue?.description}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>
        <div className="flex items-center gap-4">
          <Button disabled={isSubmitting}>
            {issue ? "Update Issue" : "Submit New Issue"}{" "}
            {isSubmitting && <Spinner />}
          </Button>
          <Button onClick={() => router.back()} disabled={isSubmitting}>
            Back
          </Button>
        </div>
      </form>
    </div>
  );
};

export default IssueForm;
