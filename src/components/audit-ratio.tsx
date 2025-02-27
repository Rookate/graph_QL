import { useUser } from "@/app/context/userContext";
import { Progress } from "@/components/ui/progress";

export default function AuditRatioCard() {
    const { user } = useUser();
    const done = user?.user[0]?.totalUp ? user?.user[0]?.totalUp : 0;
    const received = user?.user[0]?.totalDown ? user?.user[0]?.totalDown : 0;

    const splitDone = done ? done.toString().slice(0, 3) : '';
    const splitReceived = received ? received.toString().slice(0, 3) : '';


    const doneInMB = `${splitDone[0]}.${splitDone.slice(1)}`;
    const receivedInMB = `${splitReceived[0]}.${splitReceived.slice(1)}`;

    const ratio = done && received ? parseFloat((done / received).toFixed(1)) : null;
    return (
        <div className="col-span-1 p-4 bg-[var(--bgLevel3)] overflow-hidden flex flex-col text-xl hover:bg-[var(--bgLevel2)] transition-colors duration-300 shadow-lg">
            {/* Titre */}
            <h3>Audits Ratio</h3>

            {/* Barres de progression */}
            <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Done</span>
                    <span className="text-gray-300">{doneInMB} MB</span>
                </div>
                <Progress value={(done / received) * 100} className="h-1.5 bg-gray-700 rounded-none" />

                <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Received</span>
                    <span className="text-gray-300">{receivedInMB} MB</span>
                </div>
                <Progress
                    value={100}
                    className="bg-[var(--neutral)] h-1.5 rounded-none"
                />
            </div>

            {/* Chiffre clé */}
            <div className="flex items-center justify-between mt-auto">
                <div className="text-6xl text-[var(--orange25)]">{ratio}</div>

                {/* Message dynamique selon le ratio */}
                <p className={`text-sm mt-4 ${ratio && ratio < 1 ? "text-[var(--orange25)] text-end" : "text-green-400"}`}>
                    {ratio && ratio < 1 ? "Make more audits!" : "Good job!"}
                </p>
            </div>

        </div>
    );
}