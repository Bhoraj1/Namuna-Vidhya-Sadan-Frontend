import React, { useState, useMemo } from "react";
import HeroContainer from "../components/shared/HeroContainer";
import { TeamSkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import bgImg from "../assets/img/group.jpg";
import { useGetTeamQuery } from "../redux/features/TeamSlice";
import { useGetTeamCategoryQuery } from "../redux/features/categorySlice";

const Team = () => {
  const {
    data: teamData,
    isLoading: teamLoading,
    error: teamError,
  } = useGetTeamQuery();

  const { data: categoryData, isLoading: categoryLoading } =
    useGetTeamCategoryQuery();

  const [selectedCategory, setSelectedCategory] = useState(null);

  const IMG_URL = import.meta.env.VITE_IMG_URL;
  const team = teamData?.data || [];
  const categories = categoryData?.data || [];

  // Set default category to first category when categories are loaded
  React.useEffect(() => {
    if (categories.length > 0 && selectedCategory === null) {
      const firstCategory = categories[0];
      const categoryId =
        firstCategory.id || firstCategory._id || firstCategory.category_id;
      setSelectedCategory(categoryId);
    }
  }, [categories, selectedCategory]);

  // Filter team members based on selected category
  const filteredTeam = useMemo(() => {
    let result = [...team];

    if (selectedCategory !== null) {
      result = result.filter((member) => {
        return (
          member.category_id === selectedCategory ||
          member.category === selectedCategory
        );
      });
    }

    return result;
  }, [team, selectedCategory]);

  if (teamLoading || categoryLoading) {
    return <TeamSkeleton />;
  }

  if (teamError) return <ErrorMessage message="Failed to load team members." />;

  return (
    <>
      <div className="w-full">
        {/* Hero Section */}
        <HeroContainer bgImage={bgImg} title="Our team" subtitle="" />

        <div className=" ml-8 mr-6 min-h-screen bg-linear-to-br from-gray-50 via-white to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Header */}
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-third-color mb-3 sm:mb-4">
                Meet Our Team
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-4">
                Dedicated professionals committed to excellence in education
              </p>
            </div>

            {/* Category Filter */}
            {categories.length > 0 && (
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-2">
                  {categories.map((category) => {
                    const categoryId =
                      category.id || category._id || category.category_id;
                    const categoryName =
                      category.category_name || category.name;

                    return (
                      <button
                        key={categoryId || `category-${category.id}`}
                        onClick={() => {
                          setSelectedCategory(
                            selectedCategory === categoryId ? null : categoryId,
                          );
                        }}
                        className={`px-3 sm:px-6 py-2 sm:py-3 rounded-full font-medium transition-all duration-300 text-sm sm:text-base ${
                          selectedCategory === categoryId
                            ? "bg-third-color text-white shadow-lg transform scale-105"
                            : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 hover:border-third-color"
                        }`}
                      >
                        {categoryName}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Results Count */}
            <div className="text-center mb-6 sm:mb-8">
              <p className="text-sm sm:text-base text-gray-600">
                {selectedCategory !== null && (
                  <span>
                    <span className="font-semibold text-third-color">
                      {categories.find((cat) => {
                        const categoryId = cat.id || cat._id || cat.category_id;
                        return categoryId === selectedCategory;
                      })?.category_name ||
                        categories.find((cat) => {
                          const categoryId =
                            cat.id || cat._id || cat.category_id;
                          return categoryId === selectedCategory;
                        })?.name}
                    </span>
                  </span>
                )}
              </p>
            </div>

            {/* Team Grid */}
            {selectedCategory !== null && filteredTeam.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {filteredTeam.map((member, index) => {
                  const categoryName =
                    categories.find((cat) => {
                      const categoryId = cat.id || cat._id || cat.category_id;
                      return categoryId === member.category_id;
                    })?.category_name ||
                    categories.find((cat) => {
                      const categoryId = cat.id || cat._id || cat.category_id;
                      return categoryId === member.category_id;
                    })?.name ||
                    member.category;

                  return (
                    <div key={member.id} className="group">
                      <div className="bg-white  shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                        {/* Member Photo */}
                        <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                          <img
                            src={
                              member.image
                                ? `${IMG_URL}/${member.image}`
                                : "/api/placeholder/300/300"
                            }
                            alt={member.name || member.full_name}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        {/* Member Info */}
                        <div className="p-4 sm:p-6">
                          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                            {member.name || member.full_name}
                          </h3>
                          <p className="text-third-color font-medium mb-2 text-sm sm:text-base">
                            {member.position || member.designation}
                          </p>

                          {member.description && (
                            <p className="text-gray-600 text-xs sm:text-sm line-clamp-3">
                              {member.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : selectedCategory === null ? (
              <div className="text-center py-16 px-4">
                <h3 className="text-lg font-semibold text-gray-500 mb-1">
                  Select a Category
                </h3>
                <p className="text-sm text-gray-400">
                  Choose a category above to view team members
                </p>
              </div>
            ) : (
              <div className="text-center py-16 px-4">
                <h3 className="text-lg font-semibold text-gray-500 mb-1">
                  No team members found
                </h3>
                <p className="text-sm text-gray-400">
                  No members available in this category
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
