import { Fade, TableCell, TableCellProps } from "@mui/material";
import './TableCell.css';


interface TableCellComponentProps extends TableCellProps {
    align?: "inherit" | "left" | "center" | "right" | "justify";
    children: React.ReactNode;
}

export function TableCellComponent({ align = "left", children, ...other }: TableCellComponentProps) {
    return (
        <TableCell
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

