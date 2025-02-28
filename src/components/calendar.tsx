export default function Calendar() {
    const today = new Date();
    const day = today.getDate();
    const shortWeekday = today.toLocaleDateString("en-US", { weekday: "short" });
    const shortMonth = today.toLocaleDateString("en-US", { month: "short" });

    return (
        <div className="h-full flex flex-col bg-[var(--greyHighlighted)] col-span-2 sm:text-xl sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 p-6">
                <div className="text-[var(--purple40)] text-6xl">{day}</div>
                <div className="text-[var(--black75)] ">
                    <div>{shortWeekday}</div>
                    <div>{shortMonth}</div>
                </div>
            </div>
            <div className="mt-auto p-6 text-[var(--black75)] text-sm" style={{ boxShadow: "inset 0 15px 20px rgba(0, 0, 0, 0.25)" }}>
                {"No events today, you're free!"}
            </div>
        </div>
    );
}