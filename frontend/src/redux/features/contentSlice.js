import { indexSlice } from "./indexSlice";
export const contentApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGallery: builder.query({
      query: () => ({
        url: "/api/content/gallery",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getGalleryCategories: builder.query({
      query: () => ({
        url: "/api/content/gallery/categories",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getNotice: builder.query({
      query: () => ({
        url: "/api/content/notice",
        method: "GET",
      }),
      providesTags: ["content"],
      keepUnusedDataFor: 0, // Don't cache data
    }),
    getVacancy: builder.query({
      query: () => ({
        url: "/api/content/vacancy",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
    getBlog: builder.query({
      query: () => ({
        url: "/api/content/blog",
        method: "GET",
      }),
      providesTags: ["content"],
    }),
  }),
});
export const {
  useGetNoticeQuery,
  useGetGalleryQuery,
  useGetBlogQuery,
  useGetVacancyQuery,
} = contentApi;
