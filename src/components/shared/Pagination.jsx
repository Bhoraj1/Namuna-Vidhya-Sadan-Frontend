import Button from "../ButtonComponent.jsx";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (!totalPages || totalPages < 1) return null;

  const getPages = () => {
    const pages = [];
    const delta = 1;
    const left = currentPage - delta;
    const right = currentPage + delta;
    let prev = null;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        if (prev && i - prev > 1) pages.push("...");
        pages.push(i);
        prev = i;
      }
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 mt-8 sm:mt-10 flex-wrap">
      {/* Prev */}
      <Button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-third-color/10 hover:border-third-color hover:text-third-color disabled:opacity-40 disabled:cursor-not-allowed"
      >
        &#8592; <span className="hidden sm:inline">Prev</span>
      </Button>

      {/* Page Numbers */}
      {getPages().map((page, i) =>
        page === "..." ? (
          <span key={`e-${i}`} className="px-2 py-2 text-gray-400 text-sm select-none">
            ...
          </span>
        ) : (
          <Button
            key={page}
            onClick={() => page !== currentPage && onPageChange(page)}
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-lg border text-sm font-semibold ${
              page === currentPage
                ? "bg-third-color text-white border-third-color shadow-md cursor-default"
                : "bg-white text-gray-600 border-gray-200 hover:bg-third-color/10 hover:border-third-color hover:text-third-color cursor-pointer"
            }`}
          >
            {page}
          </Button>
        )
      )}

      {/* Next */}
      <Button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex items-center gap-1 px-3 sm:px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm font-medium hover:bg-third-color/10 hover:border-third-color hover:text-third-color disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span> &#8594;
      </Button>
    </div>
  );
};

export default Pagination;
