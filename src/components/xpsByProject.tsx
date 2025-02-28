import { useUser } from "@/app/context/userContext";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import { useRef, useEffect, useState } from "react";

export default function GraphProject() {
    const { projects } = useUser();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const reversedProjects = projects && [...projects]?.reverse();

    // Fonction pour mettre à jour les dimensions de manière contrôlée
    const updateDimensions = () => {
        if (containerRef.current) {
            // Obtenir les dimensions actuelles du conteneur parent
            const { clientWidth, clientHeight } = containerRef.current;

            // Définir une hauteur fixe si nécessaire
            const fixedHeight = Math.min(clientHeight, 400); // Limiter la hauteur maximale

            setDimensions({
                width: clientWidth,
                height: fixedHeight
            });
        }
    };

    useEffect(() => {
        // Mise à jour initiale avec un délai pour s'assurer que le DOM est prêt
        const timer = setTimeout(() => {
            updateDimensions();
        }, 100);

        // Écouter les changements de taille de fenêtre avec debounce
        let resizeTimer: NodeJS.Timeout;
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateDimensions();
            }, 150); // Debounce de 150ms
        };

        window.addEventListener('resize', handleResize);

        // Nettoyage
        return () => {
            clearTimeout(timer);
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const { width, height } = dimensions;

    // Ajuster les marges selon la taille de l'écran
    const margin = {
        top: 20,
        right: 20,
        bottom: width < 640 ? 60 : 40,
        left: width < 640 ? 30 : 40
    };

    // Rendu initial pendant le chargement
    if (width === 0 || height === 0)
        return (
            <div
                ref={containerRef}
                className="col-span-full row-span-1 md:col-span-2 md:row-span-2 p-6 bg-[var(--bgLevel3)] h-64"
            >
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                    Chargement du graphique...
                </div>
            </div>
        );

    const maxXP = reversedProjects && Math.max(...reversedProjects?.map(p => p.amount), 1);
    const barWidth = reversedProjects && (width - margin.left - margin.right) / (reversedProjects?.length || 1);

    // Ajuster la taille du texte selon la largeur
    const titleFontSize = width < 640 ? "text-lg" : "text-xl";
    const xpFontSize = width < 640 ? "10" : "12";
    const projectNameFontSize = width < 640 ? "14" : "18";

    return (
        <div
            ref={containerRef}
            className="row-span-1 col-span-2 md:col-span-3 lg:col-span-2 lg:row-span-2 bg-[var(--bgLevel3)] py-2 flex flex-col w-full h-64 md:h-auto"
        >
            <div className={`flex w-full p-4 md:p-7 ${titleFontSize} text-start`}>
                Distribution of Xps by Project
            </div>
            <div className="flex-grow relative">
                <svg width={width} height={height - 60} preserveAspectRatio="xMidYMid meet">
                    {reversedProjects && reversedProjects?.map((project, index) => {
                        const barHeight = (project.amount / maxXP) * (height - margin.top - margin.bottom - 60);
                        const x = margin.left + index * barWidth + barWidth * 0.1;
                        const y = height - margin.bottom - barHeight - 60;
                        const name = project?.isBonus ? project?.attrs?.reason : project?.object?.name;
                        const type = project?.isBonus ? "Bonus" : capitalizeFirstLetter(project?.object?.type);

                        // Tronquer le nom s'il est trop long sur mobile
                        const displayName = name && width < 640 && name.length > 15
                            ? `${name.substring(0, 12)}...`
                            : name;

                        return (
                            <g
                                key={index}
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* La barre */}
                                <rect
                                    x={x}
                                    y={y}
                                    width={barWidth * 0.8}
                                    height={barHeight}
                                    fill="grey"
                                />

                                {/* Texte du nombre d'XP */}
                                {hoveredIndex === index && (
                                    <>
                                        <text
                                            x={x + barWidth * 0.4}
                                            y={y - 10}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize={xpFontSize}
                                        >
                                            {project.amount}
                                        </text>

                                        {/* Nom du projet - ajusté pour éviter le débordement */}
                                        <text
                                            x={width / 2}
                                            y={height - 70}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize={projectNameFontSize}
                                        >
                                            {width < 640
                                                ? `${displayName}`
                                                : `${type} - ${displayName}`}
                                        </text>
                                    </>
                                )}
                            </g>
                        );
                    })}
                </svg>
            </div>
        </div>
    );
}