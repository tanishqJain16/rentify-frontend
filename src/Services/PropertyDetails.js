import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const propertyDetailsApi = createApi({
    reducerPath: 'propertyDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_API_LOCAL_URL}/user` }),
    endpoints: (builder) => ({
        getAllProperty: builder.query({
            query: () => ({
                url: '/getAllProperties',
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
        }),
        addProperty: builder.mutation({
            query: (body) => ({
                url: '/addProperty',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: body,
            }),
        }),
        getUserProperty: builder.query({
            query: (body) => ({
                url: '/getUserProperty',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: body,
            }),
        }),
        deleteProperty: builder.mutation({
            query: (body) => ({
                url: `/deleteProperty/${body.id}`,
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            }),
        }),
        updateProperty: builder.mutation({
            query: (body) => ({
                url: `/editProperty/${body.id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: body.body,
            }),
        }),
    }),
});

export const { useAddPropertyMutation, useGetUserPropertyQuery, useDeletePropertyMutation, useUpdatePropertyMutation, useGetAllPropertyQuery } = propertyDetailsApi;