export default function Status() {
    return (
        <div className="col-span-2 row-span-1 p-6 bg-[var(--bgLevel3)] sm:col-span-1 sm:row-span-2 text-xl hover:bg-[var(--bgLevel2)] transition-colors duration-300">
            <div className="flex items-center justify-between">
                <div className="text-base text-[var(--textMinimal)]">{"You're currently"}</div>
                <div className="size-4 bg-[var(--tealFill)] rounded-full"></div>
            </div>
            <div className="text-[var(--teal60)] text-5xl">Active</div>
            <div className="text-xs mt-3 text-[var(--textMinimal)]">Keep up the good work!</div>
            <div className="text-base mt-12">
                <div>Recent records</div>
                <div className="text-xs mt-2">No recent records to show.</div>
            </div>
        </div>
    )
}