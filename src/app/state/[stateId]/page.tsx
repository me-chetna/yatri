import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getState } from "../../../data/trip-data";
import StateClient from "../[stateId]/StateClient";

interface PageProps {
  params: Promise<{
    stateId: string;
  }>;
}

// Generate dynamic SEO metadata on the server using route params
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateId } = await params;
  const state = getState(stateId);

  if (!state) {
    return {
      title: "State Not Found — Wander India",
    };
  }

  return {
    title: `${state.name} — Wander India`,
    description: `Discover cities to visit in ${state.name}. ${state.tagline}`,
  };
}

export default async function Page({ params }: PageProps) {
  const { stateId } = await params;
  const state = getState(stateId);

  if (!state) {
    notFound();
  }

  return <StateClient state={state} />;
}