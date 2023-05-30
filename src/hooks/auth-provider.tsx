import React, { createContext, useCallback, useContext, useState } from "react";
import api from "../services/api";

interface AuthState {
    token: string;
    user: object;
}

interface SignInCredentials {
    email: string;
    password: string;
}

interface SignUpCredentials {
    name: string;
    email: string;
    password: string;
}

interface AuthContextData {
    name: string;
    token: string;
    user: object;
    signIn({ email, password }: SignInCredentials): Promise<void>;
    signUp({ name, email, password }: SignUpCredentials): Promise<void>;
    signOut(): void;
}


const AuthContext = createContext<AuthContextData>({} as AuthContextData);

interface IAuthProvider {
    children: React.ReactNode;
}

export function AuthProvider({ children }: IAuthProvider) {
    const [name, setName] = useState("");

    const [data, setData] = useState<AuthState>((): AuthState => {
        const token = localStorage.getItem("@Feedback:token");
        const user = localStorage.getItem("@Feedback:user");

        if (token && user) {
            setName(JSON.parse(user).name);

            return {
                token,
                user: JSON.parse(user)
            }
        }

        return {} as AuthState;
    })

    const signIn = useCallback(async ({email, password }: SignInCredentials) => {
        const response = await api.post("/login", {
            email, 
            password
        });

        const { token, user } = response.data;
        
        localStorage.setItem("@Feedback:token", token);
        localStorage.setItem("@Feedback:user", JSON.stringify(user));

        setData({ token, user });
        setName(user.name);
    }, []);

    const signUp = useCallback(async ({email, password }: SignInCredentials) => {
        await api.post("/register", {
            email, 
            password
        });
    }, []);

    const signOut = useCallback(() => {
        localStorage.removeItem("@Feedback:token");
        localStorage.removeItem("@Feedback:user");

        setData({} as AuthState);
    }, []);

    return (
        <AuthContext.Provider value={ { name, token: data.token, user: data.user, signIn, signUp, signOut } }>
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return authContext;
}