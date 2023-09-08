import { Link, useNavigate } from 'react-router-dom'
import './CommonHeader.css'


const CommonHeader = ({ isDarkTheme }: { isDarkTheme: boolean }) => {
    const navigate = useNavigate();
    const navigateTo = (path: string) => {
        navigate(path);
    }

    return (
        <div className='App-background container' style={{ padding: '5px 10px' }}>

                <Link to='/' className='headerLogo headerButton'>eDetector</Link>

            <div>
                <Link to='/' className='headerButton'>監測工作台</Link>
                <Link to='/detect' className='headerButton'>蒐證任務</Link>
                <Link to='/analysis' className='headerButton'>分析</Link>
            </div>
            <span className='settingButton headerButton' onClick={()=>{navigateTo('/setting')}}>
                設定
            </span>
        </div>
    )
}

export default CommonHeader

