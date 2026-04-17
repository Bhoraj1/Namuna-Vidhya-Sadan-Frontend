import { indexSlice } from "./indexSlice";
export const academicApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: "/api/academic/event",
        method: "GET",
      }),
      providesTags: ["academic"],
    }),
    getAchivement: builder.query({
      query: () => ({
        url: "/api/academic/achievement",
        method: "GET",
      }),
      providesTags: ["academic"],
    }),
    getQuestionBank: builder.query({
      query: () => ({
        url: "/api/academic/question-bank",
        method: "GET",
      }),
      providesTags: ["academic"],
    }),
  }),
});
export const {
  useGetEventQuery,
  useGetAchivementQuery,
  useGetQuestionBankQuery,
} = academicApi;
