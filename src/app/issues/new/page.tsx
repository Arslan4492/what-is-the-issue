import { IssueFormSkeleton } from "@/app/components/issues";
import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/app/components/issues/form"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
