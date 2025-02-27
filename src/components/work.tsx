'use client';

import { useUser } from "@/app/context/userContext";
import ArrowRight from "./ui/arrowRight";

export default function Work() {
    const { project } = useUser();
    return (
        <div className="col-span-2 p-6 bg-[var(--bgLevel3)]  hover:bg-[var(--bgLevel2)] transition-colors duration-300">
            <div className="text-6xl text-[var(--purple)] mb-6">What's Up</div>
            <div className="flex gap-2 items-center">
                <div>
                    <ArrowRight />
                </div>
                <div>
                    <div className="border-b border-neutral-400 cursor-pointer">{`Resume ${project?.object.name}`}</div>
                </div>
            </div>
        </div>

    )
}