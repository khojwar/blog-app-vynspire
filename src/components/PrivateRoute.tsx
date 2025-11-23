'use client';

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const {isAuthenticated, isInitialized, redirectIfNotAuth} = useAuth();

    useEffect(() => {
        if (isInitialized && !isAuthenticated) {
            redirectIfNotAuth();
        }
    }, [isAuthenticated, isInitialized]);

    if (!isInitialized) {
        return null;  // or a loading spinner/placehodler while auth state initializes
    }

    return isAuthenticated ? <>{children}</> : null;
}

export default PrivateRoute;
