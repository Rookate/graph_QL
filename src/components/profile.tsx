import { useUser } from "@/app/context/userContext";
import ProfilePage from "./profile-page";

export default function Profile() {
    const { user } = useUser();
    return (
        <div className="flex mt-20">
            <div className="lg:text-6xl sm:text-2xl md:text-3xl">{`Welcome, ${user?.user[0]?.attrs?.firstName} ${user?.user[0]?.attrs?.lastName}!`}</div>
            <div className="ml-auto">
                <ProfilePage />
            </div>
        </div>
    )
}

// npm install --legacy-peer-deps