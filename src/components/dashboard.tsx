import Audit from "./audit";
import AuditRatioCard from "./audit-ratio";
import Calendar from "./calendar";
import Status from "./status";
import Xps from "./xps";
import Level from "./level";
import Work from "./work";
import GraphProject from "./xpsByProject";
import XPOverTimeGraph from "./xpsOverTime";
import { useUser } from "@/app/context/userContext";

export default function Dashboard() {
    const { loader } = useUser();
    if (!loader) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-h-screen auto-rows-fr">
                {/* Bloc 1 - Rank */}
                <Level />

                {/* Bloc 2 - What's Up */}
                <Work />

                {/* Bloc 3 - Audits ratio */}
                <AuditRatioCard />

                {/* Bloc 4 - Audits */}
                <Audit />

                {/* Bloc 5 - Active Status */}
                <Status />

                {/* Bloc 6 - Amont Xp */}
                <Xps />

                {/* Bloc 7 - Calendar */}
                <Calendar />

                {/* Bloc 8 - Graph Project */}
                <GraphProject />

                {/* Bloc 9 - Graph Over Time */}
                <XPOverTimeGraph />
            </div>
        );
    }
}