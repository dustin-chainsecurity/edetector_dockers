/** @format */

import styled from "styled-components";
import { NavLink as BaseNavLink } from "react-router-dom";

export const StraightSeparator = styled.div`
	width: 1px;
	height: 30px;
	border-right: solid black 1px;
	margin-left: 5px;
	margin-right: 5px;
`;

export const NavBarContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
	width: 240px;
	height: 500px;
	margin: 10px;
`;

export const NavLink = styled(BaseNavLink)`
	text-decoration: none;
	color: black;
`;

export const SettingPageContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: flex-start;
	width: 100%;
	margin: 10px auto;
`;

export const ChildContainer = styled.div`
	width: calc(100% - 320px);
	background-color: #f5f5f5;
	padding: 20px;
`;

export const NavOutterLink = styled.p`
	width: 220px;
	cursor: pointer;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 0;
	height: 25px;
`;

export const ChildInnerWhiteContainer = styled.div`
	background-color: white;
	padding: 10px 20px;
	min-height: 600px;
`;
