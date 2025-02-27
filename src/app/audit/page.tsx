'use client';

import ArrowRight from "@/components/ui/arrowRight"
import Link from "next/link"
import { useUser } from "../context/userContext";

export default function Audit() {

    const { audit } = useUser();
    return (
        <div className="p-24 pt-16">
            <Link href={'/'} className="flex text-lg items-center mb-12 gap-2 hover:underline">
                <div className="rotate-180"><ArrowRight /></div>
                <div> Back to Profile</div>
            </Link>
            <div className="text-6xl mb-12">Audits</div>
            <div className="text-xl border-b border-neutral-500 pb-2">Your audits</div>
            <div className="pt-6">{"Here you can find back all your audits : the ones you have to make and the ones you've already made for other students projects."}</div>
            <div className="pb-6">{"For the audits you have to do, hover the block to get the verification code you'll need to complete the audit on your classmate computer."}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-4">
                {audit?.map((project: Audit, index: number) => {
                    const isInProgress = project?.grade === null && project?.resultId === null;

                    return (
                        <div
                            key={index}
                            className={`flex items-center bg-[var(--bgLevel3)] p-4 
                            ${isInProgress ? "border-l-4 border-yellow-500" : ""}
                `}
                        >
                            <div>
                                <div className="text-lg">{project?.group?.object?.name} - <span className="text-neutral-400">{project?.group?.captainLogin}</span></div>
                            </div>

                            <div className="ml-auto">
                                {isInProgress ? (
                                    <div className="flex gap-6 items-center">
                                        <span className="border pl-4 pr-4 border-[var(--purple)] text-[var(--purple)]">{project?.private.code}</span>
                                        <span className="text-yellow-500">IN PROGRESS</span>
                                    </div>

                                ) : (
                                    <span className={`${project?.grade && project?.grade >= 1 ? 'text-[var(--teal60)]' : 'text-[var(--red35)]'}`}>
                                        {project?.grade && project?.grade >= 1 ? 'SUCCEEDED' : 'FAILED'}
                                    </span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}