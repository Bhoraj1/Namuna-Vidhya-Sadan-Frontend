import React, { useState, useMemo } from "react";
import HeroContainer from "../components/shared/HeroContainer";
import { QuestionBankSkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import Pagination from "../components/shared/Pagination";
import bgImg from "../assets/img/student.jpg";
import { useGetQuestionBankQuery } from "../redux/features/academicSlice";
import { FileText, Search, Book, Calendar, GraduationCap } from "lucide-react";

// Number of question papers per page
const ITEMS_PER_PAGE = 8;

const QuestionBank = () => {
  const baseUrl = import.meta.env.VITE_IMG_URL;
  const {
    data: questionBank = [],
    isLoading,
    error,
  } = useGetQuestionBankQuery();

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const questionData = questionBank?.data || [];
  console.log(baseUrl);
  console.log(questionData);

  // Filter papers by search query
  const filteredPapers = useMemo(
    () =>
      questionData.filter((paper) =>
        paper.title.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    [questionData, searchQuery],
  );

  // Paginate filtered papers client-side
  const totalPages = Math.ceil(filteredPapers.length / ITEMS_PER_PAGE);
  const paginatedPapers = useMemo(
    () =>
      filteredPapers.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [filteredPapers, currentPage],
  );

  // Reset to page 1 when search changes
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroContainer
        bgImage={bgImg}
        title="Question Bank"
        subtitle="Access Previous Year Question Papers"
      />

      <div className=" ml-8 mr-6 max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 xl:px-8 py-8 sm:py-10 md:py-12">
        {/* Search Bar */}
        <div className="mb-8 sm:mb-10 md:mb-12 relative max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search question papers..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full border border-gray-300 rounded-full px-4 sm:px-5 py-2.5 sm:py-3 pr-10 sm:pr-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition placeholder-gray-400 text-sm sm:text-base"
          />
          <div className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
            <Search className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && <QuestionBankSkeleton />}

        {/* Error State */}
        {error && (
          <ErrorMessage message="Failed to load question papers. Please try again." />
        )}

        {/* Question Papers List */}
        {!isLoading && !error && paginatedPapers.length > 0 && (
          <>
            <div className="space-y-3 sm:space-y-4">
              {paginatedPapers.map((paper) => (
                <div
                  key={paper.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-gray-100 p-4 sm:p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
                    {/* Left - Paper Info */}
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1">
                      {/* File Icon */}
                      <div className="shrink-0">
                        <div
                          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center ${paper.file_type?.toLowerCase().includes("pdf") ? "bg-red-100" : "bg-blue-100"}`}
                        >
                          <FileText
                            className={`w-5 h-5 sm:w-6 sm:h-6 ${paper.file_type?.toLowerCase().includes("pdf") ? "text-red-600" : "text-blue-600"}`}
                          />
                        </div>
                      </div>

                      {/* Paper Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2">
                          {paper.title}
                        </h3>
                        <p className="text-gray-600 text-xs sm:text-sm mt-1 line-clamp-2">
                          {paper.description}
                        </p>
                        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2 text-xs sm:text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Book className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                            {paper.subject}
                          </span>
                          <span className="flex items-center gap-1">
                            <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                            Class {paper.class_level}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />{" "}
                            {paper.year}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right - View Button */}
                    <div className="shrink-0 self-start sm:self-center">
                      <a
                        href={`${baseUrl}/${paper.file_url}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 text-sm sm:text-base"
                      >
                        <FileText className="w-3 h-3 sm:w-4 sm:h-4" /> View
                      </a>
                    </div>
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

        {/* Empty State */}
        {!isLoading && !error && filteredPapers.length === 0 && (
          <div className="text-center mt-12 sm:mt-16 md:mt-20">
            <p className="text-gray-500 text-base sm:text-lg">
              No question papers found
              {searchQuery ? ` for "${searchQuery}"` : ""}.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBank;
