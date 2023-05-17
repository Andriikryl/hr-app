import {createApi, fetchBaseQuery, retry} from "@reduxjs/toolkit/query/react"



const baseQuery = fetchBaseQuery({
    baseUrl: "https://localhost:8000/api",
});

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 1});

export const api = createApi({
    reducerPath: 'splitApi',
    baseQuery: baseQueryWithRetry,
    refetchOnMountOrArgChange: true,
    endpoints: () => ({}),
})