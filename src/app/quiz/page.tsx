import { Metadata } from "next";
import QuizClient from "./QuizClient";
import { SideNav } from "@/src/components/SideNav";

export const metadata: Metadata = {
    title: "Yatra · Destination Matchmaker",
    description: "Take the 10-question interactive discovery flashcard stack to unlock your ultimate personalized travel destination match.",
};

export default function QuizPage() {
    return (
        <>
            <SideNav />
            {/* Standard padding offset layer config so layout elements don't collide with floating navigation panels */}
            <div className="min-h-screen bg-[var(--background)] pb-24 pt-6 sm:pt-12">
              <QuizClient />
            </div>
        </>
    );
}