/** @format */

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React, { useContext } from "react";
import { DetectContext } from "../../../AppContext/DetectProvider";
import ActionButton from "./ActionPlug/CommonComponents/ActionButton";

const MissionAlert = () => {
	const { dialogOpen, setDialogOpen } =useContext(DetectContext);
	
    const handleClose = () => {
        setDialogOpen(false);
    };


	return (
		<Dialog
			open={dialogOpen}
			onClose={handleClose}
            sx={{
                "& .MuiDialog-paper": {
                    width: "444px",
                }
            }}
		>
        <DialogTitle sx={{ backgroundColor:'#D32F2F', color:'white', padding:'5px 15px', fontSize:'1rem' }}>{"提醒"}</DialogTitle>
        <DialogContent style={{ padding:'20px 10px 5px 10px' }}>
          <DialogContentText style={{ color:'black', fontSize:'1rem', padding:'5px 10px' }}>
            確認要終止任務 ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <ActionButton name="確認終止" isColor={true} /> {/* for stop mission button */}
            <Button onClick={handleClose} sx={{ color:'rgba(0, 0, 0, 0.6)' }}>取消</Button>
        </DialogActions>
        </Dialog>
	);
};

export default MissionAlert;
