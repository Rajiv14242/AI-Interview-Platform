import { getRandomInterviewCover } from "@/lib/utils";
import dayjs from "dayjs";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import DisplayTechIcon from "./DisplayTechIcon";

const InterviewDialoge = ({
  interviewId,
  userId,
  role,
  type,
  techstack,
  createdAt,
}: InterviewCardProps) => {
  const feedback = null as Feedback | null;
  const normalizedType = /mix/gi.test(type) ? "Mixed" : type; // reg expression is used
  const formattedDate = dayjs(
    feedback?.createdAt || createdAt || Date.now()
  ).format("MMM D,YYYY"); // sep 21,2025

  return (
    <div className="card-border w-[340px]  border-2 border-yellow-400">
      <div className="card-interview h-full ">
        <div>
          <div className="absolute top-0 right-0  px-2 py-1 bg-light-400 rounded-bl-lg w-fit ">
            <p>{normalizedType}</p>
          </div>
          <Image
            src={getRandomInterviewCover()}
            alt="cover"
            className="rounded-full object-fit"
            height={80}
            width={80}
          ></Image>
          <h3 className="mt-4">{role} Interview</h3>
          <div className="mt-2 flex flex-row gap-4">
            <div className="flex flex-row gap-2">
              <Image
                src="/calendar.svg"
                alt="calendar"
                height={22}
                width={22}
              />
              <p>{formattedDate}</p>
            </div>
            <div className="flex flex-row gap-2">
              <Image src="/star.svg" alt="calendar" height={22} width={22} />
              <p>{feedback?.totalScore || "---"}/100</p>
            </div>
          </div>
        </div>
        <p className="mt-[-20px]">
          {feedback?.finalAssessment || "You havenot taken the interview yet"}
        </p>
        <div className="flex flex-row justify-between">
          {/* <DisplayTechIcon techStack={techstack} /> */}
          <Button className="btn-primary">
            <Link
              href={
                feedback
                  ? `/interview/${interviewId}/feedback`
                  : `/interview/${interviewId}`
              }
            >
              {feedback ? "Check Feedback" : "View Interview"}
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewDialoge;
