export default function SkeletonProfile() {
    return (
        <div className="flex mt-20">
            {/* Simule le titre */}
            <div className="h-16 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse"></div>

            {/* Simule la partie droite (ProfilePage) */}
            <div className="ml-auto">
                <div className="h-12 w-12 bg-gray-300 dark:bg-gray-700 rounded-full animate-pulse"></div>
            </div>
        </div>
    )
};