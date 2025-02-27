import { useUser } from "@/app/context/userContext";

export default function Settings() {

    const { user } = useUser();

    const profileData = [
        { label: "Birth information", value: user?.user[0]?.attrs?.placeOfBirth || "Non renseigné" },
        { label: "Country", value: user?.user[0]?.attrs?.country || "Non renseigné" },
        { label: "Adress", value: user?.user[0]?.attrs?.addressStreet || "Non renseigné" },
        { value: user?.user[0]?.attrs?.addressComplementStreet || "Non renseigné" },
        { value: user?.user[0]?.attrs?.addressPostalCode || "Non renseigné" },
        { value: user?.user[0]?.attrs?.addressCity || "Non renseigné" },
        { value: user?.user[0]?.attrs?.country || "Non renseigné" },
        { label: "Vos attentes et objectifs pour la formation", value: user?.user[0]?.attrs?.attentes || "Non renseigné" },
        { label: "Professional status", value: user?.user[0]?.attrs?.Situation }

    ];

    return (
        <div className="flex flex-col text-lg text-[var(--neutral)]">
            {profileData.map((item, index) => (
                <div key={index} className={`pb-2  ${index !== 0 ? "pt-6" : "pt-2"} border-b-[.5px] border-[var(--grey50)]`}>
                    <div className={`font-semibold ${index === 7 ? 'pb-4' : ''}`}>{item.label}</div>
                    <div className={` ${index > 6 ? 'text-base' : ''}`}>{item.value}</div>
                </div>
            ))}
        </div>
    );
}