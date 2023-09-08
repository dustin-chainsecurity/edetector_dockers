import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

interface IItemComponent {
    label: string;
    buttonLabel: string;
    onClick: () => void;
}

const ItemComponent = (props: IItemComponent) => {
    const { label, buttonLabel, onClick } = props;
    return (
        <div style={{ width: 300, padding: 20 ,display:"flex",height:40,alignItems:"center"}}>
            <span style={{height:"100%",display:"flex",alignItems:"center",fontSize:20}}> {label}:</span>
            <div style={{flexGrow:"1"}}>
                <Button variant="contained" onClick={onClick} style={{display:"flex",float:"right"}}>{buttonLabel}</Button>

            </div>
        </div>
    )
}
export default ItemComponent;