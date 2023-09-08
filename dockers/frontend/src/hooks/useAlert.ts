/** @format */

import { useContext } from "react";
import { AlertContext } from "../AppContext/AlertProvider";

export const useAlert = () => {
	const { setDialogOpen, setContent, setOnConfirm, setIsButtonOpen } =
		useContext(AlertContext);

	const showAlert = (content: string, confirmCallback?: () => void) => {
		setContent(content);

		if (confirmCallback) {
			setIsButtonOpen(true);
			setOnConfirm(() => confirmCallback);
		}
		setDialogOpen(true);
	};

	return { showAlert };
};
