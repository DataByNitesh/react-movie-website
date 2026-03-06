const API_URL = '/api/auth';

const register = async (userData) => {
    // using Vite proxy or full URL
    const response = await fetch(`http://localhost:9000${API_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong during registration");
    }

    if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
};

const login = async (userData) => {
    const response = await fetch(`http://localhost:9000${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong during login");
    }

    if (data.token) {
        localStorage.setItem("user", JSON.stringify(data));
    }

    return data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem("user"));
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
