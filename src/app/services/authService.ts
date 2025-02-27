export const getToken = () => {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [name, value] = cookie.split("=");
        if (name === "myAuthToken") {
            return value;
        }
    }
    return null;
};
export const isLoggedIn = () => {
    return !!getToken();
};

export const login = (token: string) => {
    document.cookie = `myAuthToken=${token}; path=/;`;
};

export const logout = () => {
    document.cookie = "myAuthToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};