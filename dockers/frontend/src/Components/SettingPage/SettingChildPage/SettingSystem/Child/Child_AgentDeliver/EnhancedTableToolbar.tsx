import { Toolbar, Typography } from "@mui/material";

interface EnhancedTableToolbarProps {
	numSelected: number;
}

export function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
	const { numSelected } = props;

	return (
		<Toolbar
			style={{ padding: "5px 10px", backgroundColor: "#F5F5F5" }}
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				// ...(numSelected > 0 && {
				//     bgcolor: (theme) =>
				//         alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
				// }),
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				color="inherit"
				variant="subtitle1"
				component="div"
			>
				
				<div
					style={{
						width: '100%',
						display: "flex",
						alignItems: "flex-end",
					}}
				>
					<p style={{ marginRight:10, color:'rgba(0, 0, 0, 0.6)' }}>已勾選</p>
					<p>{numSelected}</p>
				</div>
			</Typography>
		</Toolbar>
	);
}