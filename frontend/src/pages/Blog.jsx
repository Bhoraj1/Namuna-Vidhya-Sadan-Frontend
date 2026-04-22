import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useGetBlogCategoryQuery } from "../redux/features/categorySlice";
import { useGetBlogQuery } from "../redux/features/contentSlice";
import HeroContainer from "../components/shared/HeroContainer";
import { BlogSkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import Pagination from "../components/shared/Pagination";
import bgImg from "../assets/img/student.jpg";
import Button from "../components/ButtonComponent.jsx";

// Number of blog posts per page
const ITEMS_PER_PAGE = 8;

const Blog = () => {
  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_IMG_URL;

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const {
    data: blogCategoryData,
    isLoading: catLoading,
    refetch: refetchCategories,
  } = useGetBlogCategoryQuery(undefined, { refetchOnMountOrArgChange: true });

  const {
    data: blogData,
    isLoading: blogLoading,
    refetch: refetchBlogs,
  } = useGetBlogQuery(undefined, { refetchOnMountOrArgChange: true });

  const blog = blogData?.data || [];
  const blogCategory = blogCategoryData?.data || [];

  const filteredBlogs = useMemo(() => {
    return selectedCategory === null
      ? blog
      : blog.filter((item) => item.category_id === selectedCategory);
  }, [blog, selectedCategory]);

  // Paginate filtered blogs client-side
  const totalPages = Math.ceil(filteredBlogs.length / ITEMS_PER_PAGE);
  const paginatedBlogs = useMemo(
    () =>
      filteredBlogs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredBlogs, currentPage],
  );

  // Reset to page 1 when category changes
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleReadMore = (blogId) => navigate(`/blog/${blogId}`);

  // Loading State
  if (blogLoading || catLoading) return <BlogSkeleton />;

  // Error State
  if ((!blogData && !blogLoading) || (!blogCategoryData && !catLoading))
    return <ErrorMessage message="Failed to load blog posts." />;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroContainer bgImage={bgImg} title="Blog" subtitle="Explore our Blog" />

      <div className=" ml-8 mr-6 min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50">
        <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-8 sm:py-10 md:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-10 md:mb-12">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-3 sm:mb-4">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Latest Articles
              </h2>
              {/* Refresh Button */}
            </div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
              Stay updated with our latest news, insights, and educational
              content
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8 sm:mb-10 md:mb-12 px-2">
            <Button
              onClick={() => handleCategoryChange(null)}
              disabled={selectedCategory === null}
              className={`px-6 py-3 rounded-full font-medium ${
                selectedCategory === null
                  ? "bg-third-color text-white shadow-lg scale-105 cursor-default"
                  : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-third-color"
              }`}
            >
              All Posts
            </Button>
            {blogCategory.map((cat) => (
              <Button
                key={cat.category_id}
                onClick={() => handleCategoryChange(cat.category_id)}
                disabled={selectedCategory === cat.category_id}
                className={`px-6 py-3 rounded-full font-medium ${
                  selectedCategory === cat.category_id
                    ? "bg-third-color text-white shadow-lg scale-105 cursor-default"
                    : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-third-color"
                }`}
              >
                {cat.category_name}
              </Button>
            ))}
          </div>

          {/* Results Count */}
          <div className="text-center mb-8">
            <p className="text-gray-600">
              <span className="font-semibold text-third-color">
                {filteredBlogs.length}
              </span>
              {filteredBlogs.length === 1 ? " article" : " articles"}
            </p>
          </div>

          {/* Blog Grid */}
          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {paginatedBlogs.map((post, index) => (
                  <article
                    key={post.id || post._id}
                    className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-100 flex flex-col"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Image */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={
                          post.isStatic
                            ? post.image
                            : `${baseurl}/${post.image_url}`
                        }
                        alt={post.title}
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop&auto=format&q=80";
                        }}
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-white/95 backdrop-blur-sm shadow-sm px-3 py-1 rounded-full text-third-color text-xs font-semibold">
                          {post.isStatic
                            ? post.category_name
                            : blogCategory.find(
                                (cat) => cat.category_id === post.category_id,
                              )?.category_name || "General"}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col grow">
                      <div className="flex items-center text-xs text-gray-500 mb-3">
                        <span>
                          {post.published_date
                            ? new Date(post.published_date).toLocaleDateString(
                                "en-US",
                                {
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                },
                              )
                            : post.created_at
                              ? new Date(post.created_at).toLocaleDateString(
                                  "en-US",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  },
                                )
                              : "Recent"}
                        </span>
                        <span className="mx-2">•</span>
                        <span>5 min read</span>
                      </div>

                      <h2 className="text-xl font-bold text-gray-900 leading-tight group-hover:text-third-color transition-colors line-clamp-2 mb-3">
                        {post.title}
                      </h2>

                      <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed grow mb-4">
                        {post.description
                          ? (() => {
                              const div = document.createElement("div");
                              div.innerHTML = post.description;
                              return div.textContent || div.innerText || "";
                            })()
                          : "Learn more about this topic in our detailed guide."}
                      </p>

                      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                        <span className="bg-third-color/10 text-third-color px-3 py-1 rounded-full text-sm font-semibold">
                          {post.isStatic
                            ? post.category_name
                            : blogCategory.find(
                                (cat) => cat.category_id === post.category_id,
                              )?.category_name || "General"}
                        </span>
                        {!post.isStatic && (
                          <Button
                            onClick={() => handleReadMore(post.id || post._id)}
                            className="text-third-color text-sm font-semibold flex items-center gap-1 hover:gap-2"
                            icon={
                              <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 5l7 7-7 7"
                                />
                              </svg>
                            }
                            iconPosition="right"
                          >
                            Read More
                          </Button>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={(page) => setCurrentPage(page)}
              />
            </>
          ) : (
            /* Empty State */
            <div className="text-center py-20">
              <h3 className="text-2xl font-semibold text-gray-600 mb-2">
                {selectedCategory
                  ? "No articles found"
                  : "No articles available"}
              </h3>
              <p className="text-gray-500 mb-6">
                {selectedCategory
                  ? "Try selecting a different category"
                  : "Articles will be available soon"}
              </p>
              {selectedCategory && (
                <Button
                  onClick={() => handleCategoryChange(null)}
                  className="px-6 py-3 bg-third-color text-white rounded-full font-medium hover:shadow-lg"
                >
                  Show All Posts
                </Button>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Blog;
