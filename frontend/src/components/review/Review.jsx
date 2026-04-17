import React from "react";
import { useGetReviewsQuery } from "../../redux/features/SiteSlice";
import { FaStar } from "react-icons/fa";

const ReviewPage = () => {
  const base_url = import.meta.env.VITE_IMG_URL;
  const {
    data: reviewData,
    isLoading,
    error,
  } = useGetReviewsQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });

  if (isLoading) {
    return (
      <div className="text-center py-10 text-gray-500 animate-pulse">
        Loading reviews...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-500">
        Error fetching reviews!
      </div>
    );
  }

  const approvedReviews = reviewData?.data?.filter(
    (review) => review.status === "approved",
  );

  if (!approvedReviews || approvedReviews.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No reviews available.
      </div>
    );
  }

  // Take only first 3 reviews for the design
  const displayReviews = approvedReviews.slice(0, 3);

  return (
    <div className="p-4">
      <div className="max-w-[1050px] max-md:max-w-xl mx-auto">
        <div className="grid md:grid-cols-2 items-center lg:gap-24 md:gap-16 gap-8">
          {/* Left Column - Testimonials */}
          <div className="space-y-6 bg-gray-100 rounded-lg p-6">
            {displayReviews.map((review, idx) => (
              <div
                key={review.id}
                className={`flex sm:items-center max-sm:flex-col-reverse ${
                  idx === 1
                    ? "p-6 relative md:left-12 bg-white shadow-[0_2px_20px_-4px_rgba(93,96,127,0.2)] rounded-lg"
                    : ""
                }`}
              >
                <div className="mr-3">
                  <div className="flex sm:items-center max-sm:flex-col-reverse gap-2">
                    <h6 className="text-slate-900 text-[15px] font-semibold">
                      {review.name}
                    </h6>
                    {/* Star Rating */}
                    <div className="flex space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className="text-yellow-400 text-[10px]"
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-slate-700 mt-2">
                    {review.review_text}
                  </p>
                  {review.position && (
                    <p className="text-xs text-slate-500 mt-1">
                      {review.position}
                    </p>
                  )}
                </div>
                <img
                  src={`${base_url}/${review.image}`}
                  className="w-16 h-16 border border-slate-600 rounded-full max-sm:mb-2 object-cover"
                  alt={review.name}
                />
              </div>
            ))}
          </div>

          {/* Right Column - Header Content */}
          <div className="max-md:-order-1">
            <h6 className="text-xl font-semibold text-slate-300">
              Testimonials
            </h6>
            <h2 className="text-slate-900 text-3xl md:text-4xl font-bold mt-4">
              We are loyal with our customer
            </h2>
            <p className="text-[15px] text-slate-700 mt-6 leading-relaxed">
              See what our happy clients have to say. They've shared how our
              templates helped them launch quickly, look professional, and grow
              with ease.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
