import apiSlice from "../api/apiSlice";

const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postChat: builder.mutation({
      query: (data) => ({
        url: "/chat",
        method: "POST",
        body: data,
      }),
    }),
    getChats: builder.query({
      query: () => ({
        url: "/chats",
      }),
    }),
  }),
});

export const { usePostChatMutation, useGetChatsQuery } = chatApi;
