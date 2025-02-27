export default function SkeletonDashboard() {
    return (
        <div className="grid grid-cols-4 gap-6 min-h-screen auto-rows-fr animate-pulse">
            {/* Bloc 1 - Rank */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-1 row-span-2 p-6"></div>

            {/* Bloc 2 - What's Up */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-2 p-6"></div>

            {/* Bloc 3 - Audits ratio */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-1 p-6"></div>

            {/* Bloc 4 - Audits */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-2 p-6"></div>

            {/* Bloc 5 - Active Status */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-1 row-span-2 p-6"></div>

            {/* Bloc 6 - Teamwork */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-2 p-6"></div>

            {/* Bloc 7 - Calendar */}
            <div className="bg-gray-300 dark:bg-gray-700 p-6 col-span-1"></div>

            {/* Bloc 8 - Amont Xp */}
            <div className="bg-gray-300 dark:bg-gray-700 col-span-2 p-6"></div>
        </div>
    );
}