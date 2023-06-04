import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface LoadingState {
    loading: boolean;
}

interface LoadingContextData {
    isLoading: boolean;
    startLoading(): void;
    stopLoading(): void;
}


const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

interface IAuthProvider {
    children: React.ReactNode;
}

export function LoadingProvider({ children }: IAuthProvider) {
    const [data, setData] = useState<LoadingState>({} as LoadingState);

    const startLoading = useCallback(() => {
        setData({ loading: true });
    }, []);
    
    const stopLoading = useCallback(() => {
        setData({ loading: false });
    }, []);

    return (
        <LoadingContext.Provider value={{ startLoading, stopLoading, isLoading: data?.loading } }>
            { children }
        </LoadingContext.Provider>
    );
}

export function useLoading() {
    const loadingContext = useContext(LoadingContext);

    if (!loadingContext) {
        throw new Error("useLoading must be used within an LoadingProvider");
    }

    return loadingContext;
}