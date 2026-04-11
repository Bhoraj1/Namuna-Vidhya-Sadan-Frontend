import React from "react";
import { useGetAchivementQuery } from "../../redux/features/academicSlice";
import { useNavigate } from "react-router-dom";
import {
  FaAward,
  FaTrophy,
  FaMedal,
  FaStar,
  FaCalendarAlt,
  FaImage,
} from "react-icons/fa";

const RecentAchievements = () => {
  const base_url = import.meta.env.VITE_IMG_URL;
  const { data: achievementsData, isLoading, error } = useGetAchivementQuery();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <section className="py-16 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="animate-pulse">
              <div className="h-10 bg-gray-300 rounded w-80 mx-auto mb-4"></div>
              <div className="h-6 bg-gray-300 rounded w-96 mx-auto"></div>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="h-48 bg-gray-300 animate-pulse"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-300 rounded mb-3 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2 animate-pulse"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaAward className="text-red-500 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">
              Unable to Load Achievements
            </h3>
            <p className="text-gray-600">
              Please try again later or contact support if the problem persists.
            </p>
          </div>
        </div>
      </section>
    );
  }

  // Get latest 6 achievements
  const latestAchievements = achievementsData?.data?.slice(0, 6) || [];
  console.log("🔍 Latest Achievements:", latestAchievements);

  if (latestAchievements.length === 0) {
    return (
      <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaTrophy className="text-gray-400 text-2xl" />
            </div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              No Achievements Yet
            </h3>
            <p className="text-gray-500">
              Check back soon for our latest accomplishments and milestones.
            </p>
          </div>
        </div>
      </section>
    );
  }

  const getAchievementIcon = (index) => {
    const icons = [FaTrophy, FaMedal, FaStar, FaAward];
    const IconComponent = icons[index % icons.length];
    return <IconComponent className="text-2xl" />;
  };

  const getAchievementGradient = (index) => {
    const gradients = [
      "from-yellow-400 via-yellow-500 to-yellow-600", // Gold
      "from-blue-400 via-blue-500 to-blue-600", // Blue
      "from-green-400 via-green-500 to-green-600", // Green
      "from-purple-400 via-purple-500 to-purple-600", // Purple
      "from-red-400 via-red-500 to-red-600", // Red
      "from-indigo-400 via-indigo-500 to-indigo-600", // Indigo
    ];
    return gradients[index % gradients.length];
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <section className="py-16 bg-linear-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center shadow-lg">
              <FaTrophy className="text-white text-xl" />
            </div>
            <h2 className="text-4xl font-bold bg-linear-to-r from-gray-800 to-blue-800 bg-clip-text text-transparent">
              Recent Achievements
            </h2>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Celebrating our students' outstanding accomplishments and milestones
            that make us proud
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestAchievements.map((achievement, idx) => {
            console.log(`🖼️ Achievement ${idx}:`, {
              id: achievement.id,
              title: achievement.title,
              image_urls: achievement.image_urls,
              fullImagePath: achievement.image_urls
                ? `${base_url}/${achievement.image_urls}`
                : "No image",
              allFields: Object.keys(achievement),
            });

            return (
              <div
                key={achievement.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 group border border-gray-100 hover:border-gray-200"
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  {achievement.image_urls ? (
                    <>
                      <img
                        src={`${base_url}/${achievement.image_urls}`}
                        alt={achievement.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                      {/* Fallback background - hidden by default when image exists */}
                      <div
                        className={`fallback-bg absolute inset-0 w-full h-full bg-linear-to-br ${getAchievementGradient(idx)} hidden items-center justify-center`}
                      >
                        <div className="text-white text-6xl opacity-50">
                          <FaImage className="drop-shadow-lg" />
                        </div>
                      </div>
                    </>
                  ) : (
                    /* No image URL - show fallback immediately */
                    <div
                      className={`w-full h-full bg-linear-to-br ${getAchievementGradient(idx)} flex items-center justify-center`}
                    >
                      <div className="text-white text-6xl opacity-60 group-hover:opacity-80 transition-opacity duration-300">
                        <FaImage className="drop-shadow-lg" />
                      </div>
                    </div>
                  )}

                  {/* Date Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 shadow-md group-hover:bg-white transition-all duration-300">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-gray-600 text-xs" />
                      <span className="text-gray-700 text-xs font-semibold">
                        {formatDate(achievement.achievement_date)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2">
                    {achievement.title}
                  </h3>

                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {achievement.description}
                  </p>

                  {/* Achievement Date */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-3 h-3 rounded-full bg-linear-to-r ${getAchievementGradient(idx)}`}
                      ></div>
                      <span className="text-gray-500 text-xs font-medium">
                        Achievement Date
                      </span>
                    </div>
                    <span className="text-gray-700 text-sm font-semibold">
                      {formatDate(achievement.achievement_date)}
                    </span>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div
                  className={`absolute inset-0 border-2 border-transparent group-hover:border-linear-to-r group-hover:${getAchievementGradient(idx)} rounded-2xl transition-all duration-300 pointer-events-none`}
                ></div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate("/academics/achievements")}
            className="bg-linear-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center gap-3 mx-auto"
          >
            <FaTrophy className="text-lg" />
            View All
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentAchievements;
