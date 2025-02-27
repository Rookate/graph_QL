export default function SkeletonHeader() {
    return (
        <div className="flex justify-between animate-pulse">
            {[...Array(3)].map((_, index) => (
                <div
                    key={index}
                    className="flex-1 p-4 bg-gray-300 dark:bg-gray-700 "
                >
                    <div className="h-6 bg-gray-400 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-1/2 mt-2"></div>
                    <div className="h-4 bg-gray-400 dark:bg-gray-600 rounded w-2/3 mt-1"></div>
                </div>
            ))}
        </div>
    );
}