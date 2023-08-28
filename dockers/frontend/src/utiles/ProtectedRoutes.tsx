/** @format */

import { useContext, useEffect, useLayoutEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../AppContext/AuthProvider";
import axios from "axios";
import { API, elasticRoot, urlRoot } from "../constant";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: urlRoot,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		// 從 localStorage 將 token 取出
		const tokenAccess = Cookies.get("token");

		// 如果 token 存在的話，則帶入到 headers 當中
		if (tokenAccess) {
			config.headers["Authorization"] = `${tokenAccess}`;
		}
		return config;
	},
	(err) => Promise.reject(err)
);

export const axiosClient = axiosInstance;

const clintElastic = axios.create({
	baseURL: elasticRoot,
	headers: {
		"Content-Type": "application/json",
	},
});

export const axiosElastic = clintElastic;

const clintElasticBoxQuery = axios.create({
	baseURL: elasticRoot,
	headers: {
		"Content-Type": "application/x-ndjson",
	},
});
export const axiosElasticBoxQuery = clintElasticBoxQuery;

const ProtectedRoutes = () => {
	const tokenAccess = Cookies.get("token");
	const navigate = useNavigate();
	const { setToken, setIsLogin, isLogin } = useContext(AuthContext);

	useEffect(() => {
		if (tokenAccess) {
			console.log("tokenAccess :", tokenAccess);
			setToken(tokenAccess);
			axios
				.post(`${urlRoot}${API.loginWithToken}`, {
					token: tokenAccess,
				})
				.then((res) => {
					// console.log(res);
					if (res.data.success) {
						console.log("token有效");
						setIsLogin(true);
					} else {
						console.log("token無效");
						Cookies.remove("token");
						setIsLogin(false);
						navigate("/login");
					}
				});
		}
	}, []);

	return <div>{tokenAccess ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoutes;

//明天從這裡開始
