/** @format */

import { Checkbox, FormControlLabel, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

interface ChildMenuItemProps {
	title: string;
	groups: string[];
	setGroups: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ChildMenuItem = (props: ChildMenuItemProps) => {
	const { title, groups, setGroups } = props;
	
	return(
		<MenuItem sx={{ minWidth:"200px" }}>
			<Checkbox
                    size='small'
                    checked={groups.includes(title)}
                    onChange={(e) => {
						if (e.target.checked) {
							setGroups([...groups, title]);
						} else {
							setGroups(groups.filter((group) => group !== title));
						}
                    }}
                />
			{title}
        </MenuItem>
	)
}