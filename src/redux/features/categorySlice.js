import { indexSlice } from "./indexSlice";
export const categoryApi = indexSlice.injectEndpoints({
  endpoints: (builder) => ({
    getGalleryCategory: builder.query({
      query: () => ({
        url: "/api/category/gallery",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getNoticeCategory: builder.query({
      query: () => ({
        url: "/api/category/notice",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getVacancyCategory: builder.query({
      query: () => ({
        url: "/api/category/vacancy",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getBlogCategory: builder.query({
      query: () => ({
        url: "/api/category/blog",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getTeamCategory: builder.query({
      query: () => ({
        url: "/api/category/team",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategoryClass: builder.query({
      query: () => ({
        url: "/api/category/class",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategoryExam: builder.query({
      query: () => ({
        url: "/api/category/exam",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
    getCategorGallery: builder.query({
      query: () => ({
        url: "/api/category/gallery",
        method: "GET",
      }),
      providesTags: ["category"],
    }),
  }),
});
export const {
  useGetGalleryCategoryQuery,
  useGetNoticeCategoryQuery,
  useGetBlogCategoryQuery,
  useGetVacancyCategoryQuery,
  useGetTeamCategoryQuery,
} = categoryApi;
