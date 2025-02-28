'use client';

import Link from "next/link";
import ArrowRight from "./ui/arrowRight";
import { useUser } from "@/app/context/userContext";

export default function Audit() {

    const { audit } = useUser();
    const isInProgress = audit && audit[0]?.grade === null && audit[0]?.resultId === null;
    return (
        <div className="flex flex-col col-span-2 sm:col-span-2 md:col-span-1 lg:col-span-2 p-6 bg-[var(--bgLevel3)] text-xl hover:bg-[var(--bgLevel2)] transition-colors duration-300">
            <div>Audit</div>
            {isInProgress ? (
                <>
                    <div className="text-[var(--textMinimal)] mt-5 border-b-[.5px] border-neutral-500 pb-3">You have some audits to complete!</div>
                    <div className="pt-4 flex items-center">
                        <div>{audit[0]?.group.object.name} - <span className="text-[var(--textMinimal)]">{audit[0]?.group?.captainLogin}</span></div>
                        <span className="border pl-4 pr-4 border-[var(--purple)] text-[var(--purple)] ml-auto">{(audit[0]?.private?.code).toUpperCase()}</span>
                    </div>
                </>
            ) : (
                <div className="text-[var(--teal60)] mt-10 text-sm sm:text-base lg:text-xl">{"No audit to do, you're good!"}</div>
            )}

            <div className="flex flex-col lg:flex-row gap-2 items-center mt-auto">
                <div className="text-sm sm:text-base lg:text-xl">You can check back your audit history</div>
                <div className="ml-auto text-[var(--purple)] flex gap-2 hover:underline">
                    <ArrowRight />
                    <Link href={"/audit"}>Audit</Link>
                </div>
            </div>
        </div>

    )
}