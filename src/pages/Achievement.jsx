import React, { useState, useMemo } from "react";
import { useGetAchivementQuery } from "../redux/features/academicSlice";
import HeroContainer from "../components/shared/HeroContainer";
import ErrorMessage from "../components/shared/ErrorMessage";
import Pagination from "../components/shared/Pagination";
import bgImg from "../assets/img/scphoto.jpg";

// Number of achievements per page
const ITEMS_PER_PAGE = 8;

// Skeleton for achievement cards
const AchievementSkeleton = () => (
  <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
      <div
        key={i}
        className="bg-white rounded-xl shadow p-3 sm:p-4 animate-pulse"
      >
        <div className="h-40 sm:h-48 bg-gray-300 rounded-lg mb-3 sm:mb-4" />
        <div className="h-5 w-3/4 bg-gray-300 rounded mb-2" />
        <div className="h-4 w-full bg-gray-300 rounded mb-1" />
        <div className="h-4 w-2/3 bg-gray-300 rounded" />
      </div>
    ))}
  </div>
);

const Achievement = () => {
  const baseURL = import.meta.env.VITE_IMG_URL;
  const { data: achievement, isLoading, error } = useGetAchivementQuery();
  const [currentPage, setCurrentPage] = useState(1);

  const achievementData = achievement?.data || [];

  // Paginate achievements client-side
  const totalPages = Math.ceil(achievementData.length / ITEMS_PER_PAGE);
  const paginatedAchievements = useMemo(
    () =>
      achievementData.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [achievementData, currentPage],
  );

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <HeroContainer
        title="Our Achievements"
        subtitle="Celebrating success and milestones"
        bgImage={bgImg}
      />

      <div className=" ml-8 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-6 sm:py-8 md:py-10">
        {/* Section Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Achievements
          </h2>
          <p className="text-gray-500 mt-1 sm:mt-2 text-sm sm:text-base">
            Highlights of our accomplishments
          </p>
        </div>

        {/* Loading State */}
        {isLoading && <AchievementSkeleton />}

        {/* Error State */}
        {error && (
          <ErrorMessage message="Failed to load achievements. Please try again." />
        )}

        {/* Empty State */}
        {!isLoading && !error && achievementData.length === 0 && (
          <p className="text-center text-gray-400 text-sm sm:text-base py-12">
            No achievements found
          </p>
        )}

        {/* Achievement Grid */}
        {!isLoading && !error && paginatedAchievements.length > 0 && (
          <>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {paginatedAchievements.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300 p-3 sm:p-4"
                >
                  {/* Achievement Image */}
                  <div className="h-40 sm:h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={`${baseURL}/${item.image_urls}`}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Achievement Info */}
                  <div className="mt-3 sm:mt-4">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
                      {item.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">
                      🏆 {new Date(item.achievement_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Achievement;
