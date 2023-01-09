import apiSlice from "../api/apiSlice";

const userApi = apiSlice.injectEndpoints({
    endpoints : (builder) => ({
        getUser:builder.query({
            query:()=>({
                url:"/users"
            })
        }),
        getUserById:builder.query({
            query:(id)=>({
                url:`/users/${id}`
            })
        })
    })
})

export const {useGetUserQuery , useGetUserByIdQuery} = userApi;