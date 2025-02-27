import { useUser } from "@/app/context/userContext";

export default function MedicalInfo() {
    const { user } = useUser();

    const profileData = [
        { label: "Emergency contact", value: user?.user[0]?.attrs?.emergencyAffiliation || "Non renseigné" },
        { value: user?.user[0]?.attrs?.emergencyFirstName || "Non renseigné" },
        { value: user?.user[0]?.attrs?.emergencyLastName || "Non renseigné" },
        { value: user?.user[0]?.attrs?.emergencyTel || "Non renseigné" },
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