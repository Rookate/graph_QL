'use client';

import { useState, useEffect } from "react";
import Profile from "@/components/profile";
import SkeletonProfile from "@/components/skeleton/SkeletonProfile";
import Header from "@/components/header";
import Dashboard from "@/components/dashboard";
import ArrowRight from "@/components/ui/arrowRight";
import LabelIcon from "@/components/ui/labelIcon";
import SkeletonHeader from "@/components/skeleton/SkeletonHeader";
import SkeletonDashboard from "@/components/skeleton/SkeletonDashboard";
import SkeletonLabel from "@/components/skeleton/SkeletonLabel";
import { useAuth } from "./context/AuthContext";
import { useRouter } from "next/navigation";
import { useUser } from "./context/userContext";

export default function Home() {
  const { isUser, loading } = useAuth();
  const { user, cursus, selectedCursus, loader } = useUser();
  const router = useRouter();
  const [galaxie, setGalaxie] = useState<string | undefined>(undefined);

  useEffect(() => {
    const selected = cursus && cursus
      .map(currentCursus => currentCursus.event.find(currenId => currenId.id === selectedCursus))
      .filter(event => event !== null && event !== undefined);

    setGalaxie(selected[0]?.object?.name);
  }, [selectedCursus, cursus]);


  useEffect(() => {
    if (!loading && !isUser) {
      router.push("/auth/login");
      return
    }
  }, [loading, isUser, router]);

  const isLoading = loading || loader;


  return (
    <div className="flex flex-col gap-10 p-24 pt-4">

      {isLoading ? <SkeletonProfile /> : <Profile />}

      {/* Skeleton pour le Label */}
      <div className="flex items-center gap-4 justify-start">
        {isLoading ? (
          <SkeletonLabel />
        ) : (
          <>
            <LabelIcon />
            <div>Labels:</div>
            <div className="border p-1 border-[var(--neutral)] text-sm">{(user?.user[0]?.labels[0]?.labelName)?.toUpperCase()}</div>
          </>
        )}
      </div>

      {isLoading ? <SkeletonHeader /> : <Header />}

      {/* Skeleton pour la Timeline */}
      <div>
        <div className={`flex items-center justify-between ${isLoading ? '' : 'border border-[var(--neutral)]'}  p-2`}>
          <div className="flex items-center gap-6 text-xl">
            {isLoading ? (
              <>
                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-32 animate-pulse"></div> {/* "Timeline" */}
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-48 animate-pulse"></div> {/* Description */}
              </>
            ) : (
              <>
                <div>Graph</div>
                <div className="text-[var(--textMinimal)]">Go back to your work where you left it last time!</div>
              </>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {isLoading ? (
              <div className="bg-gray-300 dark:bg-gray-700 h-6 w-6 rounded-full animate-pulse"></div> // Arrow icon skeleton
            ) : (
              <ArrowRight />
            )}
            {isLoading ? (
              <div className="bg-gray-300 dark:bg-gray-700 h-4 w-32 animate-pulse"></div>
            ) : (
              <div className="text-[var(--purple)] cursor-pointer text-sm hover:underline">
                GO TO {galaxie?.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        <div className={`flex items-center justify-between ${isLoading ? '' : 'border border-[var(--neutral)]'}  p-2`}>
          <div className="flex items-center gap-6 text-xl">
            {isLoading ? (
              <>
                <div className="bg-gray-300 dark:bg-gray-700 h-6 w-32 animate-pulse"></div> {/* "Timeline" */}
                <div className="bg-gray-300 dark:bg-gray-700 h-4 w-48 animate-pulse"></div> {/* Description */}
              </>
            ) : (
              <>
                <div>Timeline</div>
                <div className="text-[var(--textMinimal)">{`${galaxie === "Cursus" ? "Check if you're progressing as expected!" : "Check the 01 Full Stack timeline!"} `}</div>
              </>
            )}
          </div>
          <div className="flex gap-2 items-center">
            {isLoading ? (
              <div className="bg-gray-300 dark:bg-gray-700 h-6 w-6 rounded-full animate-pulse"></div> // Arrow icon skeleton
            ) : (
              <ArrowRight />
            )}
            {isLoading ? (
              <div className="bg-gray-300 dark:bg-gray-700 h-4 w-32 animate-pulse"></div>
            ) : (
              <div className="text-[var(--purple)] cursor-pointer text-sm hover:underline">
                GO TO TIMELINE
              </div>
            )}
          </div>
        </div>
      </div>

      {isLoading ? <SkeletonDashboard /> : <Dashboard />}
      {/* <ModeToggle /> */}
    </div>
  );
}