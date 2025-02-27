'use client';
import { useUser } from "@/app/context/userContext";
import SvgLevel from "./ui/levelSvg";

export default function Level() {
    const { level } = useUser();
    console.log("level", level)
    const totalDots = 36;

    // Création du cercle de points
    const radius = 80;
    const centerX = 100;
    const centerY = 100;
    const dots = [];

    for (let i = 0; i < totalDots; i++) {
        // Calculer l'angle pour chaque point (en radians)
        const angle = (i * (2 * Math.PI) / totalDots) - Math.PI / 2;

        // Calculer les coordonnées X et Y
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Ajouter le point au tableau
        dots.push({ x, y });
    }

    return (
        <div className="bg-[var(--greyHighlighted)] col-span-1 row-span-2 p-6">
            <div className="flex flex-col mt-6 items-center w-full">
                {/* Titre */}
                <div className="text-center mb-2">
                    <div className="text-gray-600 text-sm">Current rank</div>
                    <div className="text-gray-800 text-xl font-medium">Assistant developer</div>
                    <div className="w-12 h-0.5 bg-gray-300 mx-auto my-2"></div>
                    <div className="text-purple-600 text-sm mb-4">(See all ranks)</div>
                </div>

                {/* Indicateur de niveau avec cercle SVG */}
                <div className="relative w-56 h-56 flex justify-center items-center">
                    <svg width="200" height="200" viewBox="0 0 200 200">
                        {/* Points du cercle */}
                        {dots?.map((dot, index) => (
                            <circle
                                key={index}
                                cx={dot.x}
                                cy={dot.y}
                                r={1}
                                fill={"#1A1A1A"}
                            />
                        ))}
                    </svg>

                    {/* Cercle central */}
                    <div className="absolute inset-0 flex justify-center items-center">
                        <div className="w-32 h-32 bg-white rounded-full shadow-lg flex flex-col justify-center items-center">
                            <div className="text-gray-500 text-sm">Level</div>
                            <div className="text-gray-800 text-5xl ">{level && level}</div>
                        </div>
                    </div>
                </div>

                {/* Texte du bas */}
                <div className="text-center mt-4">
                    <div className="text-purple-600 text-sm">(See all levels)</div>
                </div>
            </div>
        </div >
    )
}