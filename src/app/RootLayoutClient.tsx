"use client"; // Indique que ce fichier doit être traité côté client

import { usePathname } from "next/navigation";
import Link from 'next/link';
import Image from 'next/image';
import LogoutSvg from "@/components/ui/logoutSvg";
import { logoutUser } from "./lib/auth";

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const validRoutes = ["/", "/dashboard", "/profile", "/settings", "/auth/login", '/audit'];

    const isNotFoundPage = !validRoutes.includes(pathname);

    const isHiddenPage = pathname === "/auth/login" || isNotFoundPage;

    return (
        <>
            {!isHiddenPage && (
                <div className="flex items-center sticky top-0 w-full z-10 p-8 pb-2" style={{ background: 'linear-gradient(to bottom, hsl(0, 0%, 5%) 0%, rgba(0, 0, 0, 0.35) 59%, transparent 100%)' }}>
                    <Link href={"/"}>
                        <Image className="object-contain" src="/Zone01.png" alt="Description de l'image" width={100} height={100} />
                    </Link>
                    <div className="ml-auto cursor-pointer" onClick={logoutUser}>
                        <LogoutSvg />
                    </div>
                </div>
            )}
            {children}
        </>
    );
}

// "use client"; // Indique que ce fichier doit être traité côté client

// import { usePathname } from "next/navigation";
// import Link from 'next/link';
// import Image from 'next/image';
// import LogoutSvg from "@/components/ui/logoutSvg";

// export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
//     const pathname = usePathname(); // Utiliser usePathname pour vérifier l'URL

//     // Vérifier si l'on est sur la page de login
//     const isLoginPage = pathname === "/auth/login";

//     return (
//         <>
//             {!isLoginPage && (
//                 <div className="flex flex-col gap-10 p-12 overflow-auto h-screen ">
//                     {/* Ne pas afficher le Header si on est sur la page de login */}

//                     <div className="flex items-center sticky top-0 w-full z-5">
//                         <Link href={"/"}>
//                             <Image className="object-contain" src="/Zone01.png" alt="Description de l'image" width={100} height={100} />
//                         </Link>
//                         <div className="ml-auto">
//                             <LogoutSvg />
//                         </div>
//                     </div>
//                     {children}
//                 </div>
//             )}
//             {isLoginPage && (
//                 <div className="h-screen flex justify-center items-center">
//                     {children}
//                 </div>
//             )}
//         </>
//     );
// }