"use client";
import { cn } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { interviewer } from "@/constants";
import React, { useEffect, useState } from "react";
enum CallStatus {
  INACTIVE = "INACTIVE",
  CONNECTING = "CONNECTING",
  ACTIVE = "ACTIVE",
  FINISHED = "FINISHED",
}
interface SavedMessage {
  role: "user" | "system" | "assistant";
  content: string;
}
const InterviewAgent = (props: AgentProps) => {
  const router = useRouter();
  const { userId, userName, type } = props;

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { role: message.role, content: message.transcript };
        setMessages((prev) => [...prev, newMessage]);
      }
    };
    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error);
    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("message", onMessage);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("error", onError);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("message", onMessage);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("error", onError);
    };
  }, []);
  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) router.push("/");
  }, [userId, callStatus, type, messages]);

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING);

    if (type === "generate") {
      await vapi.start(
        undefined,
        undefined,
        undefined,
        process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!,
        {
          variableValues: {
            username: userName,
            userid: userId,
          },
        }
      );
    } else {
      // let formattedQuestions = "";
      // if (questions) {
      //   formattedQuestions = questions
      //     .map((question) => `- ${question}`)
      //     .join("\n");
      // }
      // await vapi.start(interviewer, {
      //   variableValues: {
      //     questions: formattedQuestions,
      //   },
      // });
    }
  };

  const handleDisconnect = async () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  };

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveorFinished =
    callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;
  // const isSpeaking = true;
  // const callstatus = CallStatus.ACTIVE;
  // const messages = [
  //   "Whats your name?",
  //   "My name is Rajiv Chaudhary, nice to meet you",
  // ];
  // const lastmessage = messages[messages.length - 1];

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
              key={latestMessage}
              className={cn(
                "transition-opacity duration-600 opacity-0",
                "animate-fadeIn opacity-100"
              )}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-center item-center mt-6">
        {callStatus !== CallStatus.ACTIVE ? (
          <button className="relative btn-call" onClick={handleCall}>
            <span
              className={cn(
                "absolute animate-ping rounded-full opacity-75",
                callStatus !== CallStatus.CONNECTING && "hidden"
              )}
            />
            <span>{isCallInactiveorFinished ? "Call" : " . . . ."}</span>
          </button>
        ) : (
          <button className="btn-primary" onClick={handleDisconnect}>
            <span>End</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default InterviewAgent;
