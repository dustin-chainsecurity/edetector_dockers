import { ReactNode, createContext, useState } from 'react';
import { DetectGrid_HeadCell, ITimeForm, TactionType, headCells } from '../constant/interfaceBoard';

interface DetectContextType {
    scheduleScan: boolean;
    setScheduleScan: React.Dispatch<React.SetStateAction<boolean>>;
    scanModule: boolean;
    setScanModule: React.Dispatch<React.SetStateAction<boolean>>;
    selectedId: readonly string[];
    setSelectedId: React.Dispatch<React.SetStateAction<readonly string[]>>;
    scheduleForensics: boolean;
    setScheduleForensics: React.Dispatch<React.SetStateAction<boolean>>;
    scheduleDownload: boolean;
    setScheduleDownload: React.Dispatch<React.SetStateAction<boolean>>;
    scheduleForensicsTime: ITimeForm;
    setScheduleForensicsTime: React.Dispatch<React.SetStateAction<ITimeForm>>;
    scheduleDownloadTime: ITimeForm;
    setScheduleDownloadTime: React.Dispatch<React.SetStateAction<ITimeForm>>;
    dectectiveHead: readonly DetectGrid_HeadCell[];
    setDectectiveHead: React.Dispatch<React.SetStateAction<readonly DetectGrid_HeadCell[]>>;
}

export const DetectContext = createContext<DetectContextType>({
    scheduleScan: false,
    setScheduleScan: () => { },
    scanModule: false,
    setScanModule: () => { },
    selectedId: [],
    setSelectedId: () => { },
    scheduleForensics: false,
    setScheduleForensics: () => { },
    scheduleDownload: false,
    setScheduleDownload: () => { },
    scheduleForensicsTime: {
        date: 30,
        time: 12
    },
    setScheduleForensicsTime: () => { },
    scheduleDownloadTime: {
        date: 30,
        time: 12
    },
    setScheduleDownloadTime: () => { },
    dectectiveHead: headCells,
    setDectectiveHead: () => { }
});



const DetectProvider = ({ children }: { children: ReactNode }) => {

    const [scheduleScan, setScheduleScan] = useState(false)
    const [scanModule, setScanModule] = useState(false) // 偵測模式
    const [selectedId, setSelectedId] = useState<readonly string[]>([]);
    const [scheduleForensics, setScheduleForensics] = useState(false);
    const [scheduleDownload, setScheduleDownload] = useState(false);
    const [scheduleForensicsTime, setScheduleForensicsTime] = useState<ITimeForm>({ date: 30, time: 12 })
    const [scheduleDownloadTime, setScheduleDownloadTime] = useState<ITimeForm>({ date: 30, time: 12 })
    const [dectectiveHead, setDectectiveHead] = useState<readonly DetectGrid_HeadCell[]>(headCells)

    return (
        <DetectContext.Provider value={{
            scheduleScan, setScheduleScan, scanModule, setScanModule,
            selectedId, setSelectedId, scheduleForensics, setScheduleForensics,
            scheduleDownload, setScheduleDownload, scheduleForensicsTime, setScheduleForensicsTime,
            scheduleDownloadTime, setScheduleDownloadTime, dectectiveHead, setDectectiveHead
        }}>
            {children}
        </DetectContext.Provider>
    );
};

export default DetectProvider;


