export const loginUser = async (email: string, password: string) => {
    const credentials = btoa(`${email}:${password}`);
    try {
        const res = await fetch("https://zone01normandie.org/api/auth/signin", {
            method: "POST",
            headers: {
                Authorization: `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
        });

        if (!res.ok) throw new Error("Échec de l'authentification");

        const token = await res.json();
        document.cookie = `myAuthToken=${token}; path=/; max-age=86400`;

        return token;
    } catch (error) {
        console.error("Erreur de connexion :", error);
        return null;
    }
};

export const logoutUser = () => {
    document.cookie = "myAuthToken=; path=/; max-age=0";
    window.location.href = "/auth/login"
};