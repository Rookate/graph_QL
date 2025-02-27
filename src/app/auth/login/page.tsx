'use client';

import { useState, useEffect } from "react";
import Image from 'next/image';
import { useAuth } from "../../context/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email, password);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col w-full items-center justify-center min-h-screen ">
            <div>
                <Image className="object-contain fixed top-5 left-5" src="/Zone01.png" alt="Description de l'image" width={150} height={150} />
            </div>
            <h1 className="text-2xl mb-6">Welcome to Zone 01</h1>
            <form onSubmit={handleSubmit} className="flex flex-col w-1/3 gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="p-4 border rounded"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-4 border rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">Login</button>
            </form>
        </div>
    );
}