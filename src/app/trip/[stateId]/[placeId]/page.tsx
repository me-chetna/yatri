import { Metadata } from "next";
import { notFound } from "next/navigation";
import TripClient from "./TripClient";
import { getPlace } from "../../../../data/trip-data";

interface PageProps {
  params: Promise<{
    stateId: string;
    placeId: string;
  }>;
}

// Dynamically generate the SEO metadata on the server using getPlace
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { stateId, placeId } = await params;
  const data = getPlace(stateId, placeId);

  if (!data) {
    return {
      title: "Trip Not Found — Wander India",
    };
  }

  return {
    title: `${data.place.name} trip planner — Wander India`,
    description: `Plan your ${data.place.name} itinerary on an interactive map.`,
  };
}

export default async function Page({ params }: PageProps) {
  const { stateId, placeId } = await params;
  const data = getPlace(stateId, placeId);

  if (!data) {
    notFound();
  }

  return <TripClient state={data.state} place={data.place} />;
}