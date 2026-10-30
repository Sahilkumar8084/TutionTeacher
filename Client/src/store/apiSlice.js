import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../config.js";
import { boardSchema } from "../schemas/board.js";

export const BOARD_KEY = "board";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    explain: builder.mutation({
      query: ({ question, message, history ,canvas ,language}) => {
        console.log("Request bhej raha hoon:", { question, message, history });
        return {
          url: "/api/explain",
          method: "POST",
          body: { question, message, history ,canvas ,language},
        };
      },
      transformResponse: (response) => {
        console.log("API response aaya:", response);
        return boardSchema.parse(response); // galat shape ho to yahin error
      },
      async onQueryStarted(_args, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (err) {
          console.error("API fail hui:", err);
        }
      },
    }),
  }),
});

export const { useExplainMutation } = apiSlice;
