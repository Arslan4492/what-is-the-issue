import prisma from "../../prisma/client";
import { Flex, Grid } from "@radix-ui/themes";
import { Metadata } from "next";
import { IssueChart, IssueSummary, LatestIssues } from "./components/dashboard";
import { AppFont } from "./components/common";

const Home = async () => {
  const open = await prisma.issue.count({
    where: { status: "OPEN" },
  });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });
  const closed = await prisma.issue.count({
    where: { status: "CLOSED" },
  });
  return (
    <>
      <h1 className={`${AppFont.className} mb-4 text-3xl`}>
        Let&apos;s Make Some Problems
      </h1>
      <Grid columns={{ initial: "1", md: "2" }} gap="5">
        <Flex direction="column" gap="5">
          <IssueSummary open={open} inProgress={inProgress} closed={closed} />
          <IssueChart open={open} inProgress={inProgress} closed={closed} />
        </Flex>
        <LatestIssues />
      </Grid>
    </>
  );
};
export default Home;

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Problem Tracker - Dashboard",
  description: "View a summary of project issues",
};
