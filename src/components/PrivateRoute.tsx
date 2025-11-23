'use client';

import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";


const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const {isAuthenticated, redirectIfNotAuth} = useAuth();

    useEffect(() => {
        if (!isAuthenticated) {
            redirectIfNotAuth();
        }
    }, [isAuthenticated]);

    return isAuthenticated ? <>{children}</> : null;
}

export default PrivateRoute;