import { Link, useNavigate } from 'react-router-dom'
import './CommonHeader.css'
import { useContext } from 'react';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../AppContext/AuthProvider';

const CommonHeader = ({ isDarkTheme }: { isDarkTheme: boolean }) => {

    const { setIsLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const textStyles = {
        color: 'white',
        textDecoration: 'none',
        width: 50,
        cursor: 'pointer',
    }

    const handleLogin = () => {
        const logout = window.confirm('確定要登出嗎?');
        if (logout) {
            setIsLogin(false);
            Cookies.remove('token');
            navigate('/login');
        }
        else return
    }

    const navigateTo = (path: string) => {
        navigate(path);
    }

    return (
        <div className='App-background container' style={{ padding: '5px 10px' }}>
            <div style={textStyles}>
                <Link to='/' className='headerLogo' style={{ ...textStyles, marginRight: 20, }}>eDetector</Link>
            </div>
            <div>
                <Link to='/' className='headerButton' style={{ ...textStyles, }}>監測工作台</Link>
                <Link to='/detect' className='headerButton' style={{ ...textStyles, }}>蒐證任務</Link>
                <Link to='/analysis' className='headerButton' style={{ ...textStyles, }}>分析</Link>
            </div>
            {/* <span className='settingButton' style={{ ...textStyles, }} onClick={handleLogin}>
                登出
            </span> */}
            <span className='settingButton' style={{ ...textStyles, }} onClick={()=>{navigateTo('/setting')}}>
                設定
            </span>
        </div>
    )
}

export default CommonHeader

