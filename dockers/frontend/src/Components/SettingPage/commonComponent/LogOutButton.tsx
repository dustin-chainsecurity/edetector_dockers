import { Button } from '@mui/material'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AppContext/AuthProvider';
import Cookies from 'js-cookie';
import { useAlert } from '../../../hooks/useAlert';

const LogOutButton = () => {
    const navigate = useNavigate();
    const alert = useAlert().showAlert;
    const { setIsLogin } = useContext(AuthContext);


    const userLogout = () => {
        setIsLogin(false);
        Cookies.remove('token');
        navigate('/login');
    }

    const handleLogOut = () => {
        alert('確定要登出嗎?',userLogout);
    }

  return (
    <div style={{ width:240 }}>
        <Button 
            onClick={handleLogOut}
            variant="outlined"
            sx={{
                color: '#2196F3',
            }}
            size="small"
        >
            系統登出
        </Button>
    </div>
  )
}

export default LogOutButton


