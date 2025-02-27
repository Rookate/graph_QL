import { useUser } from "@/app/context/userContext";

export default function ProfileInfo() {
    const { user } = useUser();
    let formattedDate

    const dateStr = user?.user[0]?.attrs?.dateOfBirth;
    if (dateStr) {
        const date = new Date(dateStr);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        formattedDate = `${day}/${month}/${year}`;
    } else {
        console.error("Date de naissance non disponible");
    }
    const profileData = [
        { label: "First Name", value: user?.user[0]?.attrs?.firstName || "Non renseigné" },
        { label: "Last Name", value: user?.user[0]?.attrs?.lastName || "Non renseigné" },
        { label: "Phone Number", value: user?.user[0]?.attrs?.Phone || "Non renseigné" },
        { label: "Gender", value: user?.user[0]?.attrs?.gender || "Non renseigné" },
        { label: "Country", value: user?.user[0]?.attrs?.country || "Non renseigné" },
        { label: "Date of birth", value: formattedDate || "Non renseigné" },
        { label: "Organisation", value: user?.user[0]?.attrs?.foundus || "Non renseigné" }
    ];

    return (
        <div className="flex flex-col text-lg text-[var(--neutral)]">
            {profileData.map((item, index) => (
                <div key={index} className={`pb-2 ${index !== 0 ? "pt-6" : "pt-2"} border-b-[.5px] border-[var(--grey50)]`}>
                    <div className="font-semibold">{item.label}</div>
                    <div>{item.value}</div>
                </div>
            ))}
        </div>
    );
}