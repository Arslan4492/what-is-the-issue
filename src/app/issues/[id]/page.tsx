import prisma from "$/client";
import { Box, Flex, Grid } from "@radix-ui/themes";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { cache } from "react";
import authOptions from "@/app/auth/auth-options";
import IssueDetails from "./issue-details";
import AssigneeSelect from "./assignee-select";
import EditIssueButton from "./edit-issue-button";
import DeleteIssueButton from "./delete-issue-button";

interface IIssueDetailPage {
  params: { id: string };
}

const fetchUser = cache((issueId: string) =>
  prisma.issue.findUnique({ where: { id: issueId } })
);

const IssueDetailPage = async ({ params }: IIssueDetailPage) => {
  const session = await getServerSession(authOptions);

  const issue = await fetchUser(params.id);

  if (!issue) notFound();

  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="4">
            <AssigneeSelect issue={issue} />
            <EditIssueButton issueId={issue.id} />
            <DeleteIssueButton issueId={issue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
};

export async function generateMetadata({ params }: IIssueDetailPage) {
  const issue = await fetchUser(params.id);

  return {
    title: issue?.title,
    description: "Details of issue " + issue?.id,
  };
}

export default IssueDetailPage;
