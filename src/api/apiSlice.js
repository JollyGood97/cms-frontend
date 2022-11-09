import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["Employee", "Corp", "SiteReq"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => "/employees",
      providesTags: ["Employee"],
    }),
    addEmployee: builder.mutation({
      query: (payload) => ({
        url: "/employees",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Employee"],
    }),
    updateEmployee: builder.mutation({
      query: (payload) => {
        const { id, ...body } = payload;
        return {
          url: `/employees/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Employee"],
    }),
    getCorps: builder.query({
      query: () => "/engineering-corps",
      providesTags: ["Corp"],
    }),
    addCorp: builder.mutation({
      query: (payload) => ({
        url: "/engineering-corps",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Corp"],
    }),
    getEmployeesByCorp: builder.query({
      query: (corpId) => `/employees/corps/${corpId}`,
      providesTags: ["Employee"],
    }),
    deleteCorp: builder.mutation({
      query: (id) => ({
        url: `/engineering-corps/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Corp"],
    }),
    getSiteReqs: builder.query({
      query: () => "/site-requests",
      providesTags: ["SiteReq"],
    }),
    markCompleteSiteReq: builder.mutation({
      query: (payload) => {
        const { id, isComplete } = payload;
        return {
          url: `/site-requests/${id}/${isComplete}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["SiteReq"],
    }),
  }),
});
export const {
  useAddEmployeeMutation,
  useGetEmployeesQuery,
  useDeleteEmployeeMutation,
  useUpdateEmployeeMutation,
  useGetCorpsQuery,
  useAddCorpMutation,
  useGetEmployeesByCorpQuery,
  useDeleteCorpMutation,
  useGetSiteReqsQuery,
  useMarkCompleteSiteReqMutation,
} = apiSlice;
