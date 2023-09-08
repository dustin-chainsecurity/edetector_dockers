/** @format */

import { Backdrop, CircularProgress } from "@mui/material";
import "./FullLoading.css";


interface FullLoadingProps {
    open: boolean;
    handleClose?: () => void;
}

const FullLoading = (props: FullLoadingProps) => {
    const { open, handleClose } = props;

    return (
        <Backdrop
            sx={{ color: '#42a5f5', zIndex: (theme) => theme.zIndex.drawer + 1, opacity: 0.6, backgroundColor:'rgb(0 0 0 / 10%)' }}
            open={open}
            onClick={handleClose}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    );
};

export default FullLoading;

