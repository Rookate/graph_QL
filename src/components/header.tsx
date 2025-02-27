'use client';

import { useUser } from '@/app/context/userContext';
import { useState } from 'react';

export default function Header() {
    const { cursus, setSelectedCursus } = useUser();
    const [currentCursus, setCurrentCursus] = useState(1)

    return (
        <div className="flex justify-between">
            {cursus && cursus?.map((section, index) => (
                <div
                    key={index}
                    className={`flex-1 p-4  cursor-pointer transition-colors duration-500`}
                    style={{ backgroundColor: currentCursus === index ? 'var(--purpleFill)' : 'var(--bgLevel3)' }}
                    onClick={() => {
                        setSelectedCursus(section.event[0].id);
                        setCurrentCursus(index);
                    }}
                >
                    <div className="flex gap-2 text-2xl">
                        <h3>{section.event[0]?.object.name}</h3>
                        <p>{`# ${section.event[0].id}`}</p>
                    </div>
                    {section.event[0].parent && <p className='text-xs text-[var(--neutral)] mb-1'>in {section.event[0].parent.object.name} #{section.event[0].parent.id}</p>}
                    <p className='text-xs text-[var(--neutral)]'>{`${(section.event[0]?.startAt).split("T")[0]} > ${(section.event[0]?.endAt).split("T")[0]}`}</p>
                </div>
            ))}
        </div>
    );
}