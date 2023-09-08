/** @format */

import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from "@mui/material";
import React, { ReactNode, createContext, useContext, useRef, useState } from "react";
import Toast from "../hooks/useToast";

interface IAlertContext {
	// useAlert 
	dialogOpen: boolean;
	setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	content: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
	onConfirm: () => void;
	setOnConfirm: React.Dispatch<React.SetStateAction<() => void>>;
	isButtonOpen: boolean;
	setIsButtonOpen: React.Dispatch<React.SetStateAction<boolean>>;

	// useToast
	toasts: IToast[];
	setToasts: React.Dispatch<React.SetStateAction<IToast[]>>;
	toastCount: React.MutableRefObject<number>;
}
export interface IToast {
	content : string ;
	id : number ;
	type? : "success" | "error" | "warning" | "info" ;
}

export const AlertContext = createContext<IAlertContext>({
	dialogOpen: false,
	setDialogOpen: () => {},
	content: "",
	setContent: () => {},
	onConfirm: () => {},
	setOnConfirm: () => {},
	isButtonOpen: false,
	setIsButtonOpen: () => {},
	toasts: [],
	setToasts: () => {},
	toastCount: {current: 0},
});

export const AlertProvider = ({ children }: { children: ReactNode }) => {
	// useAlert
	const [dialogOpen, setDialogOpen] = useState(false);
	const [content, setContent] = useState("");
	const [onConfirm, setOnConfirm] = useState<() => void>(() => {}); // 增加 onConfirm 的 state
	const [isButtonOpen, setIsButtonOpen] = useState(false);

	//useToast
	const [toasts, setToasts] = useState<IToast[]>([]);
	const toastCount = useRef(0);

	const remove = (id: number) => {
		const newToasts = toasts.filter(item => item.id !== id);
		setToasts(newToasts);
	};
	  // avoid creating a new fn on every render
	const onDismiss = (id: number) => () => {  
		remove(id);
	}

	return (
		<AlertContext.Provider
			value={{
				dialogOpen,
				setDialogOpen,
				content,
				setContent,
				onConfirm,
				setOnConfirm,
				isButtonOpen,
				setIsButtonOpen,

				toasts,
				setToasts,
				toastCount
			}}
		>
			{children}
			<AlertComponent />
			{toasts.map((toast, idx)=>{
				return <Toast content={toast.content} id={toast.id} key={`${toast.id}-toast`} onDismiss={onDismiss} type={toast.type}/>
			})}
		</AlertContext.Provider>
	);
};

const AlertComponent = () => {
	const {
		dialogOpen,
		content,
		onConfirm,
		setDialogOpen,
		setOnConfirm,
		isButtonOpen,
		setIsButtonOpen,
	} = useContext(AlertContext);

	const handleClose = () => {
		setDialogOpen(false);
		setOnConfirm(() => {}); // 清空 onConfirm
		setIsButtonOpen(false);
	};

	const resolvePromise = (onConfirm: () => void) => {
		return new Promise((resolve, reject) => {
			resolve(onConfirm());
			reject(new Error("系統錯誤，請回報開發人員"));
		});
	};

	const handleConfirmClick = () => {
		resolvePromise(onConfirm)
			.then(() => {
				handleClose();
			})
			.catch((error) => {
				alert(error);
			});
	};

	return (
		<Dialog
			open={dialogOpen}
			onClose={handleClose}
			sx={{
				"& .MuiDialog-paper": {
					width: "444px",
				},
			}}
		>
			<DialogTitle
				sx={{
					backgroundColor: "#D32F2F",
					color: "white",
					padding: "5px 15px",
					fontSize: "1rem",
				}}
			>
				{"提醒"}
			</DialogTitle>
			<DialogContent style={{ padding: "20px 10px 5px 10px" }}>
				<DialogContentText
					style={{
						color: "black",
						fontSize: "1rem",
						padding: "5px 10px",
					}}
				>
					{content}
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				{isButtonOpen && (
					<Button
						onClick={handleConfirmClick}
						sx={{ color: "#D32F2F" }}
					>
						確認
					</Button>
				)}
				<Button
					onClick={handleClose}
					sx={{ color: "rgba(0, 0, 0, 0.6)" }}
				>
					關閉
				</Button>
			</DialogActions>
		</Dialog>
	);
};

