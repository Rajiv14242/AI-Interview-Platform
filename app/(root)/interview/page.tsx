import InterviewAgent from "@/components/InterviewAgent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { log } from "console";
import React from "react";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <div>
      <h1>Interview Session </h1>
      <InterviewAgent userId={user?.id} userName={user?.name} type="generate" />
    </div>
  );
};

export default Page;
