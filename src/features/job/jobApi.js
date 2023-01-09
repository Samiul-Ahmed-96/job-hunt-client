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

    deleteJob: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/job/${id}`,
      }), 
      invalidatesTags : ['jobs']
    }),

    applyJob: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/apply",
        body: data,
      }),
    }),

    askedQuestion: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/query",
        body: data,
      }),
      invalidatesTags: ["job"],
    }),
    replyQues: builder.mutation({
      query: (data) => ({
        method: "PATCH",
        url: "/reply",
        body: data,
      }),
      invalidatesTags: ["job"],
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
      providesTags: ["job", "jobs"],
    }),
    getAppliedJobs: builder.query({
      query: (email) => ({
        url: `/applied-jobs/${email}`,
      }),
    }),
  }),
});

export const {
  usePostJobMutation,
  useGetJobByIdQuery,
  useGetJobQuery,
  useApplyJobMutation,
  useGetAppliedJobsQuery,
  useAskedQuestionMutation,
  useReplyQuesMutation,
  useDeleteJobMutation
} = jobApi;
