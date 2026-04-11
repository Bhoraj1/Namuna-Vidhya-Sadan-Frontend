import { indexSlice } from "./indexSlice";
export const teamApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => ({
        url: "/api/team",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
  }),
});
export const { useGetTeamQuery } = teamApi;
