import React, { useEffect } from 'react'
import { Checkbox } from '@mui/material';
import { useState } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form';
import { HookFormContainer, HookFormFlexBox } from '../StyledComponent';
import { Fade, TableCell, TableCellProps } from "@mui/material";


interface IGridCheck {
    // control: Control<FieldValues, any>;
	name: string;
    // field : Record<"id", string>
}

export const GridCheck = (props:IGridCheck) => {
    // const { control, name, field } = props;
    const { name } = props;
	const [checked, setChecked] = useState(false);



	return (
		<HookFormContainer>
			<HookFormFlexBox style={{ width:50 }}>
				<div style={{ width: 50, display:'flex', alignItems:'center' }}>
					<Controller
						render={({
							field: { onChange, value }
						}) => (
							<Checkbox
                                // key={field.id}
								size="small"
								value={value}
								onChange={(e)=>{
									onChange(e)
									setChecked(e.target.checked)
								}}
							/>
						)}
						name={name}
						// control={control}
						defaultValue={checked}
					/>					
				</div>		
			</HookFormFlexBox>
		</HookFormContainer>
	);
}




interface TableCellComponentProps extends TableCellProps {
    align?: "inherit" | "left" | "center" | "right" | "justify";
    children: React.ReactNode;
    minWidth? : string;
    lockHeight?: boolean;
}

export function TableCellComponent({ align = "left", children, ...other }: TableCellComponentProps) {
    const { minWidth, lockHeight } = other;
    return (
        <TableCell
            sx={{ minWidth: minWidth ? minWidth : "145px", height: lockHeight ? '20px' : 'auto' }}
            style={{ whiteSpace: "pre-line" }}
            align={align}
            {...other}
        >
            {children}
        </TableCell>
    );
}

interface TableStatusomponentProps extends TableCellProps {
    index: string;
    children: React.ReactNode;
}

export function TableStatusomponent({ children, index }: TableStatusomponentProps) {

    return (
        <Fade in={true} timeout={1000} key={index} unmountOnExit>
            <TableCell align='left'>

                {children}
            </TableCell>
        </Fade>
    );
}

interface ConditionCellcomponentProps extends TableCellProps {
    value: string | number;
}

export function ConditionCellcomponent({ value }: ConditionCellcomponentProps) {
    return typeof value === 'string' ? (
        <TableCellComponent>{value}</TableCellComponent>
    ) : (
        <TableCellComponent>
            <div>
                <span className="loading">{`${value}%`}</span>
            </div>
        </TableCellComponent>
    );
}
