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

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        updateDimensions();
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const { width, height } = dimensions;
    const margin = { top: 50, right: 60, bottom: 50, left: 60 };
    if (width === 0 || height === 0) return <div ref={containerRef} className="col-span-2 row-span-2 p-6 bg-[var(--bgLevel3)]"></div>;

    const maxXP = cumulativeXP;
    const minDate = reversedProjects && new Date(reversedProjects[0]?.createdAt).getTime();
    const maxDate = reversedProjects && new Date(reversedProjects[reversedProjects.length - 1]?.createdAt).getTime();

    const scaleX = (date: string) => {
        const time = new Date(date).getTime();
        return margin.left + ((time - minDate) / (maxDate - minDate)) * (width - margin.left - margin.right);
    };

    const scaleY = (xp: number) => {
        return height - margin.bottom - (xp / maxXP) * (height - margin.top - margin.bottom);
    };

    return (
        <div ref={containerRef} className="col-span-2 row-span-2 bg-[var(--bgLevel3)] py-2 flex flex-col justify-center items-end w-full h-full">
            <div className="flex w-full px-7 py-2 text-xl text-start">Cumulative XP Over Time</div>
            <svg width={width} height={height}>

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
                            strokeWidth="2"
                        />
                    );
                })}

                {/* Points du graphique */}
                {cumulativeData && cumulativeData?.map((project, index) => {
                    const x = scaleX(project.createdAt);
                    const y = scaleY(project.cumulativeXP);
                    const name = project.isBonus ? project.attrs.reason : project.object.name;
                    const type = project.isBonus ? "Bonus" : capitalizeFirstLetter(project.object.type);

                    return (
                        <g
                            key={index}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            <circle cx={x} cy={y} r={2} fill="white" />

                            {/* Affichage du tooltip au survol */}
                            {hoveredIndex === index && (
                                <>
                                    <text
                                        x={x}
                                        y={y - 35}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        {project.createdAt && formatDate(project.createdAt)}
                                    </text>
                                    <text
                                        x={x}
                                        y={y - 15}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        +{project.amount} XP
                                    </text>

                                    <text
                                        x={width / 2}
                                        y={height - 10}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="12"
                                        fontWeight="bold"
                                    >
                                        {`${type} - ${name}`}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}

                {/* Total final affiché à droite */}
                <text
                    x={width - (width / 5)}
                    y={height - 10}
                    textAnchor="start"
                    fill="white"
                    fontSize="14"
                    fontWeight="bold"
                >
                    Total: {xps && formatTaille(xps)}
                </text>

            </svg>
        </div >
    );
}