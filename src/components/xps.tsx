'use client'

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { capitalizeFirstLetter, formatTaille } from "@/app/lib/utils";
import { useUser } from "@/app/context/userContext";

// const projs = [
//     { type: "Project", name: "real-time-forum-typing-in-progress", amount: "51.8 kB" },
//     { type: "Project", name: "real-time-forum", amount: "154 kB" },
//     { type: "Project", name: "make-your-game-score-handling", amount: "49.0 kB" },
//     { type: "Project", name: "make-your-game-history", amount: "49.0 kB" },
// ];


export default function Xps() {
    const { xps, projects } = useUser();

    return (
        <div className="col-span-2 p-6 bg-[var(--bgLevel3)] hover:bg-[var(--bgLevel2)] transition-colors duration-300">
            <div className="flex flex-col gap-4 h-full">
                {/* Header avec total et lien */}
                <div className="flex w-full justify-between items-center">
                    <div className="text-5xl text-[var(--purple)]">{xps && formatTaille(xps)}</div>
                    <div className="flex items-center gap-3">
                        <ArrowRight className="text-[var(--purple)]" />
                        <Link className="text-[var(--purple)] hover:underline" href="/profile">
                            SEE MORE
                        </Link>
                    </div>
                </div>

                {/* Dernière activité */}
                <div>
                    <div className="text-gray-400 text-sm border-b-[0.1px] pb-3 border-neutral-300">Last activity</div>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-2 mt-2">
                        {projects && projects?.slice(0, 4).map((proj, index) => {
                            const type = proj?.isBonus ? "Bonus" : capitalizeFirstLetter(proj?.object?.type);
                            const name = proj?.isBonus ? proj?.attrs?.reason : proj?.object?.name;
                            return (
                                <div key={index} className="flex justify-between text-sm text-gray-300">
                                    <span className="truncate max-w-[70%]">{type} — {name}</span>
                                    <span>{formatTaille(proj?.amount)}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    );

}