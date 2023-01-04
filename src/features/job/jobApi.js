import apiSlice from "../api/apiSlice";

const jobApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postJob: builder.mutation({
      query: (data) => ({
        method: "POST",
        url: "/job",
        body: data,
      }),
      invalidatesTags: ["jobs"],
    }),

    applyJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
      }),
    }),

    getJob: builder.query({
      query: () => ({
        url: "/jobs",
      }),
      providesTags: ["jobs"],
    }),
    getJobById: builder.query({
      query: (id) => ({
        url: `/job/${id}`,
      }),
    }),
  }),
});

export const { usePostJobMutation, useGetJobByIdQuery, useGetJobQuery , useApplyJobMutation } =
  jobApi;
