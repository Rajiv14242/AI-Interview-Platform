import { cn } from "@/lib/utils";
import Image from "next/image";
import React from "react";
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
const InterviewAgent = (props: AgentProps) => {
  const { userId, userName, type } = props;
  const isSpeaking = true;
  const callstatus = CallStatus.ACTIVE;
  const messages = [
    "Whats your name?",
    "My name is Rajiv Chaudhary, nice ot meet you",
  ];
  const lastmessage = messages[messages.length - 1];

  return (
    <div>
      <div className="flex border-green border-2 h-[300px]  ">
        <div className="flex flex-col w-full h-full border-2 border-green-600 justify-evenly items-center blue-gradient-dark">
          <div className="blue-gradient flex items-center justify-center size-[120px] rounded-full border-4 border-yellow-500 relative">
            <Image
              src="/ai-avatar.png"
              alt="Vapi agent"
              height={65}
              width={55}
              className="object-cover"
            ></Image>
            {isSpeaking && (
              <span className="absolute animate-ping rounded-full size-[100px] bg-primary-200 opacity-75"></span>
            )}
          </div>
          <h3>AI interviewer</h3>
        </div>
        <div className="flex flex-col w-full h-full border-2 border-green-600 justify-evenly items-center dark-gradient">
          <div className="blue-gradient flex items-center justify-center size-[120px] rounded-full border-4 border-yellow-500 ">
            <Image
              src="/user-avatar.png"
              alt="Vapi agent"
              height={65}
              width={55}
              className="object-cover"
            ></Image>
          </div>
          <h3>{userName}</h3>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border mt-8">
          <div className="transcript">
            <p
              key={lastmessage}
              className={cn(
                "transition-opacity duration-600 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {lastmessage}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center item-center mt-6">
        {callstatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call">
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                (callstatus !== CallStatus.CONNECTING) & "hidden"
              )}
            />
            <span>
              {callstatus === CallStatus.INACTIVE ||
              callstatus === CallStatus.FINISHED
                ? "Call"
                : " . . . ."}
            </span>
          </button>
        ) : (
          <button className="btn-primary">
            <span>End</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewAgent;
