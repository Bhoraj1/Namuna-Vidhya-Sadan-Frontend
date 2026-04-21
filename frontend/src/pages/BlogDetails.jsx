import React, { useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBlogCategoryQuery } from "../redux/features/categorySlice";
import { useGetBlogQuery } from "../redux/features/contentSlice";
import HeroContainer from "../components/shared/HeroContainer";
import bgImg from "../assets/img/student_group.jpg";
import Button from "../components/ButtonComponent";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_IMG_URL;

  const [activeCategory, setActiveCategory] = useState(null);

  // API
  const { data: blogCategoryData, isLoading: catLoading } =
    useGetBlogCategoryQuery();

  const { data: blogData, isLoading: blogLoading } = useGetBlogQuery();

  const blogs = blogData?.data || [];
  const categories = blogCategoryData?.data || [];

  // Current Blog
  const currentBlog = useMemo(() => {
    return blogs.find(
      (b) =>
        String(b.id) === String(id) ||
        String(b._id) === String(id) ||
        String(b.blog_id) === String(id),
    );
  }, [blogs, id]);

  // Category with Blogs
  const categoryWithBlogs = useMemo(() => {
    return categories.map((cat) => ({
      ...cat,
      blogs: blogs.filter((b) => b.category_id === cat.category_id),
    }));
  }, [categories, blogs]);

  const currentCategory = categories.find(
    (cat) => cat.category_id === currentBlog?.category_id,
  );

  // Loading
  if (blogLoading || catLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin h-10 w-10 border-b-2 border-blue-500 rounded-full"></div>
      </div>
    );
  }

  // Not Found
  if (!currentBlog) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Blog Not Found</h2>
        <button
          onClick={() => navigate("/blog")}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded"
        >
          Back to Blog
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero */}
      <HeroContainer bgImage={bgImg} title="Blog Details" />

      {/* 🔥 GRID LAYOUT */}
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ================= LEFT CONTENT ================= */}
        <div className="lg:col-span-2">
          {/* Image */}
          {currentBlog.image_url && (
            <img
              src={`${baseurl}/${currentBlog.image_url}`}
              alt={currentBlog.title}
              className="w-full h-80 object-cover rounded-xl mb-6"
            />
          )}

          {/* Category */}
          <span className="text-sm text-blue-600 font-semibold">
            {currentCategory?.category_name || "General"}
          </span>

          {/* Title */}
          <h1 className="text-3xl font-bold mt-2 mb-4">{currentBlog.title}</h1>

          {/* Date */}
          <p className="text-gray-500 mb-6">
            {currentBlog.created_at
              ? new Date(currentBlog.created_at).toLocaleDateString()
              : "Recent"}
          </p>

          {/* Description (HTML Render) */}
          {currentBlog.description && (
            <div
              className="text-lg text-gray-700 mb-6"
              dangerouslySetInnerHTML={{
                __html: currentBlog.description,
              }}
            />
          )}

          {/* Back Button */}
          <Button
            onClick={() => navigate("/blog")}
            className="mt-10 px-6 py-3 bg-third-color text-white rounded-lg hover:bg-gray-800 transition"
          >
            ← Back to Blog
          </Button>
        </div>

        {/* ================= SIDEBAR ================= */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-xl p-5 sticky top-20">
            <h3 className="text-lg font-bold mb-4">Categories</h3>

            {categoryWithBlogs.map((cat) => (
              <div key={cat.category_id} className="mb-3">
                {/* Category */}
                <button
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === cat.category_id
                        ? null
                        : cat.category_id,
                    )
                  }
                  className="w-full text-left font-semibold cursor-pointer text-gray-800 hover:text-third-color"
                >
                  {cat.category_name}
                </button>

                {/* Sub Blogs */}
                {activeCategory === cat.category_id && (
                  <ul className="mt-2 ml-3 space-y-1 ">
                    {cat.blogs.map((b) => (
                      <li key={b.id}>
                        <button
                          onClick={() => navigate(`/blog/${b.id}`)}
                          className={`text-sm cursor-pointer ${
                            b.id === currentBlog.id
                              ? "text-third-color font-bold "
                              : "text-gray-600 hover:text-third-color"
                          }`}
                        >
                          • {b.title}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
