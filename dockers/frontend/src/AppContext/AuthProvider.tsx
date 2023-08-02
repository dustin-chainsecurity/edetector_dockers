import Cookies from 'js-cookie';
import { ReactNode, createContext, useState } from 'react';

interface AuthContextType {
    token: string | null;
    setToken: (token: string | null) => void;
    isLogin: boolean;
    setIsLogin: (isLogin: boolean) => void;
}

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => { },
    isLogin: false,
    setIsLogin: () => { },
});


const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(Cookies.get('token') || null);
    const [isLogin, setIsLogin] = useState<boolean>(false);

    return (
        <AuthContext.Provider value={{ token, setToken, isLogin, setIsLogin }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;


