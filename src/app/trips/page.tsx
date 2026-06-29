import { Metadata } from "next";
import TripsClient from "./TripsClient";

export const metadata: Metadata = {
  title: "My Trips — Yatra",
  description: "Your saved India itineraries.",
};

export default function Page() {
  return <TripsClient />;
}