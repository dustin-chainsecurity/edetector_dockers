import { Button } from '@mui/material'
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../AppContext/AuthProvider';
import Cookies from 'js-cookie';

const LogOutButton = () => {
    const navigate = useNavigate();
    const { setIsLogin } = useContext(AuthContext);

    const handleLogOut = () => {
        const logout = window.confirm('確定要登出嗎?');
        if (logout) {
            setIsLogin(false);
            Cookies.remove('token');
            navigate('/login');
        }
        else return
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


