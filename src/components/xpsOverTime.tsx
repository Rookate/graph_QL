import { useUser } from "@/app/context/userContext";
import { capitalizeFirstLetter, formatDate, formatTaille } from "@/app/lib/utils";
import { useRef, useEffect, useState } from "react";

export default function XPOverTimeGraph() {
    const { projects, xps } = useUser();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // Tri des projets par date croissante
    const reversedProjects = projects && [...projects]?.reverse();

    // Calcul de l'XP cumulatif
    let cumulativeXP = 0;
    const cumulativeData = reversedProjects && reversedProjects?.map(p => {
        cumulativeXP += p.amount;
        return { ...p, cumulativeXP };
    });

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

        window.addEventListener("resize", handleResize);

        // Nettoyage
        return () => {
            clearTimeout(timer);
            clearTimeout(resizeTimer);
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const { width, height } = dimensions;

    // Ajuster les marges selon la taille de l'écran
    const margin = {
        top: 50,
        right: width < 640 ? 40 : 60,
        bottom: 50,
        left: width < 640 ? 40 : 60
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

    const maxXP = cumulativeXP;
    const minDate = reversedProjects && new Date(reversedProjects[0]?.createdAt).getTime();
    const maxDate = reversedProjects && new Date(reversedProjects[reversedProjects.length - 1]?.createdAt).getTime();

    const scaleX = (date: string) => {
        const time = new Date(date).getTime();
        return margin.left + ((time - minDate) / (maxDate - minDate)) * (width - margin.left - margin.right);
    };

    const scaleY = (xp: number) => {
        return height - margin.bottom - (xp / maxXP) * (height - margin.top - margin.bottom - 10);
    };

    // Ajuster la taille du texte selon la largeur
    const titleFontSize = width < 640 ? "text-lg" : "text-xl";
    const dateFontSize = width < 640 ? "10" : "12";
    const xpFontSize = width < 640 ? "10" : "12";
    const projectNameFontSize = width < 640 ? "10" : "12";
    const totalFontSize = width < 640 ? "12" : "14";

    // Ajuster la taille des points selon l'écran
    const pointRadius = width < 640 ? 1.5 : 2;

    return (
        <div
            ref={containerRef}
            className="row-span-1 col-span-2 md:col-span-3 lg:col-span-2 lg:row-span-2 bg-[var(--bgLevel3)] py-2 flex flex-col w-full h-64 md:h-auto"
        >
            <div className={`flex w-full px-4 md:px-7 py-2 ${titleFontSize} text-start`}>
                Cumulative XP Over Time
            </div>
            <div className="flex-grow relative">
                <svg width={width} height={height - 60} preserveAspectRatio="xMidYMid meet">
                    {/* Lignes reliant les points (progression continue) */}
                    {cumulativeData && cumulativeData?.map((project, index) => {
                        if (index === 0) return null;

                        const x1 = scaleX(cumulativeData[index - 1].createdAt);
                        const y1 = scaleY(cumulativeData[index - 1].cumulativeXP);
                        const x2 = scaleX(project.createdAt);
                        const y2 = scaleY(project.cumulativeXP);

                        return (
                            <line
                                key={index}
                                x1={x1}
                                y1={y1}
                                x2={x2}
                                y2={y2}
                                stroke="grey"
                                strokeWidth={width < 640 ? "1.5" : "2"}
                            />
                        );
                    })}

                    {/* Points du graphique */}
                    {cumulativeData && cumulativeData?.map((project, index) => {
                        const x = scaleX(project.createdAt);
                        const y = scaleY(project.cumulativeXP);
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
                                <circle cx={x} cy={y} r={pointRadius} fill="white" />

                                {/* Affichage du tooltip au survol */}
                                {hoveredIndex === index && (
                                    <>
                                        <text
                                            x={x}
                                            y={y - (width < 640 ? 25 : 35)}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize={dateFontSize}
                                            fontWeight="bold"
                                        >
                                            {project.createdAt && formatDate(project.createdAt)}
                                        </text>
                                        <text
                                            x={x}
                                            y={y - (width < 640 ? 10 : 15)}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize={xpFontSize}
                                            fontWeight="bold"
                                        >
                                            +{project.amount} XP
                                        </text>

                                        <text
                                            x={width / 2}
                                            y={height - 70}
                                            textAnchor="middle"
                                            fill="white"
                                            fontSize={projectNameFontSize}
                                            fontWeight="bold"
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

                    {/* Total final affiché à droite */}
                    <text
                        x={width - (width < 640 ? width / 3 : width / 6)}
                        y={height - 70}
                        textAnchor="start"
                        fill="white"
                        fontSize={totalFontSize}
                        fontWeight="bold"
                    >
                        Total: {xps && formatTaille(xps)}
                    </text>
                </svg>
            </div>
        </div>
    );
}