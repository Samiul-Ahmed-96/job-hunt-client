import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getUser:builder.query({
            query:()=>({
                url:"/users"
            })
        })
    })
})

export const {useGetUserQuery} = userApi;