import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

const GridFooter = () => {

    return (
        <div style={{
            width: '100%',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            justifyContent: 'flex-end',
            height: 40,
            alignItems: 'center',
        }}>
            <p style={{ color:'#00000099', marginRight:20 }}>每頁顯示{'1000'}</p>
            {/* <div>{'1-5 of 13'}</div> */}
            <div 
                style={{
                    margin:'auto 20px',
                    cursor:'pointer'
                }}
                onClick={()=>{
                    alert('上一頁')
                }}
            >
                <KeyboardArrowLeftIcon />
            </div>
            <div 
                style={{
                    margin:'auto 20px',
                    cursor:'pointer'
                }}
                onClick={()=>{
                    alert('下一頁')
                }}
            >
                <KeyboardArrowRightIcon/>
            </div>
            
            
        </div>
    )
}

export default GridFooter