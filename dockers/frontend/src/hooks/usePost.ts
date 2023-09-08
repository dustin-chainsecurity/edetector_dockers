// /** @format */

// import { useMutation } from "@tanstack/react-query";
// import { axiosClient } from "../utiles/ProtectedRoutes";

// interface IuseFetch {
// 	root : string;
// 	route : string;
// 	body : { [x: string]: any }
// }
 
// const fetchData = async (props: IuseFetch) => {
//     const { root, route, body } = props;
//     const { data } = await axiosClient.post(`${root}${route}`, body)
//     return data;
// };

// export const usePost = () => {
//     return useMutation<IuseFetch, Error, IuseFetch>(fetchData, {
//       onSuccess: (result) => {
//         return result;
//       },
//       onError: (error) => {
//         // handle error
//         return error;
//       },
//     });
//   };

import { useMutation, UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "../utiles/ProtectedRoutes";

interface IuseFetch {
    root: string;
    route: string;
    body: { [x: string]: any };
}
interface IResponse{
    data : { [x: string]: any }
    isSuccess : boolean;
    groups? : { [x: string]: any }
  }

const fetchData = async (props: IuseFetch) => {
    const { root, route, body } = props;
    const { data } = await axiosClient.post(`${root}${route}`, body);
    return data;
};

export const usePost = (): UseMutationResult<IResponse, Error, IuseFetch> => {
    const queryClient = useQueryClient();
    
    return useMutation(fetchData, {
        onSuccess: (result, variables) => {
            // Invalidate every query with a key that starts with `variables.route`
            queryClient.invalidateQueries([variables.route]); 
        },
        // You can handle error here or just let the error propagate
    });
};

