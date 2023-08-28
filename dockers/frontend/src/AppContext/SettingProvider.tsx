import { ReactNode, createContext, useState } from 'react';

interface SettingContextType {
    isGlobalDirty: boolean;
    setIsGlobalDirty: (isGlobalDirty: boolean) => void;
}

export const SettingContext = createContext<SettingContextType>({
    isGlobalDirty: false,
    setIsGlobalDirty: () => { },
});


const SettingProvider = ({ children }: { children: ReactNode }) => {
    const [isGlobalDirty, setIsGlobalDirty] = useState<boolean>(false);

    return (
        <SettingContext.Provider value={{ isGlobalDirty, setIsGlobalDirty }}>
            {children}
        </SettingContext.Provider>
    );
};

export default SettingProvider;