export default function SkeletonTimeline() {
    return (
        <div className="flex items-center justify-between border border-gray-300 dark:border-gray-700 p-2 animate-pulse">
            <div className="flex items-center gap-6 text-xl">
                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-32"></div> {/* "Timeline" */}
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-48"></div> {/* Description */}
            </div>
            <div className="flex gap-2 items-center">
                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-6 rounded-full"></div> {/* Icone ArrowRight */}
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-32"></div> {/* "GO TO TIMELINE" */}
            </div>
        </div>
    );
}