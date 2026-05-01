import { useState, useEffect } from "react";

export default function useUser() {
    const [user, setUser] = useState({ type: null, token: null });
    const [isLoaded, setIsLoaded] = useState(false); // Add a loading flag

    useEffect(() => {
        const type = localStorage.getItem("userType");
        const token = localStorage.getItem("token");

        if (type || token) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setUser({ type, token });
        }
        
        setIsLoaded(true); // Signal that the client-side check is done
    }, []);

    return { ...user, isLoaded };
}