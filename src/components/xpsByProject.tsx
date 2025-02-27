import { useUser } from "@/app/context/userContext";
import { capitalizeFirstLetter } from "@/app/lib/utils";
import { useRef, useEffect, useState } from "react";

export default function GraphProject() {
    const { projects } = useUser();
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const reversedProjects = projects && [...projects]?.reverse();

    useEffect(() => {
        if (containerRef.current) {
            setDimensions({
                width: containerRef.current.clientWidth,
                height: containerRef.current.clientHeight
            });
        }
    }, []);

    const { width, height } = dimensions;
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };

    if (width === 0 || height === 0) return <div ref={containerRef} className="col-span-2 row-span-2 p-6 bg-[var(--bgLevel3)]"></div>;

    const maxXP = reversedProjects && Math.max(...reversedProjects?.map(p => p.amount), 1);
    const barWidth = reversedProjects && (width - margin.left - margin.right) / (reversedProjects?.length || 1);

    return (
        <div ref={containerRef} className="col-span-2 row-span-2 bg-[var(--bgLevel3)] py-2 flex flex-col justify-center items-end w-full h-full">
            <div className="flex w-full p-7 text-xl text-start">Distribution of Xps by Project</div>
            <svg width={width} height={height}>
                {reversedProjects && reversedProjects?.map((project, index) => {
                    const barHeight = (project.amount / maxXP) * (height - margin.top - margin.bottom);
                    const x = margin.left + index * barWidth + barWidth * 0.1;
                    const y = height - margin.bottom - barHeight;
                    const name = project.isBonus ? project.attrs.reason : project.object.name;
                    const type = project.isBonus ? "Bonus" : capitalizeFirstLetter(project.object.type);


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
                                        fontSize="12"
                                    >
                                        {project.amount}
                                    </text>
                                    {/* Nom du projet */}
                                    <text
                                        x={width / 2}
                                        y={height - 10}
                                        textAnchor="middle"
                                        fill="white"
                                        fontSize="18"
                                    >
                                        {`${type} - ${name}`}
                                    </text>
                                </>
                            )}
                        </g>
                    );
                })}
            </svg>
        </div>
    );
}