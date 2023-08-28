/** @format */

import { useQuery } from "@tanstack/react-query";
import { axiosClient } from "../utiles/ProtectedRoutes";

interface IuseFetch {
	root : string;
	route : string;
}

interface IResponse{
  data : { [x: string]: any }
  isSuccess : boolean;
  groups? : { [x: string]: any }
}

interface IQueryParams extends IuseFetch {
  query : string;
}

const fetchData = async (props: IuseFetch) => {
  const { root, route } = props;
  const { data } = await axiosClient.get(`${root}${route}`)
  return data;
};

export const useGet = (params: IQueryParams) => {
  const { query, root, route } = params;
  return useQuery<IResponse, Error>([query], () => fetchData({
    root,
    route
  }));
};

