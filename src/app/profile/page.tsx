import { Metadata } from "next";
import ProfileClient from "./ProfileClient";
import { SideNav } from "@/src/components/SideNav";
export const metadata: Metadata = {
    title: "Yatra · Your profile",
    description: "Edit your traveler name, avatar, theme and see how many trips you've saved.",
};

export default function Page() {
    return (
        <>
            <SideNav/>
            <ProfileClient />
        </>
    );
}