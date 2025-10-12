import InterviewDialoge from "@/components/InterviewDialoge";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <>
      <section className="card-cta justify-between  px-5 border-2 border-black">
        <div className="flex flex-col  max-w-[970px] space-y-5">
          <h2 className="text-primary-100 text-[28px]">
            Make Yourself Interview Ready with AI powered Practice & Feedback
          </h2>
          <p>
            Go through an virtually simulated interview environment and know
            your performance through feedback
          </p>
          <Button asChild className="btn-primary w-[200px] rounded-4xl ">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>
        <Image
          src="/robot.png"
          height={290}
          width={290}
          alt="robot_image"
          className="max-sm:hidden"
        />
      </section>
      <section className="flex flex-col mt-5 gap-5 ml-5">
        <h2>Your Interviews</h2>
        <div className="flex flex-row gap-5">
          {dummyInterviews.map((interview_item) => {
            return (
              <InterviewDialoge {...interview_item} key={interview_item.id} />
            );
          })}
        </div>
      </section>
      <section className="flex flex-col gap-5 mt-5 ml-5">
        <h2>Take a Interview</h2>
        <div className="flex flex-row gap-5">
          {dummyInterviews.map((interview_item) => {
            return (
              <InterviewDialoge {...interview_item} key={interview_item.id} />
            );
          })}
          {/* <p>No Interviews are available</p> */}
        </div>
      </section>
    </>
  );
};

export default Page;
