import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: ["Employee", "Corp", "SiteReq", "LeaveReq", "Machine", "Rental"],
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
        const { id } = payload;
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
    getLeaveReqs: builder.query({
      query: () => "/leave-requests",
      providesTags: ["LeaveReq"],
    }),
    approveDeclineLeaveReq: builder.mutation({
      query: (payload) => {
        const { id, isApproved } = payload;
        return {
          url: `/leave-requests/${id}/${isApproved}`,
          method: "PUT",
        };
      },
      invalidatesTags: ["LeaveReq"],
    }),
    getMachines: builder.query({
      query: () => "/machines",
      providesTags: ["Machine"],
    }),
    addMachine: builder.mutation({
      query: (payload) => ({
        url: "/machines",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Machine"],
    }),
    updateMachine: builder.mutation({
      query: (payload) => {
        const { id } = payload;
        return {
          url: `/machines/${id}`,
          method: "PUT",
          body: payload,
        };
      },
      invalidatesTags: ["Machine"],
    }),
    deleteMachine: builder.mutation({
      query: (id) => ({
        url: `/machines/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Machine"],
    }),
    getRentals: builder.query({
      query: () => "/machinery-rentals",
      providesTags: ["Rental"],
    }),
    addRental: builder.mutation({
      query: (payload) => ({
        url: "/machinery-rentals",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Rental"],
    }),
    getMachinesByRental: builder.query({
      query: (rentalId) => `/machines/rentals/${rentalId}`,
      providesTags: ["Machine"],
    }),
    deleteRental: builder.mutation({
      query: (id) => ({
        url: `/machinery-rentals/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Rental"],
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
  useApproveDeclineLeaveReqMutation,
  useGetLeaveReqsQuery,
  useAddMachineMutation,
  useAddRentalMutation,
  useGetMachinesQuery,
  useGetRentalsQuery,
  useGetMachinesByRentalQuery,
  useDeleteMachineMutation,
  useDeleteRentalMutation,
  useUpdateMachineMutation,
} = apiSlice;
