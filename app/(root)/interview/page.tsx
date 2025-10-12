import InterviewAgent from "@/components/InterviewAgent";
import React from "react";

const Page = () => {
  return (
    <div>
      <h1>Interview Session </h1>
      <InterviewAgent userId="u1" userName="Rajiv" type="generate" />
    </div>
  );
};

export default Page;
