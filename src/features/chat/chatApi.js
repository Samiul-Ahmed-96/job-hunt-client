import apiSlice from "../api/apiSlice";

const chatApi = apiSlice.injectEndpoints({
    endpoints:(builder) =>({
        postChat : builder.mutation({
            query:(data)=>({
                url:'/chat',
                method:"POST",
                body:data
            })
        }),
    })
})

export const {usePostChatMutation} = chatApi;