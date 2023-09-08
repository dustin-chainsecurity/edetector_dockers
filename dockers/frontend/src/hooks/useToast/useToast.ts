import { useContext } from "react";
import { AlertContext, IToast } from "../../AppContext/AlertProvider";

export const useToast = () => {
    const { toastCount, toasts, setToasts } = useContext(AlertContext);
    
    const toast = (content: string) => {
		const id = toastCount.current++;
		const obj = { id, content };
		setToasts([...toasts, obj]);
	}

    const alarm = (content: string) => {
        const id = toastCount.current++;
        const obj:IToast = { id, content, type: "error" };
        setToasts([...toasts, obj]);
    }

    return { toast, alarm };
}


