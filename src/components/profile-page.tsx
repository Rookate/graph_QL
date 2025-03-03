'use client';

import { useEffect, useRef, useState } from 'react';
import Icon from './ui/profile-icone';
import ArrowDown from './ui/arrowDown';
import CloseButton from './ui/closeButton';
import { useUser } from '@/app/context/userContext';

import ProfileInfo from './menus/ProfileInfo';
import Settings from './menus/Settings';
import MedicalInfo from './menus/MedicalInfo';
import ChangeEmail from './menus/ChangeEmail';

export default function ProfilePage() {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useUser();
    const panelRef = useRef<HTMLDivElement | null>(null);
    const [openMenu, setOpenMenu] = useState<string | null>(null); // Gère quel menu est ouvert

    const menuComponents: { [key: string]: React.FC } = {
        profile: ProfileInfo,
        settings: Settings,
        stats: MedicalInfo,
        email: ChangeEmail
    };

    const togglePanel = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Liste des sous-menus
    const menuItems = [
        { id: "profile", title: "Dites-nous en plus à votre sujet" },
        { id: "settings", title: "Additional informations" },
        { id: "stats", title: "Medical informations" },
        { id: "email", title: "Change email" }
    ];

    // Fonction pour gérer l'ouverture/fermeture des sous-menus
    const toggleMenu = (id: string) => {
        setOpenMenu(prevId => (prevId === id ? null : id));
    };

    return (
        <div className="relative">
            <div className="ml-auto cursor-pointer" onClick={togglePanel}>
                <Icon />
            </div>

            {/* Panneau latéral */}
            <div
                ref={panelRef}
                className={`fixed top-0 right-0 w-full sm:w-1/2 h-full z-10 transition-transform ease-in-out duration-700 p-10 bg-[var(--bgLevel2)] ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                <div className="p-4 text-white overflow-auto h-full" style={{ scrollbarWidth: 'none' }}>
                    <div className='absolute top-4 right-10 cursor-pointer' onClick={togglePanel}>
                        <CloseButton />
                    </div>
                    <h2 className='text-4xl mb-5'>{user?.user[0]?.attrs?.firstName} {user?.user[0]?.attrs?.lastName}</h2>
                    <h3 className='text-xl text-[var(--textMinimal)]'>{`# ${user?.user[0]?.login}`}</h3>

                    {/* Menu principal */}
                    <div className="mt-6 space-y-2">
                        {menuItems.map((item) => {
                            const MenuComponent = menuComponents[item.id];
                            const isOpen = openMenu === item.id;

                            return (
                                <div key={item.id} className="bg-[var(--bgLevel3)] p-4 rounded-lg">
                                    {/* Titre cliquable */}
                                    <div
                                        className="flex justify-between items-center cursor-pointer"
                                        onClick={() => toggleMenu(item.id)}
                                    >
                                        <span className="text-xl">{item.title}</span>
                                        <span className="text-2xl transition-transform duration-300 ease-in-out"
                                            style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
                                            {<ArrowDown />}
                                        </span>
                                    </div>

                                    <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? "max-h-[1000px] opacity-100 mt-3" : "max-h-0 opacity-0"}`}>
                                        {MenuComponent && <MenuComponent />}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}