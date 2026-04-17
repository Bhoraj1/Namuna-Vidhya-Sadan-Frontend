import React from "react";
import { useGetReviewsQuery } from "../../redux/features/SiteSlice";
import { FaStar, FaQuoteLeft, FaUser } from "react-icons/fa";

const StudentReviews = () => {
  const base_url = import.meta.env.VITE_IMG_URL;
  const { data: reviewData, isLoading, error } = useGetReviewsQuery();

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
          <div className="text-center py-10 text-gray-500 animate-pulse">
            Loading reviews...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
          <div className="text-center py-10 text-red-500">
            Error fetching reviews!
          </div>
        </div>
      </div>
    );
  }

  const allReviews = reviewData?.data || [];
  const openReviews = allReviews.filter(
    (review) => review.status?.toLowerCase() === "open",
  );
  const approvedReviews = allReviews.filter(
    (review) => review.status?.toLowerCase() === "approved",
  );
  const pendingReviews = allReviews.filter(
    (review) => review.status?.toLowerCase() === "pending",
  );

  // Priority: approved first, then open, then pending
  let displayReviews = [];
  if (approvedReviews.length > 0) {
    displayReviews = approvedReviews;
  } else if (openReviews.length > 0) {
    displayReviews = openReviews;
  } else {
    displayReviews = pendingReviews;
  }

  if (displayReviews.length === 0) {
    return (
      <div className="p-4">
        <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
          <div className="text-center py-10 text-gray-400">
            No reviews available.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 items-start lg:gap-24 md:gap-16 gap-8">
          {/* Left Column - Testimonials */}
          <div className="space-y-6 rounded-lg">
            {displayReviews.map((review, idx) => {
              // Apply white background with shadow to every 2nd review (index 1, 3, 5...)
              const isHighlighted = idx % 2 === 1;
              return (
                <div
                  key={review.id}
                  className={`flex sm:items-center max-sm:flex-col-reverse transition-all duration-300 ${
                    isHighlighted
                      ? "p-6 relative md:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-lg"
                      : ""
                  }`}
                >
                  <div className="mr-3 flex-1">
                    <div className="flex sm:items-center max-sm:flex-col-reverse gap-2 flex-wrap">
                      <h6 className="text-slate-900 text-[15px] font-semibold">
                        {review.name}
                      </h6>
                      <div className="flex space-x-0.5">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-400 text-[10px]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700 mt-2 leading-relaxed">
                      "{review.review_text}"
                    </p>
                    {review.position && (
                      <p className="text-xs text-slate-500 mt-2 font-medium">
                        {review.position}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    {review.image ? (
                      <img
                        src={`${base_url}/${review.image}`}
                        className="w-16 h-16 border-2 border-slate-300 rounded-full max-sm:mb-2 object-cover"
                        alt={review.name}
                        onError={(e) => {
                          e.target.style.display = "none";
                          if (e.target.nextSibling) {
                            e.target.nextSibling.style.display = "flex";
                          }
                        }}
                      />
                    ) : null}
                    <div
                      className={`w-16 h-16 border-2 border-slate-300 rounded-full max-sm:mb-2 items-center justify-center bg-gray-100 ${
                        review.image ? "hidden" : "flex"
                      }`}
                    >
                      <FaUser className="text-slate-500 text-2xl" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column - Header Content */}
          <div className="max-md:-order-1 sticky top-8">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
                <FaQuoteLeft className="text-white text-xs" />
              </div>
              <h6 className="text-xl font-semibold text-gray-400">
                Testimonials
              </h6>
            </div>
            <h2 className="text-gray-900 text-3xl md:text-4xl font-bold mt-2 leading-tight">
              We are loyal with our{" "}
              <span className="text-gray-900">customer</span>
            </h2>
            <div className="w-20 h-1 bg-gray-900 rounded-full mt-4 mb-6"></div>
            <p className="text-[15px] text-gray-600 leading-relaxed">
              See what our happy clients have to say. They've shared how our 
              templates helped them launch quickly, look professional, and 
              grow with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentReviews;