import prisma from "$/client";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import { IssueFormSkeleton } from "@/app/components/issues";

const IssueForm = dynamic(() => import("@/app/components/issues/form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

interface IEditIssuePage {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: IEditIssuePage) => {
  const issue = await prisma.issue.findUnique({
    where: { id },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
