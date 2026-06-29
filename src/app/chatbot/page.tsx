import { Metadata } from "next";
import ChatClient from "./[threadId]/ChatClient";

export const metadata: Metadata = {
  title: "Yatri — Your AI tourism guide",
  description: "Ask Yatri about destinations, history, culture, food, packing tips and itineraries.",
};

interface PageProps {
  params: Promise<{
    threadId: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { threadId } = await params;
  return <ChatClient threadId={threadId} />;
}