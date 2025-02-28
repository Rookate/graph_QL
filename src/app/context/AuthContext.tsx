"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { loginUser, logoutUser } from "../lib/auth";

interface AuthContextType {
    isUser: boolean | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [isUser, setUser] = useState<boolean | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = document.cookie
            .split("; ")
            .find((row) => row.startsWith("myAuthToken="))
            ?.split("=")[1];

        if (token) {
            setUser(true);
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        const token = await loginUser(email, password);

        if (!token) {
            setLoading(false);
            throw new Error("Échec de l'authentification");
        }

        setUser(true);
        router.push("/");
        setLoading(false);
    };

    const logout = () => {
        logoutUser();
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isUser, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook personnalisé
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth doit être utilisé dans AuthProvider");
    return context;
};