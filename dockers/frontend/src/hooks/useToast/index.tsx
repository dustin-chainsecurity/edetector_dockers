import { Alert, Slide, SlideProps, Snackbar } from '@mui/material'
import { useContext, useEffect } from 'react'
import { AlertContext } from '../../AppContext/AlertProvider';

interface ToastProps {
    content : string ;
    id : number ;
    onDismiss : (id: number) => () => void ;
    type? : "success" | "error" | "warning" | "info" ;
}

function SlideTransition(props: SlideProps) {
    return <Slide {...props} direction="down" />;
  }

const Toast = (props: ToastProps) => {
    const { toasts } = useContext(AlertContext);
    const { content, onDismiss, type, id } = props ;
    const alertType = type ? type : "success" ;


    return (
        <Snackbar 
            open={toasts.length!== 0} 
            onClose={onDismiss(id)} 
            onClick={onDismiss(id)} 
            anchorOrigin={{ "vertical":"top", "horizontal" : "center" }}
            autoHideDuration={2000}
            TransitionComponent={SlideTransition}
        >
            <Alert severity={alertType} sx={{ minWidth:'300px',maxWidth:'500px' }}>{content}</Alert>
        </Snackbar>
        
    )
}
export default Toast ;
