export default function SkeletonLabel() {
    return (
        <div className="flex items-center gap-4 justify-start animate-pulse">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-5 w-5"></div> {/* Icône */}
            <div className="bg-gray-300 dark:bg-gray-700 h-5 w-24"></div> {/* "Labels:" */}
            <div className="bg-gray-300 dark:bg-gray-700 p-1 rounded w-40 h-6"></div> {/* COHORT NGP8 */}
        </div>
    );
}