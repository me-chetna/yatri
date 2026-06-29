import { Metadata } from "next";
import FoodScanClient from "./FoodScanClient";

export const metadata: Metadata = {
  title: "Smart Food Scan – Wander India",
  description: "Scan any packaged snack and get healthier, trip-friendly alternatives in seconds.",
};

export default function Page() {
  return <FoodScanClient />;
}