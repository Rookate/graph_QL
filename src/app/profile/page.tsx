'use client';

import Link from "next/link";
import { useUser } from "../context/userContext"
import ArrowRight from "@/components/ui/arrowRight";
import { capitalizeFirstLetter, formatDate, formatTaille } from "../lib/utils";

export default function Profile() {
    const { projects, xps, level } = useUser();
    console.log("xps", xps)
    console.log("level", level)
    console.log(projects)

    return (
        <div className="p-24 pt-16">
            <Link href={'/'} className="flex text-lg items-center mb-5 gap-2 hover:underline">
                <div className="rotate-180"><ArrowRight /></div>
                <div> Back to Profile</div>
            </Link>

            <div className="text-[4rem]">XP Board</div>
            <div className="text-[4rem]">Cursus</div>

            {/* Div contenant les cards */}
            <div className="mt-7 flex items-center gap-12">
                <div className="bg-[var(--bgLevel2)] p-7 text-[var(--textMinimal)]">
                    <div>Total XP</div>
                    <div className="text-[4rem]">{xps && formatTaille(xps)}</div>
                </div>
                <div className="text-center bg-[var(--bgLevel2)] p-7 text-[var(--textMinimal)] pr-16">
                    <div>Current level</div>
                    <div className="text-[4rem]">{level}</div>
                </div>
                <div className="text-center bg-[var(--bgLevel2)] p-7 text-[var(--textMinimal)] pr-16">
                    <div>Transactions</div>
                    <div className="text-[4rem]">{projects.length}</div>
                </div>
            </div>

            {/* Hitorique des transactions */}
            <div className="mt-12 text-xl border-b-[0.5px] border-neutral-500 pb-3">Transactions history</div>
            <div className="flex flex-col w-full">
                {projects && projects.map((project, index) => {
                    const type = project.isBonus ? "Bonus" : capitalizeFirstLetter(project.object.type);
                    const name = project.isBonus ? project.attrs.reason : project.object.name;

                    return (
                        <div className="flex justify-between border-b-[0.5px] border-neutral-500 py-4 w-full" key={index}>
                            <div className="w-1/3">{type} - {name}</div>
                            <div className="text-center w-1/3">{formatTaille(project.amount)}</div>
                            <div className="w-1/3 text-right">{formatDate(project.createdAt)}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}