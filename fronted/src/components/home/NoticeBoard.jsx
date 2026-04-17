import { Link } from "react-router-dom";
import { useGetNoticeQuery } from "../../redux/features/contentSlice";
import { FaArrowRight } from "react-icons/fa";
import { IoMegaphoneOutline } from "react-icons/io5";

const NoticeBoard = () => {
  const { data, isLoading, error } = useGetNoticeQuery();

  const notices = [...(data?.data || [])]
    .sort((a, b) => new Date(b.notice_date) - new Date(a.notice_date))
    .slice(0, 4);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="py-12 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-0 rounded-2xl overflow-hidden shadow-lg">

          {/* Left Panel */}
          <div className="lg:col-span-2 bg-third-color p-8 lg:p-12 flex flex-col justify-between">
            <div>
              <IoMegaphoneOutline className="text-white/30 w-16 h-16 mb-6" />
              <span className="text-white/60 text-xs font-semibold uppercase tracking-widest">
                Stay Informed
              </span>
              <h2
                className="mt-3 text-3xl lg:text-4xl font-bold text-white leading-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Latest <br /> Notices
              </h2>
              <p className="mt-4 text-white/60 text-sm leading-relaxed">
                Stay up to date with the latest announcements, circulars, and
                important updates from Namuna Vidhya Sadan.
              </p>
            </div>
            <Link
              to="/notice"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-white border border-white/40 hover:bg-white hover:text-third-color px-5 py-2.5 rounded-full transition-all duration-300 w-fit"
            >
              View All Notices <FaArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* Right Panel */}
          <div className="lg:col-span-3 bg-gray-50 divide-y divide-gray-200">
            {isLoading ? (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex gap-4 p-6 animate-pulse">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 rounded w-1/3" />
                  </div>
                </div>
              ))
            ) : error ? (
              <p className="text-center text-red-500 text-sm py-16">Failed to load notices.</p>
            ) : notices.length === 0 ? (
              <p className="text-center text-gray-400 text-sm py-16">No notices available.</p>
            ) : (
              notices.map((notice, i) => {
                const d = new Date(notice.notice_date);
                return (
                  <div
                    key={notice.id}
                    className="flex items-start gap-4 p-5 sm:p-6 hover:bg-blue-50/60 transition-colors duration-200 group"
                  >
                    {/* Date badge */}
                    <div className="shrink-0 w-12 text-center bg-white border border-gray-200 rounded-lg py-1.5 shadow-sm group-hover:border-third-color transition-colors duration-200">
                      <span className="block text-lg font-bold text-third-color leading-none">
                        {d.getDate()}
                      </span>
                      <span className="block text-[10px] uppercase text-gray-400 font-medium mt-0.5">
                        {d.toLocaleString("en-US", { month: "short" })}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 group-hover:text-third-color transition-colors duration-200 line-clamp-2 leading-snug">
                        {notice.title}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">{formatDate(notice.notice_date)}</span>
                        {notice.attachment_url && (
                          <a
                            href={`${import.meta.env.VITE_IMG_URL}/${notice.attachment_url}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold text-third-color hover:underline"
                          >
                            Download →
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Index number */}
                    <span className="shrink-0 text-3xl font-black text-gray-100 group-hover:text-blue-100 transition-colors duration-200 select-none">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                );
              })
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default NoticeBoard;
