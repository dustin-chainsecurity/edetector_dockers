import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';



interface IFormDialog {
    titleText: "新增群組" | "刪除群組";
    inputLable?: string;
    cancelAlert?: string;
    confirmText: string;
    cancelText: string;
    icon: React.ReactNode;
    confirmAction: (input: string) => void;
    selectedGroup?: number[]
}


export default function FormDialog(props: IFormDialog) {
    const { titleText, inputLable, confirmText, cancelText, icon, cancelAlert, confirmAction, selectedGroup } = props;
    const [open, setOpen] = React.useState(false);
    const [inputString, setInputString] = React.useState("")

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleConfirm = () => {
        setOpen(false);
        console.log(selectedGroup);


        confirmAction(inputString);
        // confirmAction("8");
    }
    // const confirmAction = (input: string) => {
    //     console.log(input);
    // }
    const headerBarComponent = () => {
        const height = 35;
        const width = 400;

        if (titleText === "新增群組") {
            return (
                <div style={{ height: height, width: width, backgroundColor: "#1E88E5" }}></div>
            )
        }
        if (titleText === "刪除群組") {
            return (
                <div style={{ height: height, width: width, backgroundColor: "red" }}></div>
            )
        }

    }


    return (
        <div>
            <IconButton onClick={handleClickOpen}>
                {icon}
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                {headerBarComponent()}
                <DialogTitle>
                    {titleText}
                </DialogTitle>
                {
                    inputLable && <>
                        <DialogContent>
                            <TextField
                                // autoFocus
                                margin="dense"
                                id="name"
                                label={inputLable}
                                type="text"
                                fullWidth
                                variant="standard"
                                value={inputString}
                                onChange={(e) => setInputString(e.target.value)}
                            />
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleConfirm} disabled={inputString === ""}>{confirmText}</Button>
                            <Button onClick={handleClose} sx={{color:"gray"}}>{cancelText} </Button>
                        </DialogActions>
                    </>

                }
                {
                    cancelAlert && <>
                        <DialogContent>
                            <DialogContentText>
                                {cancelAlert}
                            </DialogContentText>
                        </DialogContent>

                        <DialogActions>
                            <Button onClick={handleConfirm} sx={{color:"red"}}>{confirmText}</Button>
                            <Button onClick={handleClose} sx={{color:"gray"}}>{cancelText} </Button>
                        </DialogActions>
                    </>

                }
            </Dialog>
        </div>
    );
}