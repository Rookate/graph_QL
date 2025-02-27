'use client';

import { useEffect, useState, createContext, useContext } from "react";
import { useAuth } from "./AuthContext";
import { fetchUserData, fetchProjectsData, fetchCursusData, fetchCursusInfoData, fetchAuditData, fetchXpByCursus, fetchUserLevelByCursus, fetchLastProject } from "../services/apiService";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<{ user: User[] }>({ user: [] });
    const [projects, setProjects] = useState<Project[]>([]);
    const [cursus, setCursus] = useState<Cursus[]>([]);
    const [audit, setAudit] = useState<Audit[]>([]);
    const [level, setLevel] = useState<number | null>(null);
    const [xps, setXps] = useState<number | null>(null);
    const [selectedCursus, setSelectedCursus] = useState<number | null>(null);
    const [project, setLastProject] = useState<LastProject | undefined>(undefined);
    const [completedEffects, setCompletedEffects] = useState<number>(0);

    const { isUser } = useAuth();

    // Utiliser un effet pour gérer isLoading
    const isLoading = completedEffects < 8;

    // Récupérer les informations utilisateur
    useEffect(() => {
        const getUserData = async () => {
            try {
                const data = await fetchUserData();
                setUser(data);
            } catch (error) {
                console.error("Erreur lors du chargement des données utilisateur:", error);
            } finally {
                setCompletedEffects(prev => prev + 1);
            }
        };
        getUserData();
    }, [isUser]);

    // Récupérer les projets
    useEffect(() => {
        if (selectedCursus !== null) {
            const getProjectsData = async () => {
                try {
                    const data = await fetchProjectsData(selectedCursus);
                    setProjects(data?.transaction);
                } catch (error) {
                    console.error("Erreur lors du chargement des projets:", error);
                } finally {
                    setCompletedEffects(prev => prev + 1);
                }
            };
            getProjectsData();
        }
    }, [selectedCursus, isUser]);

    // Récupérer les données cursus
    useEffect(() => {
        const getCursusData = async () => {
            try {
                const data = await fetchCursusData();
                const eventIds = data?.user[0]?.events.map((event: EventData) => event.event.id);
                const infoPromises = eventIds?.map((id: number) => fetchCursusInfoData(id));

                const cursusDetails = infoPromises ? await Promise.all(infoPromises) : [];
                const selectedCursus = cursusDetails
                    .map(cursus => cursus.event.find((event: Event) => event.object.type === "module"))
                    .filter(event => event !== undefined);

                const selectedCursusId = selectedCursus ? selectedCursus[0]?.id : null;

                setCursus(cursusDetails);
                setSelectedCursus(selectedCursusId);
            } catch (error) {
                console.error("Erreur lors du chargement des cursus:", error);
            } finally {
                setCompletedEffects(prev => prev + 1);
            }
        };
        getCursusData();
    }, [isUser]);

    // Récupérer les données d'audit
    useEffect(() => {
        const getAuditData = async () => {
            try {
                const data = await fetchAuditData(user?.user[0]?.login);
                setAudit(data?.audit);
            } catch (error) {
                console.error("Erreur lors du chargement des données d'audit:", error);
            } finally {
                setCompletedEffects(prev => prev + 1);
            }
        };
        getAuditData();
    }, [user, isUser]);

    // Récupérer les XP par cursus
    useEffect(() => {
        if (selectedCursus !== null) {
            const getXpByCursus = async () => {
                try {
                    const xps = await fetchXpByCursus(selectedCursus);
                    setXps(xps?.transaction_aggregate?.aggregate?.sum?.amount);
                } catch (error) {
                    console.error("Erreur lors du chargement des XP:", error);
                } finally {
                    setCompletedEffects(prev => prev + 1);
                }
            };
            getXpByCursus();
        }
    }, [selectedCursus, isUser]);

    // Récupérer le niveau de l'utilisateur
    useEffect(() => {
        if (selectedCursus !== null) {
            const getLevelByCursus = async () => {
                try {
                    const level = await fetchUserLevelByCursus(user?.user[0]?.login, selectedCursus);
                    setLevel(level?.event_user[0]?.level);
                } catch (error) {
                    console.error("Erreur lors du chargement du niveau utilisateur:", error);
                } finally {
                    setCompletedEffects(prev => prev + 1);
                }
            };
            getLevelByCursus();
        }
    }, [selectedCursus, user, isUser]);

    // Récupérer le dernier projet
    useEffect(() => {
        const getLastProject = async () => {
            try {
                const project = await fetchLastProject();
                setLastProject(project?.progress[0]);
            } catch (error) {
                console.error("Erreur lors du chargement du dernier projet:", error);
            } finally {
                setCompletedEffects(prev => prev + 1);
            }
        };
        getLastProject();
    }, [isUser]);

    return (
        <UserContext.Provider value={{ user, loader: isLoading, projects, cursus, audit, selectedCursus, xps, level, project, setSelectedCursus, fetchData: fetchUserData }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
};