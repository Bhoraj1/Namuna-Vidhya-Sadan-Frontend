import { useState, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useGetNoticeQuery } from "../redux/features/contentSlice.js";
import HeroContainer from "../components/shared/HeroContainer";
import { NoticeSkeleton } from "../components/skeleton/HomeSkeleton";
import ErrorMessage from "../components/shared/ErrorMessage";
import Pagination from "../components/shared/Pagination";
import bgImg from "../assets/img/bgst.jpg";
import { FaCaretRight } from "react-icons/fa";

// Number of notices per page
const ITEMS_PER_PAGE = 10;

const NoticeIndex = () => {
  const { data, isLoading, error, refetch } = useGetNoticeQuery(undefined, {
    refetchOnMountOrArgChange: true,
    refetchOnFocus: true,
  });
  const IMG_URL = import.meta.env.VITE_IMG_URL;

  const [selectedNotice, setSelectedNotice] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const notices = data?.data || [];

  // Sort notices by date descending
  const sortedNotices = useMemo(
    () =>
      [...notices].sort(
        (a, b) => new Date(b.notice_date) - new Date(a.notice_date),
      ),
    [notices],
  );

  // Paginate sorted notices client-side
  const totalPages = Math.ceil(sortedNotices.length / ITEMS_PER_PAGE);
  const paginatedNotices = useMemo(
    () =>
      sortedNotices.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE,
      ),
    [sortedNotices, currentPage],
  );

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  // Loading State
  if (isLoading) return <NoticeSkeleton />;

  // Error State
  if (error) return <ErrorMessage message="Failed to load notices." />;

  return (
    <div className="w-full">
      {/* Hero Section */}
      <HeroContainer bgImage={bgImg} title="Notices" subtitle="" />

      {/* Notices List */}
      <div className="max-w-7xl  ml-8 mr-6 mx-auto px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12 py-6 sm:py-8 md:py-12">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Notices
        </h2>

        <div className="flex flex-col divide-y divide-gray-200">
          {paginatedNotices.length > 0 ? (
            paginatedNotices.map((notice) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col sm:flex-row justify-start sm:justify-between items-start sm:items-center py-3 sm:py-4 px-2 sm:px-3 rounded transition-all gap-2 sm:gap-4"
              >
                {/* Notice Title */}
                <p className="flex items-center text-black hover:text-third-color text-sm sm:text-base flex-1">
                  <FaCaretRight className="text-black w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 shrink-0" />
                  <span className="line-clamp-2 sm:line-clamp-1">
                    {notice.title}
                  </span>
                </p>

                {/* Date and View Button */}
                <div className="flex items-center gap-2 sm:gap-4 ml-4 sm:ml-0">
                  <span className="text-gray-500 text-xs sm:text-sm shrink-0">
                    {formatDate(notice.notice_date)}
                  </span>
                  {notice.attachment_url && (
                    <a
                      href={`${IMG_URL}/${notice.attachment_url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-third-color hover:bg-third-color/90 text-white px-2 sm:px-3 py-1 sm:py-2 rounded text-xs sm:text-sm font-medium transition-colors flex items-center gap-1 sm:gap-2"
                    >
                      <FaCaretRight className="w-2 h-2 sm:w-3 sm:h-3" />
                      View
                    </a>
                  )}
                </div>
              </motion.div>
            ))
          ) : (
            <p className="text-gray-500 py-6 sm:py-8 text-sm sm:text-base">
              No notices found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>

      {/* Notice Detail Modal */}
      <AnimatePresence>
        {selectedNotice && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedNotice(null)}
          >
            <motion.div
              className="bg-white rounded-lg max-w-2xl w-full p-4 sm:p-6 relative mx-2 sm:mx-4 max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                className="absolute top-2 sm:top-3 right-2 sm:right-3 text-gray-600 hover:text-gray-900 font-bold text-lg sm:text-xl z-10"
                onClick={() => setSelectedNotice(null)}
              >
                ✕
              </button>
              <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 pr-8">
                {selectedNotice.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 mb-3 sm:mb-4">
                {formatDate(selectedNotice.notice_date)}
              </p>
              {selectedNotice.attachment_url && (
                <div className="mt-3 sm:mt-4">
                  {selectedNotice.attachment_type === "image" ? (
                    <img
                      src={`${IMG_URL}/${selectedNotice.attachment_url}`}
                      alt={selectedNotice.title}
                      className="w-full rounded-md"
                    />
                  ) : (
                    <iframe
                      src={`${IMG_URL}/${selectedNotice.attachment_url}`}
                      title={selectedNotice.title}
                      className="w-full h-64 sm:h-80 md:h-96 rounded-md"
                    />
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NoticeIndex;
