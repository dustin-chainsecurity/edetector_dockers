/** @format */

import { CircularProgress } from "@mui/material";
import "./PartialLoading.css";
import { useEffect, useRef, useState } from "react";

interface IPartialLoadingProps {
	loading: boolean;
}

const ActionButtonLoading = (props: IPartialLoadingProps) => {
	const { loading } = props;
	const [isShown, setIsShown] = useState(false);

	useEffect(() => {
		if (loading) {
			setIsShown(true);
		} else {
			const timer = setTimeout(() => {
				setIsShown(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [loading]);

	return <>{isShown && <LoadingAnimation />}</>;
};

export default ActionButtonLoading;

const LoadingAnimation = () => {
	return (
		<div id="haha">
			<CircularProgress
				size={25}
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					marginTop: "-12px",
					marginLeft: "-12px",
					color: "#03a9f4",
				}}
				style={{ zIndex: 11 }}
			/>
			<span
				style={{
					width: "100%",
					height: "37px",
					backgroundColor: "#00000080",
					position: "absolute",
					top: "50%",
					left: "50%",
					marginTop: "-19px",
					marginLeft: "-45px",
					opacity: "0.5",
					borderRadius: "3px",
					zIndex: 10,
				}}
			/>
		</div>
	);
};
