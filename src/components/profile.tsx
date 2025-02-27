import { useUser } from "@/app/context/userContext";
import ProfilePage from "./profile-page";

export default function Profile() {
    const { user } = useUser();
    return (
        <div className="flex mt-20">
            <h1 className="text-6xl">{`Welcome, ${user?.user[0]?.attrs?.firstName} ${user?.user[0]?.attrs?.lastName}!`}</h1>
            <div className="ml-auto">
                <ProfilePage />
            </div>
        </div>
    )
}