import React, { useState } from "react";
import { useGetFaqsQuery } from "../../redux/features/SiteSlice";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FAQSkeleton } from "../skeleton/HomeSkeleton";
import Button from "../ButtonComponent.jsx";

const Faqs = () => {
  const { data: faqData, isLoading, error } = useGetFaqsQuery();
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (isLoading) return <FAQSkeleton />;
  if (error)
    return (
      <div className="text-center py-6 sm:py-8 md:py-10 text-red-500 text-sm sm:text-base">
        Error fetching FAQs!
      </div>
    );
  if (!faqData?.data || faqData.data.length === 0)
    return (
      <div className="text-center py-6 sm:py-8 md:py-10 text-gray-400 text-sm sm:text-base">
        No FAQs available.
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 py-8 sm:py-10 md:py-12">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 text-third-color">
        Frequently Asked Questions
      </h2>

      <div className="space-y-3 sm:space-y-4 max-h-auto overflow-y-auto">
        {faqData.data.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="border border-blue-100 rounded-lg sm:rounded-xl overflow-hidden shadow-sm"
            >
              {/* Question Row */}
              <Button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-white hover:bg-third-color/5 text-left"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${faq.id}`}
                icon={isOpen ? <FaChevronUp /> : <FaChevronDown />}
                iconPosition="right"
              >
                <span className="text-third-color font-semibold text-sm sm:text-base pr-3 sm:pr-4 leading-relaxed">
                  {faq.question}
                </span>
              </Button>

              {/* Answer Panel */}
              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-48 sm:max-h-40 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-4 sm:px-6 py-3 sm:py-4 bg-primary-color/10 border-t border-primary-color/30 text-gray-700 text-xs sm:text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Faqs;
