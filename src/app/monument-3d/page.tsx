import { Metadata } from "next";
import WondersClient from "./WondersClient";

export const metadata: Metadata = {
  title: "Yatri — 3D Monument & Culture Guide",
  description: "Explore the New Seven Wonders of the world and hear stories of their history, dress, and cuisine.",
};

export default function Page() {
  return <WondersClient />;
}