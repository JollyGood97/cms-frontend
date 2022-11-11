import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { authHeader } from "../util/Util";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080",
  }),
  tagTypes: [
    "Employee",
    "Corp",
    "SiteReq",
    "LeaveReq",
    "Machine",
    "Rental",
    "Supplier",
  ],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: () => ({
        url: "/employees",
        headers: authHeader(),
      }),
      providesTags: ["Employee"],
    }),

    addEmployee: builder.mutation({
      query: (payload) => ({
        url: "/employees",
        method: "POST",
        body: payload,
        headers: {
          ...authHeader(),
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
          headers: authHeader(),
        };
      },
      invalidatesTags: ["Employee"],
    }),
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employees/${id}`,
        method: "DELETE",
        headers: authHeader(),
      }),
      invalidatesTags: ["Employee"],
    }),
    getCorps: builder.query({
      query: () => ({
        url: "/engineering-corps",
        headers: authHeader(),
      }),
      providesTags: ["Corp"],
    }),
    addCorp: builder.mutation({
      query: (payload) => ({
        url: "/engineering-corps",
        method: "POST",
        body: payload,
        headers: {
          ...authHeader(),
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Corp"],
    }),
    getEmployeesByCorp: builder.query({
      query: (corpId) => ({
        url: `/employees/corps/${corpId}`,
        headers: authHeader(),
      }),
      providesTags: ["Employee"],
    }),
    deleteCorp: builder.mutation({
      query: (id) => ({
        url: `/engineering-corps/${id}`,
        method: "DELETE",
        headers: authHeader(),
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
      query: () => ({
        url: "/leave-requests",
        headers: authHeader(),
      }),
      providesTags: ["LeaveReq"],
    }),
    approveDeclineLeaveReq: builder.mutation({
      query: (payload) => {
        const { id, isApproved } = payload;
        return {
          url: `/leave-requests/${id}/${isApproved}`,
          method: "PUT",
          headers: authHeader(),
        };
      },
      invalidatesTags: ["LeaveReq"],
    }),
    getMachines: builder.query({
      query: () => ({
        url: "/machines",
        headers: authHeader(),
      }),
      providesTags: ["Machine"],
    }),
    addMachine: builder.mutation({
      query: (payload) => ({
        url: "/machines",
        method: "POST",
        body: payload,
        headers: {
          ...authHeader(),
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
          headers: authHeader(),
        };
      },
      invalidatesTags: ["Machine"],
    }),
    deleteMachine: builder.mutation({
      query: (id) => ({
        url: `/machines/${id}`,
        method: "DELETE",
        headers: authHeader(),
      }),
      invalidatesTags: ["Machine"],
    }),
    getRentals: builder.query({
      query: () => ({
        url: "/machinery-rentals",
        headers: authHeader(),
      }),
      providesTags: ["Rental"],
    }),
    addRental: builder.mutation({
      query: (payload) => ({
        url: "/machinery-rentals",
        method: "POST",
        body: payload,
        headers: {
          ...authHeader(),
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Rental"],
    }),
    getMachinesByRental: builder.query({
      query: (rentalId) => ({
        url: `/machines/rentals/${rentalId}`,
        headers: authHeader(),
      }),
      providesTags: ["Machine"],
    }),
    deleteRental: builder.mutation({
      query: (id) => ({
        url: `/machinery-rentals/${id}`,
        method: "DELETE",
        headers: authHeader(),
      }),
      invalidatesTags: ["Rental"],
    }),
    login: builder.mutation({
      query: (payload) => ({
        url: "/auth/signin",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    register: builder.mutation({
      query: (payload) => ({
        url: "/auth/signup",
        method: "POST",
        body: payload,
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
    }),
    getSuppliers: builder.query({
      query: () => ({
        url: "/common/supplier",
        headers: authHeader(),
      }),
      providesTags: ["Supplier"],
    }),
    addSupplier: builder.mutation({
      query: (payload) => ({
        url: "/common/supplier",
        method: "POST",
        body: payload,
        headers: {
          ...authHeader(),
          "Content-type": "application/json; charset=UTF-8",
        },
      }),
      invalidatesTags: ["Supplier"],
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
  useLoginMutation,
  useRegisterMutation,
  useGetSuppliersQuery,
  useAddSupplierMutation,
} = apiSlice;
