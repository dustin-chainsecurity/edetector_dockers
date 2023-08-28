import * as React from 'react';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

const icon = (
    <div>
        {/* 在這邊放提示字 */}
        <h1 style={{color:"#757575"}}>請選擇主機、分析條件、時間</h1>
    </div>
);

export default function HintWord() {
    const [checked, setChecked] = React.useState(true);
    return (
        <Box sx={{ height: 180 }}>
            <Box sx={{ display: 'flex' }}>
                <Fade in={checked} timeout={5000}>
                        {icon}
                </Fade>
            </Box>
        </Box>
    );
}