"use client";

import { ReactNode } from "react";
import {
    LiveblocksProvider ,
    RoomProvider ,
    ClientSideSuspense
} from "@liveblocks/react/suspense";
import FullScreenLoader from "@/components/full-screen-loader";
import {useParams} from "next/navigation";

export function Room({ children }: { children: ReactNode }) {
    const params = useParams();

    return (
        <LiveblocksProvider publicApiKey={"pk_dev_mV42mnF4ohwA0NZ5yWuwyqFyvVHs0IW74-Qe-ZUERS7xg_bVhjJa5Q03s2DJTwGx"}>
            <RoomProvider id={params.documentId as string}>
                <ClientSideSuspense fallback={
                    <FullScreenLoader label="Loading please waite .."/>
                }>
                    {children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    );
}