import { Metadata } from "next";
import TimelineClient from "./TimelineClient";
import { SideNav } from "@/src/components/SideNav";

export const metadata: Metadata = {
title: "Monument Timeline – Wander India",
description: "Point your camera at any Indian monument and scrub through its history century by century.",
};

export default function Page() {
    return (
        <>
            <SideNav/>
            <TimelineClient />
        </>
        );
}